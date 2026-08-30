import { LegalPageView } from "@/components/legal-page-view";
import { getAgb } from "@/lib/legal/agb-content";
import { legalMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw) || raw !== "de") return {};
  return legalMetadata("de", "agb");
}

export default async function AgbPage({ params }: Props) {
  const { locale: raw } = await params;
  if (raw !== "de") notFound();
  const locale = raw as Locale;
  return <LegalPageView content={getAgb(locale)} />;
}
