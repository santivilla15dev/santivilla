import { createHash } from "node:crypto";
import { checkMenuRateLimit } from "@/lib/audit/rate-limit";
import {
  extractMenuFromImage,
  isMenuVisionConfigured,
} from "@/lib/menu/extract-menu-vision";
import { makeMenuId, saveMenuDraft } from "@/lib/menu/store";
import type { MenuDraft } from "@/lib/menu/types";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/paths";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function msg(locale: Locale, de: string, en: string, es: string) {
  if (locale === "de") return de;
  if (locale === "en") return en;
  return es;
}

export async function POST(req: Request) {
  if (!isMenuVisionConfigured()) {
    return NextResponse.json(
      {
        error: "ANTHROPIC_NOT_CONFIGURED",
        message: "Menu vision API not configured.",
      },
      { status: 503 },
    );
  }

  const key = clientKey(req);
  const limit = await checkMenuRateLimit(key);
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Too many uploads. Retry in ${limit.retryAfterSec}s.`,
        retryAfterSec: limit.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "BAD_FORM", message: "Invalid form data." },
      { status: 400 },
    );
  }

  const localeRaw = String(form.get("locale") ?? "de");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "de";

  const file = form.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      {
        error: "NO_FILE",
        message: msg(
          locale,
          "Bitte ein Foto der Speisekarte hochladen.",
          "Please upload a menu photo.",
          "Sube una foto de la carta.",
        ),
      },
      { status: 400 },
    );
  }

  const mimeType = file.type as "image/jpeg" | "image/png" | "image/webp";
  if (!ALLOWED.has(mimeType)) {
    return NextResponse.json(
      {
        error: "BAD_TYPE",
        message: msg(
          locale,
          "Nur JPEG, PNG oder WebP.",
          "JPEG, PNG or WebP only.",
          "Solo JPEG, PNG o WebP.",
        ),
      },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > MAX_BYTES) {
    return NextResponse.json(
      {
        error: "TOO_LARGE",
        message: msg(
          locale,
          "Bild zu groß (max. 4 MB).",
          "Image too large (max 4 MB).",
          "Imagen demasiado grande (máx. 4 MB).",
        ),
      },
      { status: 400 },
    );
  }

  try {
    const extracted = await extractMenuFromImage(buffer, mimeType, locale);
    const id = makeMenuId();
    const sourceImageHash = createHash("sha256")
      .update(buffer)
      .digest("hex")
      .slice(0, 16);

    const draft: MenuDraft = {
      ...extracted,
      id,
      sourceImageHash,
      createdAt: new Date().toISOString(),
    };

    await saveMenuDraft(draft);

    return NextResponse.json({
      id,
      path: localizedPath(locale, `/menu/${id}`),
      draft,
    });
  } catch (err) {
    const code = err instanceof Error ? err.message : "EXTRACT_FAIL";
    return NextResponse.json(
      {
        error: code,
        message: msg(
          locale,
          "Speisekarte konnte nicht gelesen werden. Bitte schärferes Foto versuchen.",
          "Could not read the menu. Try a sharper photo.",
          "No se pudo leer la carta. Prueba una foto más nítida.",
        ),
      },
      { status: 422 },
    );
  }
}
