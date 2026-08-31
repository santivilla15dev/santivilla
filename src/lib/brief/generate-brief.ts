import "server-only";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { briefSchema, toBriefPayload, type BriefPayload } from "./schema";
import { resolveBriefImages } from "./resolve-images";
import type { Locale } from "@/lib/i18n/locales";

export function isBriefConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

function languageName(locale: Locale): string {
  if (locale === "de") return "German (Austria-friendly, Sie)";
  if (locale === "en") return "English";
  return "Spanish (tú, clear and warm)";
}

export async function generateBriefFromText(params: {
  text: string;
  locale: Locale;
}): Promise<BriefPayload> {
  if (!isBriefConfigured()) {
    throw new Error("ANTHROPIC_NOT_CONFIGURED");
  }

  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5"),
    schema: briefSchema,
    system: `You are an expert in conversion copy for local businesses (restaurants, shops, services).
You MUST fill only the provided JSON schema — no HTML, no markdown, no image URLs, no extra keys.

Rules:
- Write all user-facing strings in ${languageName(params.locale)}.
- businessName: short brand name inferred from the brief.
- businessKind: best match for the business type (pizzeria, gasthaus, cafe, friseur, shop, center, civic, healthcare, hotel, professional, other).
  Use "cafe" for bakeries / panaderías / pastry shops (NOT shop).
  Use "shop" only for non-food retail (clothing, shoes, electronics, etc.).
  Use "pizzeria" or "gasthaus" for restaurants / food service.
- headline: persuasive, benefit-first for the customer (not jargon).
- subheadline: one clear sentence focused on who it helps and how.
- features: exactly 3 concrete, actionable services or reasons to choose them.
- colors: high-contrast, readable palette for a landing page. Prefer stone/teal/warm accents.
  Avoid generic purple-on-white, purple-indigo gradients, and the cliché cream+#terracotta AI look.
  background and ink must contrast strongly (e.g. light bg + dark ink, or dark bg + light ink).
- ctaLabel: short action for WhatsApp or contact (e.g. "Reservar" / "WhatsApp" / "Anfragen").
- imagePrompts: exactly 3 English cinematic photo prompts (hero ~16:9, context/interior ~4:3, detail ~1:1).
  Photorealistic; no text, logos, or watermarks in the image.
  MUST match the owner's real business theme (boats → marina/yacht/sea; bakery → bread/oven; gym → training floor).
  NEVER default to generic office, kitchen cabinets, or boutique retail unless that is the actual business.`,
    prompt: `Business brief from the owner:\n\n${params.text.slice(0, 2000)}`,
  });

  const images = await resolveBriefImages({
    kind: object.businessKind,
    businessName: object.businessName,
    inputText: `${params.text}\n${object.businessName}\n${object.headline}\n${object.subheadline}`,
    imagePrompts: object.imagePrompts,
  });

  return toBriefPayload(object, images);
}
