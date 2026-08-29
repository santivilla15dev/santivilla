import type { Metadata } from "next";
import { legalPath, localizedPath } from "./paths";
import type { LegalPage } from "./paths";
import { getMessages, type SiteMessages } from "./get-messages";
import { locales, type Locale } from "./locales";

export function siteAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    const hrefLang =
      loc === "de" ? "de-AT" : loc === "en" ? "en" : "es";
    languages[hrefLang] = localizedPath(loc, path);
  }
  languages["x-default"] = localizedPath("de", path);
  return { languages };
}

export function legalAlternates(page: LegalPage) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    const hrefLang =
      loc === "de" ? "de-AT" : loc === "en" ? "en" : "es";
    languages[hrefLang] = legalPath(loc, page);
  }
  languages["x-default"] = legalPath("de", page);
  return { languages };
}

export function pageMetadata(
  locale: Locale,
  segment: keyof Pick<
    SiteMessages,
    "meta" | "services" | "work" | "contact" | "audit" | "concept"
  >,
  path: string,
  titleOverride?: string,
  descriptionOverride?: string,
): Metadata {
  const m = getMessages(locale);
  let title = titleOverride;
  let description = descriptionOverride;

  if (!title) {
    if (segment === "services") title = m.services.title;
    else if (segment === "work") title = m.work.title;
    else if (segment === "contact") title = m.contact.title;
    else if (segment === "audit") title = "Mobile Erst";
    else if (segment === "concept") title = m.concept.title;
    else title = m.meta.title;
  }

  if (!description) {
    description = m.meta.description;
  }

  return {
    title,
    description,
    alternates: siteAlternates(locale, path),
    openGraph: {
      locale: m.meta.ogLocale,
      title,
      description,
    },
  };
}

export function legalMetadata(
  locale: Locale,
  page: "impressum" | "datenschutz",
): Metadata {
  const m = getMessages(locale);
  const title = page === "impressum" ? m.footer.impressum : m.footer.datenschutz;

  return {
    title,
    description: `${title} — ${m.meta.title}`,
    alternates: legalAlternates(page),
    robots: { index: true, follow: true },
  };
}
