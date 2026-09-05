import type { MetadataRoute } from "next";

import { defaultLocale, locales, type Locale } from "@/lib/i18n/locales";
import {
  briefAgentPath,
  copyAdaptPath,
  legalPath,
  localizedPath,
  mapsKonzeptPath,
  menuDigitizerPath,
  microBotPath,
} from "@/lib/i18n/paths";
import { site } from "@/lib/site";

const BASE = `https://${site.domain}`;

type ChangeFrequency = "weekly" | "monthly" | "yearly";

type LocalizedPage = {
  path: (locale: Locale) => string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const LOCALIZED_PAGES: LocalizedPage[] = [
  { path: (l) => localizedPath(l, "/"), priority: 1, changeFrequency: "weekly" },
  { path: (l) => localizedPath(l, "/trabajos"), priority: 0.9, changeFrequency: "monthly" },
  { path: (l) => localizedPath(l, "/servicios"), priority: 0.9, changeFrequency: "monthly" },
  { path: (l) => localizedPath(l, "/auditoria"), priority: 0.9, changeFrequency: "weekly" },
  { path: (l) => localizedPath(l, "/contacto"), priority: 0.7, changeFrequency: "yearly" },
  { path: briefAgentPath, priority: 0.6, changeFrequency: "monthly" },
  { path: menuDigitizerPath, priority: 0.6, changeFrequency: "monthly" },
  { path: copyAdaptPath, priority: 0.6, changeFrequency: "monthly" },
  { path: mapsKonzeptPath, priority: 0.6, changeFrequency: "monthly" },
  { path: microBotPath, priority: 0.6, changeFrequency: "monthly" },
  { path: (l) => legalPath(l, "impressum"), priority: 0.2, changeFrequency: "yearly" },
  { path: (l) => legalPath(l, "datenschutz"), priority: 0.2, changeFrequency: "yearly" },
  { path: (l) => legalPath(l, "agb"), priority: 0.2, changeFrequency: "yearly" },
];

// Demos públicas sin prefijo de locale (grupo immersive). /demos/lugner queda
// fuera a propósito: ruta huérfana, la demo canónica de centro comercial es
// stadtgalerie (reutiliza los assets lugner-*).
const DEMO_PATHS = [
  "/demos/stadtgalerie",
  "/demos/restaurant",
  "/demos/kellerlicht",
  "/demos/villa-italia",
  "/demos/solo-modas",
  "/demos/universo-del-calzado",
  "/demos/vaultshield",
  "/demos/novaai",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localized = LOCALIZED_PAGES.flatMap((page) => {
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, `${BASE}${page.path(l)}`]),
      ["x-default", `${BASE}${page.path(defaultLocale)}`],
    ]);
    return locales.map((locale) => ({
      url: `${BASE}${page.path(locale)}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }));
  });

  const demos = DEMO_PATHS.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...localized, ...demos];
}
