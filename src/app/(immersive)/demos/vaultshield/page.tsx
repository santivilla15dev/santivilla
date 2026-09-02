import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { VaultshieldLanding } from "@/components/demos/vaultshield/landing";
import { isLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/locales";
import { negotiateLocale } from "@/lib/i18n/negotiate";

export const metadata: Metadata = {
  title: "VaultShield — Demo",
  description:
    "Concept hero for a password manager SaaS: fullscreen video, mobile sheet menu, Framer Motion.",
  robots: { index: false, follow: false },
};

const BASE_PATH = "/demos/vaultshield";

// Idioma: ?lang > cookie del portfolio > Accept-Language.
async function resolveLocale(lang: string | undefined): Promise<Locale> {
  if (lang && isLocale(lang)) return lang;
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;
  return negotiateLocale((await headers()).get("accept-language"));
}

export default async function VaultshieldDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = await resolveLocale(lang);
  const langHrefs = Object.fromEntries(
    locales.map((code) => [code, `${BASE_PATH}?lang=${code}`]),
  ) as Record<Locale, string>;

  return <VaultshieldLanding locale={locale} langHrefs={langHrefs} />;
}
