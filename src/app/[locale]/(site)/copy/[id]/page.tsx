import { CopyDraftView } from "@/components/copy-draft-view";
import { getCopyDraft } from "@/lib/copy/store";
import { getMessages } from "@/lib/i18n/get-messages";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return {
    title: m.copyAdapt.previewTitle,
    robots: { index: false, follow: false },
  };
}

export default async function CopyDraftPage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const draft = await getCopyDraft(id);
  if (!draft) notFound();

  const labels = getMessages(locale).copyAdapt;

  return <CopyDraftView draft={draft} labels={labels} locale={locale} />;
}
