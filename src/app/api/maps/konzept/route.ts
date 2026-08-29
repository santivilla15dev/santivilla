import { checkMapsKonzeptRateLimit } from "@/lib/audit/rate-limit";
import {
  isMapsKonzeptConfigured,
  konzeptFromMapsUrl,
} from "@/lib/maps/konzept-from-maps";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

type Body = {
  mapsUrl?: string;
  lang?: "de" | "es";
};

const ERROR_MESSAGES: Record<string, { status: number; message: string }> = {
  INVALID_MAPS_URL: {
    status: 400,
    message: "Keine gültige Google-Maps-URL.",
  },
  PLACES_NOT_CONFIGURED: {
    status: 503,
    message: "GOOGLE_PLACES_API_KEY fehlt auf dem Server.",
  },
  PLACES_NO_QUERY: {
    status: 400,
    message: "Aus der Maps-URL konnte kein Betrieb ermittelt werden.",
  },
  PLACES_NOT_FOUND: {
    status: 404,
    message: "Betrieb in Google Places nicht gefunden.",
  },
};

function mapError(err: unknown): { status: number; error: string; message: string } {
  const raw = err instanceof Error ? err.message : "UNKNOWN";
  if (raw.startsWith("PLACES_FETCH_FAILED:")) {
    return {
      status: 502,
      error: "PLACES_FETCH_FAILED",
      message: "Google Places API Fehler — URL oder API-Key prüfen.",
    };
  }
  if (raw.startsWith("PLACES_SEARCH_FAILED:")) {
    return {
      status: 502,
      error: "PLACES_SEARCH_FAILED",
      message: "Google Places Suche fehlgeschlagen.",
    };
  }
  const known = ERROR_MESSAGES[raw];
  if (known) {
    return { status: known.status, error: raw, message: known.message };
  }
  return {
    status: 500,
    error: "KONZEPT_FAILED",
    message: "Konzept konnte nicht erstellt werden.",
  };
}

export async function POST(req: Request) {
  const limit = await checkMapsKonzeptRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Zu viele Anfragen. Warte ${Math.ceil(limit.retryAfterSec / 60)} Min.`,
      },
      { status: 429 },
    );
  }

  if (!isMapsKonzeptConfigured()) {
    return NextResponse.json(
      {
        error: "NOT_CONFIGURED",
        message:
          "Maps-Konzept braucht GOOGLE_PLACES_API_KEY und ANTHROPIC_API_KEY.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const mapsUrl = (body.mapsUrl || "").trim().slice(0, 800);
  const lang = body.lang === "es" ? "es" : "de";

  if (!mapsUrl) {
    return NextResponse.json(
      { error: "MISSING_URL", message: "Google-Maps-URL fehlt." },
      { status: 400 },
    );
  }

  try {
    const result = await konzeptFromMapsUrl(mapsUrl, lang);

    try {
      const { upsertLeadFromConcept } = await import("@/lib/crm/store");
      await upsertLeadFromConcept({
        conceptId: result.conceptId,
        url: mapsUrl,
        hostname: result.slug,
        businessName: result.name,
        source: "maps",
      });
    } catch {
      // non-blocking
    }

    return NextResponse.json(result);
  } catch (err) {
    const mapped = mapError(err);
    return NextResponse.json(
      { error: mapped.error, message: mapped.message },
      { status: mapped.status },
    );
  }
}
