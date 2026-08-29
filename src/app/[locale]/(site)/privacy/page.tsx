import { LegalPageView } from "@/components/legal-page-view";
import { getDatenschutz } from "@/lib/legal/impressum-content";
import { legalMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw) || raw !== "en") return {};
  return legalMetadata("en", "datenschutz");
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (raw !== "en") notFound();
  const locale = raw as Locale;
  return <LegalPageView content={getDatenschutz(locale)} />;
}
