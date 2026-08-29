import { MenuPreviewView } from "@/components/menu-preview-view";
import { getMessages } from "@/lib/i18n/get-messages";
import { getMenuDraft } from "@/lib/menu/store";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) return {};
  const draft = await getMenuDraft(id);
  const m = getMessages(raw);
  return {
    title: draft?.restaurantName ?? m.menuDigitizer.previewTitleFallback,
    robots: { index: false, follow: false },
  };
}

export default async function MenuPreviewPage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const draft = await getMenuDraft(id);
  if (!draft) notFound();

  const labels = getMessages(locale).menuDigitizer;

  return <MenuPreviewView draft={draft} labels={labels} locale={locale} />;
}
