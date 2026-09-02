import { CookieBanner } from "@/components/consent/cookie-banner";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { SiteFooter } from "@/components/site-footer";
import { getMessages } from "@/lib/i18n/get-messages";
import { isLocale, locales, type Locale } from "@/lib/i18n/locales";
import { legalPath } from "@/lib/i18n/paths";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Igual que el layout de (site) pero sin SiteHeader: la landing trae su propia nav.
export default async function LocaleLandingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const privacyHref = `${legalPath(locale, "datenschutz")}#cookies`;

  const skipLabel =
    locale === "de"
      ? "Zum Inhalt springen"
      : locale === "en"
        ? "Skip to content"
        : "Saltar al contenido";

  return (
    <ConsentProvider
      locale={locale}
      labels={messages.consent}
      privacyHref={privacyHref}
    >
      <div className="flex min-h-full flex-col bg-[#0C0C0C]" lang={locale}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-surface"
        >
          {skipLabel}
        </a>
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} messages={messages} />
        <CookieBanner />
      </div>
    </ConsentProvider>
  );
}
