import { checkBotRateLimit } from "@/lib/audit/rate-limit";
import { classifyBotIntent, isBotIntentConfigured } from "@/lib/bot/classify-intent";
import { getBotProfile } from "@/lib/bot/get-profile";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 20;

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const limit = await checkBotRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message:
          limit.retryAfterSec > 60
            ? `Too many messages. Try again in ${Math.ceil(limit.retryAfterSec / 60)} min.`
            : `Too many messages. Wait ${limit.retryAfterSec}s.`,
      },
      { status: 429 },
    );
  }

  if (!isBotIntentConfigured()) {
    return NextResponse.json(
      {
        error: "ANTHROPIC_NOT_CONFIGURED",
        message:
          "Free-text replies need ANTHROPIC_API_KEY. FAQ chips still work.",
      },
      { status: 503 },
    );
  }

  let body: { profileId?: string; locale?: string; message?: string };
  try {
    body = (await req.json()) as {
      profileId?: string;
      locale?: string;
      message?: string;
    };
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const profileId = (body.profileId || "").trim();
  const localeRaw = (body.locale || "de").trim();
  const message = (body.message || "").trim().slice(0, 500);

  if (!profileId) {
    return NextResponse.json(
      { error: "BAD_PROFILE", message: "Missing profileId." },
      { status: 400 },
    );
  }

  if (!isLocale(localeRaw)) {
    return NextResponse.json(
      { error: "BAD_LOCALE", message: "Invalid locale." },
      { status: 400 },
    );
  }

  if (message.length < 2) {
    return NextResponse.json(
      { error: "BAD_MESSAGE", message: "Message too short." },
      { status: 400 },
    );
  }

  const profile = getBotProfile(profileId);
  if (!profile) {
    return NextResponse.json(
      { error: "NOT_FOUND", message: "Bot profile not found." },
      { status: 404 },
    );
  }

  const locale = localeRaw as Locale;

  try {
    const result = await classifyBotIntent(profile, message, locale);
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg === "ANTHROPIC_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "ANTHROPIC_NOT_CONFIGURED", message: "AI not configured." },
        { status: 503 },
      );
    }
    console.error("[bot/chat]", err);
    return NextResponse.json(
      { error: "INTERNAL", message: "Could not process message." },
      { status: 500 },
    );
  }
}
