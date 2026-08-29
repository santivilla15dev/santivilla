import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import {
  getArtDirection,
  type BusinessKind,
} from "@/lib/design-system/art-direction";
import type { Locale } from "@/lib/i18n/locales";
import type { CopyAdaptInput, CopyTarget, CopyVariant } from "./types";

const variantSchema = z.object({
  locale: z.enum(["de", "en", "es"]),
  audience: z.enum(["local", "tourist", "business"]),
  text: z.string().max(500),
  toneNote: z.string().max(200),
});

const adaptSchema = z.object({
  variants: z.array(variantSchema).min(1).max(4),
});

function toneGuide(target: CopyTarget): string {
  const { locale, audience } = target;
  if (locale === "de" && audience === "local") {
    return "Deutsch formal-österreichisch (Sie), Wien/Lokalbezug, kein Denglish";
  }
  if (locale === "de" && audience === "tourist") {
    return "Deutsch klar und einladend, kurze Sätze, leichte Orientierung für Besucher";
  }
  if (locale === "de" && audience === "business") {
    return "Deutsch professionell, sachlich, B2B-tauglich";
  }
  if (locale === "en" && audience === "tourist") {
    return "Fresh, inviting, scannable English for visitors";
  }
  if (locale === "en" && audience === "business") {
    return "Professional, concise business English";
  }
  if (locale === "en" && audience === "local") {
    return "Clear English with local context where relevant";
  }
  if (locale === "es" && audience === "local") {
    return "Español cálido y directo (tú), sin traducción literal del alemán";
  }
  if (locale === "es" && audience === "tourist") {
    return "Español claro para visitantes, tono acogedor";
  }
  if (locale === "es" && audience === "business") {
    return "Español profesional y conciso";
  }
  return `Adapted ${locale} copy for ${audience} audience`;
}

function contentTypeHint(type: CopyAdaptInput["contentType"]): string {
  switch (type) {
    case "dish":
      return "Restaurant dish description — sensory, appetizing, no invented ingredients";
    case "offer":
      return "Promotional offer — clear value, urgency without hype";
    case "service":
      return "Service description — benefits-focused, trustworthy";
    default:
      return "General business copy — concise and commercial";
  }
}

function buildPrompt(input: CopyAdaptInput): string {
  const targetsDesc = input.targets
    .map(
      (t) =>
        `- locale=${t.locale}, audience=${t.audience}: ${toneGuide(t)}`,
    )
    .join("\n");

  let artTone = "";
  if (input.businessKind) {
    const art = getArtDirection(
      input.businessKind as BusinessKind,
      "Business",
      input.city || "Wien",
    );
    artTone = `\nBrand copy tone reference: ${art.copyTone}`;
  }

  return `You adapt commercial copy for local businesses — NOT literal translation.

Source text (${input.sourceLocale}):
"""
${input.sourceText}
"""

Content type: ${input.contentType} — ${contentTypeHint(input.contentType)}
${input.city ? `City/region: ${input.city}` : ""}${artTone}

Generate exactly these target variants (one per line below):
${targetsDesc}

Rules:
- Do NOT invent prices, dishes, services or facts not in the source text
- Each variant max ~400 characters
- toneNote: one short sentence explaining the tone choice (in English)
- Match locale AND audience for each variant exactly
- Cultural adaptation, not word-for-word translation`;
}

export function isCopyAdaptConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export async function adaptCopy(input: CopyAdaptInput): Promise<CopyVariant[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("ANTHROPIC_NOT_CONFIGURED");
  }

  const anthropic = createAnthropic({ apiKey });

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5"),
    schema: adaptSchema,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: buildPrompt(input) }],
      },
    ],
  });

  const targetKeys = new Set(
    input.targets.map((t) => `${t.locale}:${t.audience}`),
  );

  return object.variants
    .filter((v) => targetKeys.has(`${v.locale}:${v.audience}`))
    .map((v) => ({
      locale: v.locale,
      audience: v.audience,
      text: v.text.trim(),
      toneNote: v.toneNote.trim(),
    }));
}
