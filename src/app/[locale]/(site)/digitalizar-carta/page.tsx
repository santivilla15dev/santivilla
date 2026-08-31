import { MenuDigitizerClient } from "@/components/menu-digitizer-client";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return {
    title: m.menuDigitizer.title,
    description: m.menuDigitizer.lead,
    alternates: pageMetadata(raw, "meta", "/digitalizar-carta").alternates,
  };
}

export default async function DigitalizarCartaPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  if (raw === "en") notFound();
  const locale = raw as Locale;
  const m = getMessages(locale).menuDigitizer;

  return (
    <div className="site-shell py-16 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">
        Incluido en tu web · Carta digital
      </p>
      <h1 className="font-display mt-3 text-5xl text-ink sm:text-6xl">{m.title}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{m.lead}</p>
      <div className="mt-12">
        <MenuDigitizerClient locale={locale} labels={m} />
      </div>
    </div>
  );
}
