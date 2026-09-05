import { AuditClient } from "@/components/audit-client";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import type { AuditLang } from "@/lib/audit/types";
import { notFound, redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return pageMetadata(raw, "audit", "/auditoria", undefined, m.audit.lead);
}

function auditLangForLocale(locale: Locale): AuditLang {
  return locale === "es" ? "es" : "de";
}

export default async function AuditoriaPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  if (locale === "en") redirect("/de/auditoria");
  const a = getMessages(locale).audit;

  return (
    <div className="site-shell py-16 sm:py-20">
      <p className="animate-fade text-sm font-medium uppercase tracking-[0.22em] text-accent">
        {a.eyebrow}
      </p>
      <h1 className="animate-rise font-display mt-3 text-5xl text-ink sm:text-6xl">
        {a.title}
        <br />
        {a.titleBreak}
      </h1>
      <p className="animate-rise-delay-1 mt-5 max-w-2xl text-lg text-muted">
        {a.lead}
      </p>
      <ol className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
        {a.steps.map((step) => (
          <li
            key={step}
            className="rounded-full bg-accent-soft px-4 py-2 text-accent"
          >
            {step}
          </li>
        ))}
      </ol>

      <div className="animate-rise-delay-2 mt-12">
        <AuditClient locale={locale} initialLang={auditLangForLocale(locale)} labels={a} />
      </div>
    </div>
  );
}
