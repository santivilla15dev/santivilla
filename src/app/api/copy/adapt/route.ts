import { adaptCopy, isCopyAdaptConfigured } from "@/lib/copy/adapt-copy";
import { makeCopyId, saveCopyDraft } from "@/lib/copy/store";
import type {
  CopyAdaptInput,
  CopyAudience,
  CopyContentType,
  CopyTarget,
} from "@/lib/copy/types";
import { checkCopyRateLimit } from "@/lib/audit/rate-limit";
import type { BusinessKind } from "@/lib/design-system/art-direction";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/paths";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const CONTENT_TYPES = new Set<CopyContentType>([
  "service",
  "offer",
  "dish",
  "general",
]);
const AUDIENCES = new Set<CopyAudience>(["local", "tourist", "business"]);
const BUSINESS_KINDS = new Set<BusinessKind>([
  "pizzeria",
  "gasthaus",
  "cafe",
  "friseur",
  "shop",
  "center",
  "civic",
  "healthcare",
  "hotel",
  "professional",
  "other",
]);

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function parseTargets(raw: unknown): CopyTarget[] | null {
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > 4) return null;
  const targets: CopyTarget[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const locale = (item as { locale?: string }).locale;
    const audience = (item as { audience?: string }).audience;
    if (!locale || !isLocale(locale) || !audience || !AUDIENCES.has(audience as CopyAudience)) {
      return null;
    }
    const key = `${locale}:${audience}`;
    if (seen.has(key)) continue;
    seen.add(key);
    targets.push({ locale, audience: audience as CopyAudience });
  }
  return targets.length > 0 ? targets : null;
}

export async function POST(req: Request) {
  const limit = await checkCopyRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Too many requests. Try again in ${Math.ceil(limit.retryAfterSec / 60)} min.`,
      },
      { status: 429 },
    );
  }

  if (!isCopyAdaptConfigured()) {
    return NextResponse.json(
      {
        error: "ANTHROPIC_NOT_CONFIGURED",
        message: "Copy adaptation requires ANTHROPIC_API_KEY.",
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

  const sourceText = String(body.sourceText || "").trim().slice(0, 2000);
  const sourceLocaleRaw = String(body.sourceLocale || "de").trim();
  const contentType = String(body.contentType || "general") as CopyContentType;
  const targets = parseTargets(body.targets);
  const city = body.city ? String(body.city).trim().slice(0, 80) : undefined;
  const conceptId = body.conceptId
    ? String(body.conceptId).trim().slice(0, 64)
    : undefined;
  const businessKindRaw = body.businessKind
    ? String(body.businessKind).trim()
    : undefined;

  if (sourceText.length < 10) {
    return NextResponse.json(
      { error: "BAD_TEXT", message: "Source text must be at least 10 characters." },
      { status: 400 },
    );
  }

  if (!isLocale(sourceLocaleRaw)) {
    return NextResponse.json(
      { error: "BAD_LOCALE", message: "Invalid source locale." },
      { status: 400 },
    );
  }

  if (!CONTENT_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: "BAD_TYPE", message: "Invalid content type." },
      { status: 400 },
    );
  }

  if (!targets) {
    return NextResponse.json(
      { error: "BAD_TARGETS", message: "Provide 1–4 valid targets." },
      { status: 400 },
    );
  }

  const businessKind =
    businessKindRaw && BUSINESS_KINDS.has(businessKindRaw as BusinessKind)
      ? (businessKindRaw as BusinessKind)
      : undefined;

  const sourceLocale = sourceLocaleRaw as Locale;

  const input: CopyAdaptInput = {
    sourceText,
    sourceLocale,
    contentType,
    targets,
    businessKind,
    city,
    conceptId,
  };

  try {
    const variants = await adaptCopy(input);
    if (variants.length === 0) {
      return NextResponse.json(
        { error: "NO_VARIANTS", message: "No variants generated." },
        { status: 500 },
      );
    }

    const id = makeCopyId();
    const draft = await saveCopyDraft({
      id,
      sourceText,
      sourceLocale,
      contentType,
      businessKind,
      city,
      conceptId,
      variants,
      createdAt: new Date().toISOString(),
    });

    const path = localizedPath(sourceLocale, `/copy/${id}`);

    return NextResponse.json({ id, path, draft });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg === "ANTHROPIC_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "ANTHROPIC_NOT_CONFIGURED", message: "AI not configured." },
        { status: 503 },
      );
    }
    console.error("[copy/adapt]", err);
    return NextResponse.json(
      { error: "INTERNAL", message: "Could not adapt copy." },
      { status: 500 },
    );
  }
}
