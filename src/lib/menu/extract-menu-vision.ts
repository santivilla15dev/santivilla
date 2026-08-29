import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";
import type { MenuExtractResult } from "./types";

const menuItemSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string().optional(),
  allergens: z.array(z.string()).optional(),
});

const menuExtractSchema = z.object({
  restaurantName: z.string().nullable(),
  sections: z.array(
    z.object({
      title: z.string(),
      items: z.array(menuItemSchema),
    }),
  ),
  confidence: z.enum(["high", "medium", "low"]),
  warnings: z.array(z.string()),
});

function promptForLocale(locale: Locale): string {
  if (locale === "de") {
    return `Du siehst ein Foto einer Speisekarte (Restaurant/Gasthaus). Extrahiere NUR Text, der klar lesbar ist.

Regeln:
- Erfinde KEINE Gerichte, Preise oder Allergene.
- Preise exakt wie auf der Karte (z. B. "€12,90").
- Allergene nur wenn explizit auf der Karte (A, G, L, etc. oder ausgeschrieben).
- Gruppiere in Sektionen (Vorspeisen, Hauptgerichte, …) nur wenn erkennbar.
- confidence: "low" bei unscharfem Foto oder fehlenden Preisen; "medium" bei teilweise lesbar; "high" wenn alles klar.
- warnings: kurze Hinweise (z. B. "2 Preise unleserlich") — leeres Array wenn nichts fehlt.`;
  }
  if (locale === "en") {
    return `You see a photo of a restaurant menu. Extract ONLY clearly readable text.

Rules:
- Do NOT invent dishes, prices or allergens.
- Prices exactly as printed (e.g. "€12.90").
- Allergens only if explicitly on the menu.
- Group into sections only when visible.
- confidence: low/medium/high based on image clarity.
- warnings: brief notes about unreadable parts.`;
  }
  return `Ves una foto de carta de restaurante. Extrae SOLO texto claramente legible.

Reglas:
- NO inventes platos, precios ni alérgenos.
- Precios tal cual en la carta.
- Alérgenos solo si aparecen explícitos.
- Agrupa en secciones solo si se ven.
- confidence según nitidez de la foto.
- warnings con notas breves sobre partes ilegibles.`;
}

export function isMenuVisionConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export async function extractMenuFromImage(
  imageBuffer: Buffer,
  mimeType: "image/jpeg" | "image/png" | "image/webp",
  locale: Locale,
): Promise<MenuExtractResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("ANTHROPIC_NOT_CONFIGURED");
  }

  const anthropic = createAnthropic({ apiKey });
  const base64 = imageBuffer.toString("base64");

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5"),
    schema: menuExtractSchema,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: promptForLocale(locale) },
          {
            type: "image",
            image: base64,
            mediaType: mimeType,
          },
        ],
      },
    ],
  });

  const sections = object.sections
    .map((section) => ({
      title: section.title.trim(),
      items: section.items
        .filter((item) => item.name.trim().length > 0)
        .map((item) => ({
          name: item.name.trim(),
          price: item.price.trim() || "—",
          description: item.description?.trim() || undefined,
          allergens:
            item.allergens && item.allergens.length > 0
              ? item.allergens.map((a) => a.trim()).filter(Boolean)
              : undefined,
        })),
    }))
    .filter((section) => section.items.length > 0);

  if (sections.length === 0) {
    return {
      restaurantName: object.restaurantName,
      locale,
      sections: [],
      confidence: "low",
      warnings: [
        ...(object.warnings || []),
        locale === "de"
          ? "Keine lesbaren Gerichte erkannt."
          : locale === "en"
            ? "No readable dishes detected."
            : "No se detectaron platos legibles.",
      ],
    };
  }

  return {
    restaurantName: object.restaurantName?.trim() || null,
    locale,
    sections,
    confidence: object.confidence,
    warnings: object.warnings || [],
  };
}
