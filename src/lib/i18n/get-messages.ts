import { defaultLocale, isLocale, type Locale } from "./locales";
import { deMessages } from "./messages/de";
import { enMessages } from "./messages/en";
import { esMessages } from "./messages/es";
import type { SiteMessages } from "./messages/types";

const catalog: Record<Locale, SiteMessages> = {
  de: deMessages,
  en: enMessages,
  es: esMessages,
};

export function getMessages(locale: string): SiteMessages {
  if (isLocale(locale)) return catalog[locale];
  return catalog[defaultLocale];
}

export type { SiteMessages };
