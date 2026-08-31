import { z } from "zod";

const hexColor = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Expected #RRGGBB hex color");

export const briefBusinessKindSchema = z.enum([
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

/** Schema filled by the LLM (no image URLs — server attaches those). */
export const briefSchema = z.object({
  businessName: z.string().min(1).max(80),
  headline: z.string().min(1).max(120),
  subheadline: z.string().min(1).max(220),
  businessKind: briefBusinessKindSchema,
  features: z
    .array(
      z.object({
        title: z.string().min(1).max(60),
        description: z.string().min(1).max(160),
      }),
    )
    .length(3),
  colors: z.object({
    primary: hexColor,
    secondary: hexColor,
    background: hexColor,
    ink: hexColor,
  }),
  ctaLabel: z.string().min(1).max(40),
  /**
   * Exactly 3 English photo prompts (hero, context, detail).
   * Use array+length (not z.tuple): Anthropic structured output rejects tuple/prefixItems schemas.
   * Stripped before save/UI.
   */
  imagePrompts: z.array(z.string().min(20).max(280)).length(3),
});

export type BriefLlmPayload = z.infer<typeof briefSchema>;

export type BriefImages = {
  heroUrl: string;
  secondaryUrl: string;
  detailUrl: string;
  source: "nano-banana" | "unsplash";
};

/** Public/persisted brief: LLM fields without imagePrompts, plus resolved image URLs. */
export type BriefPayload = Omit<BriefLlmPayload, "imagePrompts"> & {
  images: BriefImages;
};

/** Persisted shape (imagePrompts stripped, images attached). Rows failing this are treated as gone. */
export const briefPayloadStoredSchema = briefSchema
  .omit({ imagePrompts: true })
  .extend({
    images: z.object({
      heroUrl: z.string(),
      secondaryUrl: z.string(),
      detailUrl: z.string(),
      source: z.enum(["nano-banana", "unsplash"]),
    }),
  });

export function stripImagePrompts(
  llm: BriefLlmPayload,
): Omit<BriefLlmPayload, "imagePrompts"> {
  const { imagePrompts: _omit, ...rest } = llm;
  return rest;
}

export function toBriefPayload(
  llm: BriefLlmPayload,
  images: BriefImages,
): BriefPayload {
  return { ...stripImagePrompts(llm), images };
}
