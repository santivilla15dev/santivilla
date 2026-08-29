export const locales = ["de", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
export const LOCALE_COOKIE = "sv_locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
