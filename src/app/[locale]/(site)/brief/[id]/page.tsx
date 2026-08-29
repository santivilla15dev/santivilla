import { BriefShareClient } from "@/components/brief/brief-share-client";
import { getBrief } from "@/lib/brief/store";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/paths";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) return {};
  const brief = await getBrief(id);
  const m = getMessages(raw);
  if (!brief) {
    return { title: m.briefAgent.title };
  }
  return {
    title: `${brief.payload.businessName} · ${m.briefAgent.title}`,
    description: brief.payload.headline,
    alternates: pageMetadata(raw, "meta", `/brief/${id}`).alternates,
  };
}

export default async function BriefSharePage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const brief = await getBrief(id);
  if (!brief) notFound();

  const messages = getMessages(locale);
  const c = messages.briefAgent;

  return (
    <div className="site-shell py-10 sm:py-14">
      <Link
        href={localizedPath(locale, "/brief")}
        className="text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        {c.previewBack}
      </Link>
      <div className="mt-8">
        <BriefShareClient
          briefId={brief.id}
          locale={locale}
          initialPayload={brief.payload}
          labels={c}
        />
      </div>
    </div>
  );
}
