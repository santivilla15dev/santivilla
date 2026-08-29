import { checkBriefReviseRateLimit } from "@/lib/audit/rate-limit";
import { isBriefConfigured } from "@/lib/brief/generate-brief";
import { reviseBriefPayload } from "@/lib/brief/revise-brief";
import { getBrief, saveBrief } from "@/lib/brief/store";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type Ctx = { params: Promise<{ id: string }> };

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  if (!id || id.length > 80) {
    return NextResponse.json({ error: "BAD_ID" }, { status: 400 });
  }

  const limit = await checkBriefReviseRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Too many requests. Try again in ${Math.ceil(limit.retryAfterSec / 60)} min.`,
      },
      { status: 429 },
    );
  }

  if (!isBriefConfigured()) {
    return NextResponse.json(
      {
        error: "ANTHROPIC_NOT_CONFIGURED",
        message: "Brief revise requires ANTHROPIC_API_KEY.",
      },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const message = String(body.message || "").trim().slice(0, 500);
  const localeRaw = String(body.locale || "es").trim();

  if (message.length < 3) {
    return NextResponse.json(
      { error: "BAD_MESSAGE", message: "Revision message too short." },
      { status: 400 },
    );
  }

  if (!isLocale(localeRaw)) {
    return NextResponse.json(
      { error: "BAD_LOCALE", message: "Invalid locale." },
      { status: 400 },
    );
  }

  const locale = localeRaw as Locale;
  const record = await getBrief(id);
  if (!record) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  try {
    const payload = await reviseBriefPayload({
      current: record.payload,
      message,
      locale,
    });

    await saveBrief({
      ...record,
      payload,
    });

    return NextResponse.json({ id, payload });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg === "ANTHROPIC_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          error: "ANTHROPIC_NOT_CONFIGURED",
          message: "Brief revise requires ANTHROPIC_API_KEY.",
        },
        { status: 503 },
      );
    }
    if (msg === "BAD_MESSAGE") {
      return NextResponse.json(
        { error: "BAD_MESSAGE", message: "Revision message too short." },
        { status: 400 },
      );
    }
    console.error("[brief/revise]", err);
    return NextResponse.json(
      { error: "INTERNAL", message: "Could not revise brief." },
      { status: 500 },
    );
  }
}
