import { CtaButtons } from "@/components/cta-buttons";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { briefAgentPath, legalPath } from "@/lib/i18n/paths";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return pageMetadata(raw, "services", "/servicios");
}

export default async function ServiciosPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const m = getMessages(locale);
  const s = m.services;
  const cta = m.cta;

  return (
    <div className="site-shell py-16 sm:py-20">
      <h1 className="animate-rise font-display text-5xl text-ink sm:text-6xl">
        {s.title}
      </h1>
      <p className="animate-rise-delay-1 mt-4 max-w-2xl text-lg text-muted">
        {s.lead}
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {m.packages.map((pkg, index) => (
          <article
            key={pkg.id}
            className={`animate-rise flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-[var(--shadow)] ${index === 1 ? "lg:-translate-y-2 lg:border-accent" : ""}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {s.packageLabel} 0{index + 1}
            </p>
            <h2 className="font-display mt-3 text-3xl text-ink">{pkg.name}</h2>
            <p className="mt-2 text-2xl font-medium text-accent">{pkg.price}</p>
            <p className="mt-4 text-muted">{pkg.description}</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-ink/80">
              {pkg.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-muted">
        <Link
          href={legalPath(locale, "agb")}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {s.agbLink}
        </Link>
      </p>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl text-ink">{s.alsoTitle}</h2>
        <ul className="mt-5 space-y-3 text-muted">
          {s.alsoItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>{m.menuDigitizer.servicesBullet}</li>
          <li>{m.microBot.servicesBullet}</li>
          <li>{m.copyAdapt.servicesBullet}</li>
          <li>
            <Link
              href={briefAgentPath(locale)}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {m.briefAgent.servicesBullet}
            </Link>
          </li>
        </ul>
        <div className="mt-10">
          <CtaButtons
            whatsappLabel={cta.whatsapp}
            scheduleLabel={cta.schedule}
            whatsappMessage={s.whatsappMessage}
          />
        </div>
      </section>
    </div>
  );
}
