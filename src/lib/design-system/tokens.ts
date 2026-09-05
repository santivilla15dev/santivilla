/** Tokens del design system Santi Villa — fuente de verdad del agente */

import type { ArtDirection } from "./art-direction";
import type { SiteFacts } from "./extract-site";

export const designTokens = {
  colors: {
    ink: "#0f1a24",
    surface: "#f7f9fb",
    muted: "#5a6b7a",
    accent: "#0b5f63",
    accentHot: "#c45c26",
    gold: "#c9a227",
    dark: "#0c1218",
    darkPanel: "#151d26",
  },
  fonts: {
    display: "Fraunces, Georgia, serif",
    body: "Manrope, system-ui, sans-serif",
  },
  radius: "1.25rem",
  banner:
    "Konzept / Redesign-Vorschlag — keine offizielle Website · Santi Design Agent",
} as const;

export type DesignBrief = {
  name: string;
  hostname: string;
  url: string;
  template: "restaurant" | "shop" | "center" | "civic";
  lang: "es" | "de";
  score: number;
  findings: string[];
  tagline?: string;
  phoneHint?: string;
  hoursHint?: string;
  emailHint?: string;
  whatsappUrl?: string;
  subtitle?: string;
  city?: string;
  kind?: string;
  specialty?: string;
  vibe?: string;
  summary?: string;
  siteFacts?: SiteFacts;
  highlights?: string[];
  artDirection?: ArtDirection;
  heroImageUrl?: string;
  secondaryImageUrl?: string;
  detailImageUrl?: string;
  imageSource?: "openai" | "unsplash" | "nano-banana" | "places" | "local";
};
