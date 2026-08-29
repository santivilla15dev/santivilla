import { isLocale, type Locale } from "./locales";

const LEGAL_SLUGS = {
  impressum: { de: "impressum", en: "imprint", es: "impressum" },
  datenschutz: { de: "datenschutz", en: "privacy", es: "datenschutz" },
} as const;

export type LegalPage = keyof typeof LEGAL_SLUGS;

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function legalPath(locale: Locale, page: LegalPage): string {
  return localizedPath(locale, `/${LEGAL_SLUGS[page][locale]}`);
}

export function stripLocalePrefix(pathname: string): {
  locale: Locale | null;
  pathname: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) {
    const rest = segments.slice(1);
    return {
      locale: first,
      pathname: rest.length ? `/${rest.join("/")}` : "/",
    };
  }
  return { locale: null, pathname: pathname || "/" };
}

export function switchLocalePath(
  currentPathname: string,
  targetLocale: Locale,
): string {
  const { pathname } = stripLocalePrefix(currentPathname);
  return localizedPath(targetLocale, pathname);
}

export function menuDigitizerPath(locale: Locale): string {
  if (locale === "en") return localizedPath(locale, "/digitize-menu");
  return localizedPath(locale, "/digitalizar-carta");
}

export function microBotPath(locale: Locale): string {
  return localizedPath(locale, "/micro-bot");
}

export function copyAdaptPath(locale: Locale): string {
  if (locale === "en") return localizedPath(locale, "/local-copy");
  if (locale === "es") return localizedPath(locale, "/adaptar-copy");
  return localizedPath(locale, "/copy-lokal");
}

export function mapsKonzeptPath(locale: Locale): string {
  return localizedPath(locale, "/maps-konzept");
}

export function briefAgentPath(locale: Locale): string {
  return localizedPath(locale, "/brief");
}
