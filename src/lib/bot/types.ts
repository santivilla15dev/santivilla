import type { Locale } from "@/lib/i18n/locales";

export type BotIntent =
  | "availability"
  | "hours"
  | "parking"
  | "reserve"
  | "buy"
  | "other";

export type FaqTopic = "availability" | "hours" | "parking";

export type BotProfile = {
  id: string;
  businessName: string;
  whatsapp: string;
  address: string;
  transit?: string;
  hours: { label: string; value: string }[];
  closedDays?: string[];
  parking: { summary: string; detail: string };
  availability: {
    policy: "whatsapp_confirm" | "walk_in_only";
    note: string;
  };
  reservePrompt?: string;
};

export type FaqAnswer = {
  text: string;
  whatsappMessage?: string;
  shouldHandoff?: boolean;
};

export type BotChatResult = {
  intent: BotIntent;
  answer: string;
  whatsappMessage?: string;
  shouldHandoff: boolean;
};

export type BotChatRequest = {
  profileId: string;
  locale: Locale;
  message: string;
};
