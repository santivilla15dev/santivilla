import { CopyAdaptClient } from "@/components/copy-adapt-client";
import { CtaButtons } from "@/components/cta-buttons";
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
    title: m.copyAdapt.title,
    description: m.copyAdapt.lead,
    alternates: pageMetadata(raw, "meta", "/local-copy").alternates,
  };
}

export default async function LocalCopyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  if (raw !== "en") notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const c = messages.copyAdapt;
  const cta = messages.cta;

  return (
    <div className="site-shell py-16 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">
        {c.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-5xl text-ink sm:text-6xl">{c.title}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{c.lead}</p>
      <ul className="mt-8 max-w-xl space-y-2 text-muted">
        {c.bullets.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-accent">·</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <CopyAdaptClient locale={locale} labels={c} />
      </div>
      <div className="mt-12">
        <CtaButtons
          whatsappMessage={c.salesWhatsapp}
          scheduleLabel={cta.schedule}
          whatsappLabel={cta.whatsapp}
        />
      </div>
    </div>
  );
}
