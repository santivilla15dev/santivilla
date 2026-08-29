import { defaultLocale, type Locale } from "./locales";

/** Parse Accept-Language — de* → de, en* → en, else default (AT market). */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const tags = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return {
        tag: tag.toLowerCase(),
        q: qPart ? parseFloat(qPart) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    if (tag.startsWith("de")) return "de";
    if (tag.startsWith("en")) return "en";
    if (tag.startsWith("es")) return "es";
  }

  return defaultLocale;
}
