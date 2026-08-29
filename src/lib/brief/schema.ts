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
});

export type BriefLlmPayload = z.infer<typeof briefSchema>;

export type BriefImages = {
  heroUrl: string;
  secondaryUrl: string;
  detailUrl: string;
  source: "nano-banana" | "unsplash";
};

export type BriefPayload = BriefLlmPayload & {
  images: BriefImages;
};
