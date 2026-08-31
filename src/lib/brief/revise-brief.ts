import "server-only";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { isBriefConfigured } from "./generate-brief";
import { resolveBriefImages } from "./resolve-images";
import {
  briefSchema,
  toBriefPayload,
  type BriefPayload,
} from "./schema";
import type { Locale } from "@/lib/i18n/locales";

function languageName(locale: Locale): string {
  if (locale === "de") return "German (Austria-friendly, Sie)";
  if (locale === "en") return "English";
  return "Spanish (tú, clear and warm)";
}

/** Heurística: el usuario pide cambio de fotos / look visual / tipo de negocio. */
export function wantsVisualRefresh(message: string): boolean {
  return /foto|imagen|image|photo|visual|look|estilo visual|colores? de (la )?foto|cambiar (las )?fotos|otra foto|businessKind|tipo de negocio|parece un|hazlo (m[aá]s )?(oscuro|claro|oscuro)|regenera(r)? (las )?imagen/i.test(
    message,
  );
}

function publicFieldsForRevise(payload: BriefPayload) {
  const { images: _omit, ...rest } = payload;
  return rest;
}

export async function reviseBriefPayload(params: {
  current: BriefPayload;
  message: string;
  locale: Locale;
}): Promise<BriefPayload> {
  if (!isBriefConfigured()) {
    throw new Error("ANTHROPIC_NOT_CONFIGURED");
  }

  const message = params.message.trim().slice(0, 500);
  if (message.length < 3) {
    throw new Error("BAD_MESSAGE");
  }

  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const currentJson = JSON.stringify(
    publicFieldsForRevise(params.current),
    null,
    2,
  );

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5"),
    schema: briefSchema,
    system: `You revise a structured landing-page JSON for a local business.
You MUST fill only the provided JSON schema — no HTML, no markdown, no image URLs.

Rules:
- Keep all user-facing strings in ${languageName(params.locale)}.
- Apply ONLY what the user asks. Leave every other field unchanged unless the change requires it.
- Preserve businessName unless the user asks to rename.
- Exactly 3 features always.
- Colors: high contrast, readable. Avoid purple-on-white and cream+#terracotta clichés.
- businessKind: cafe for bakeries; shop for non-food retail; pizzeria/gasthaus for restaurants.
- imagePrompts: exactly 3 English cinematic photo prompts matching the ACTUAL business theme
  (hero, context, detail). Photorealistic; no text/logos. Update them when the theme or visuals change;
  otherwise keep them coherent with the business (never generic office/kitchen unless that is the business).`,
    prompt: `Current landing JSON:\n${currentJson}\n\nUser revision request:\n${message}\n\nReturn the full updated JSON object including imagePrompts.`,
  });

  const kindChanged = object.businessKind !== params.current.businessKind;
  const refreshImages = wantsVisualRefresh(message) || kindChanged;

  if (!refreshImages && params.current.images?.heroUrl) {
    return toBriefPayload(object, params.current.images);
  }

  const images = await resolveBriefImages({
    kind: object.businessKind,
    businessName: object.businessName,
    inputText: `${message}\n${object.businessName}\n${object.headline}\n${object.subheadline}`,
    imagePrompts: object.imagePrompts,
  });

  return toBriefPayload(object, images);
}
