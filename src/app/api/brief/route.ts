import { checkBriefRateLimit } from "@/lib/audit/rate-limit";
import {
  generateBriefFromText,
  isBriefConfigured,
} from "@/lib/brief/generate-brief";
import { makeBriefId, saveBrief } from "@/lib/brief/store";
import { upsertLeadFromBrief } from "@/lib/crm/store";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/paths";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const limit = await checkBriefRateLimit(clientKey(req));
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
        message: "Brief Agent requires ANTHROPIC_API_KEY.",
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

  const text = String(body.text || "").trim().slice(0, 2000);
  const localeRaw = String(body.locale || "es").trim();

  if (text.length < 20) {
    return NextResponse.json(
      {
        error: "BAD_TEXT",
        message: "Brief must be at least 20 characters.",
      },
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

  try {
    const payload = await generateBriefFromText({ text, locale });
    const id = makeBriefId();
    const record = await saveBrief({
      id,
      locale,
      input: text,
      payload,
      createdAt: new Date().toISOString(),
    });

    const path = localizedPath(locale, `/brief/${id}`);

    try {
      await upsertLeadFromBrief({
        briefId: id,
        businessName: payload.businessName,
        path,
        notes: text,
      });
    } catch (leadErr) {
      console.error("[brief] lead upsert failed", leadErr);
    }

    return NextResponse.json({
      id,
      path,
      payload: record.payload,
      editToken: record.editToken,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg === "ANTHROPIC_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          error: "ANTHROPIC_NOT_CONFIGURED",
          message: "Brief Agent requires ANTHROPIC_API_KEY.",
        },
        { status: 503 },
      );
    }
    console.error("[brief]", err);
    return NextResponse.json(
      { error: "INTERNAL", message: "Could not generate brief." },
      { status: 500 },
    );
  }
}
