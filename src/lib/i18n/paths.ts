import { isLocale, type Locale } from "./locales";

const LEGAL_SLUGS = {
  impressum: { de: "impressum", en: "impressum", es: "impressum" },
  datenschutz: { de: "datenschutz", en: "privacy-policy", es: "privacidad" },
  agb: { de: "agb", en: "terms", es: "terminos" },
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

/** Legal slugs in any locale → canonical path in target locale. */
function legalPageForSlug(slug: string): LegalPage | null {
  for (const [page, byLocale] of Object.entries(LEGAL_SLUGS)) {
    if (Object.values(byLocale).includes(slug as never)) {
      return page as LegalPage;
    }
  }
  return null;
}

/** Tool pages with locale-specific slugs → canonical path in target locale. */
function aliasedPathForSlug(slug: string, targetLocale: Locale): string | null {
  const MENU_SLUGS = ["digitalizar-carta", "digitize-menu"];
  const COPY_SLUGS = ["adaptar-copy", "copy-lokal", "local-copy"];
  if (MENU_SLUGS.includes(slug)) return menuDigitizerPath(targetLocale);
  if (COPY_SLUGS.includes(slug)) return copyAdaptPath(targetLocale);
  return null;
}

export function switchLocalePath(
  currentPathname: string,
  targetLocale: Locale,
): string {
  const { pathname } = stripLocalePrefix(currentPathname);
  const firstSegment = pathname.replace(/^\//, "").split("/")[0];

  if (firstSegment) {
    const legal = legalPageForSlug(firstSegment);
    if (legal) return legalPath(targetLocale, legal);
    const aliased = aliasedPathForSlug(firstSegment, targetLocale);
    if (aliased) return aliased;
  }

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
