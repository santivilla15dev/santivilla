import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getMessages } from "@/lib/i18n/get-messages";
import { isLocale, locales, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleSiteLayout({
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

  return (
    <div className="flex min-h-full flex-col" lang={locale}>
      <SiteHeader locale={locale} messages={messages} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} messages={messages} />
    </div>
  );
}
