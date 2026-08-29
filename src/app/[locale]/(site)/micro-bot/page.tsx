import { MicroBotWidgetLazy } from "@/components/micro-bot-widget-lazy";
import { CtaButtons } from "@/components/cta-buttons";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return {
    title: m.microBot.title,
    description: m.microBot.lead,
    alternates: pageMetadata(raw, "meta", "/micro-bot").alternates,
  };
}

export default async function MicroBotPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const b = messages.microBot;
  const cta = messages.cta;

  return (
    <>
      <div className="site-shell py-16 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">
          {b.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-5xl text-ink sm:text-6xl">
          {b.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{b.lead}</p>

        <ul className="mt-8 max-w-xl space-y-2 text-muted">
          {b.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent">·</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          {b.demoLinkLabel}:{" "}
          <Link href={b.demoLink} className="text-ink underline underline-offset-4">
            /demos/restaurant
          </Link>
        </p>

        <div className="mt-12">
          <CtaButtons
            whatsappMessage={b.salesWhatsapp}
            scheduleLabel={cta.schedule}
            whatsappLabel={cta.whatsapp}
          />
        </div>
      </div>

      <MicroBotWidgetLazy locale={locale} labels={b} />
    </>
  );
}
