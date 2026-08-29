import type { BusinessKind } from "@/lib/design-system/art-direction";
import type { Locale } from "@/lib/i18n/locales";

export type CopyAudience = "local" | "tourist" | "business";

export type CopyContentType = "service" | "offer" | "dish" | "general";

export type CopyTarget = {
  locale: Locale;
  audience: CopyAudience;
};

export type CopyVariant = {
  locale: Locale;
  audience: CopyAudience;
  text: string;
  toneNote: string;
};

export type CopyDraft = {
  id: string;
  sourceText: string;
  sourceLocale: Locale;
  contentType: CopyContentType;
  businessKind?: BusinessKind;
  city?: string;
  conceptId?: string;
  variants: CopyVariant[];
  createdAt: string;
};

export type CopyAdaptInput = {
  sourceText: string;
  sourceLocale: Locale;
  contentType: CopyContentType;
  targets: CopyTarget[];
  businessKind?: BusinessKind;
  city?: string;
  conceptId?: string;
};
