import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";
import type { BotChatResult, BotProfile } from "./types";

const intentSchema = z.object({
  intent: z.enum([
    "availability",
    "hours",
    "parking",
    "reserve",
    "buy",
    "other",
  ]),
  answer: z.string().max(280),
  whatsappMessage: z.string().max(500).optional(),
  shouldHandoff: z.boolean(),
});

function systemPrompt(profile: BotProfile, locale: Locale): string {
  const profileJson = JSON.stringify(
    {
      businessName: profile.businessName,
      address: profile.address,
      transit: profile.transit,
      hours: profile.hours,
      closedDays: profile.closedDays,
      parking: profile.parking,
      availability: profile.availability,
    },
    null,
    2,
  );

  const lang =
    locale === "de" ? "German" : locale === "en" ? "English" : "Spanish";

  return `You are a lightweight FAQ assistant for "${profile.businessName}" (demo/Konzept — not official booking).

Business data (ONLY source of truth):
${profileJson}

Rules:
- Answer ONLY using the business data above. Do NOT invent availability, prices, or parking spots.
- Respond in ${lang}, max 280 characters, friendly and concise.
- intent "reserve" or "buy" when user wants to book, order, or purchase.
- shouldHandoff: true when intent is reserve/buy OR user clearly wants human contact.
- whatsappMessage: short pre-filled WhatsApp text in ${lang} when shouldHandoff is true (include business name).
- For availability: never guarantee a table — say confirmation happens via WhatsApp.
- Off-topic questions: politely redirect to WhatsApp.`;
}

export function isBotIntentConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export async function classifyBotIntent(
  profile: BotProfile,
  message: string,
  locale: Locale,
): Promise<BotChatResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("ANTHROPIC_NOT_CONFIGURED");
  }

  const anthropic = createAnthropic({ apiKey });

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5"),
    schema: intentSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${systemPrompt(profile, locale)}\n\nUser message: ${message}`,
          },
        ],
      },
    ],
  });

  return {
    intent: object.intent,
    answer: object.answer.trim(),
    whatsappMessage: object.whatsappMessage?.trim() || undefined,
    shouldHandoff: object.shouldHandoff,
  };
}
