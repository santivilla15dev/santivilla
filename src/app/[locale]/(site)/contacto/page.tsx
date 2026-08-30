import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { ContactForm } from "@/components/contact-form";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { briefAgentPath, localizedPath } from "@/lib/i18n/paths";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { site, whatsappHref } from "@/lib/site";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return pageMetadata(raw, "contact", "/contacto");
}

export default async function ContactoPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const m = getMessages(locale);
  const c = m.contact;
  const cta = m.cta;

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(c.mailBody)}`;

  return (
    <div className="site-shell py-16 sm:py-20">
      <h1 className="animate-rise font-display text-5xl text-ink sm:text-6xl">
        {c.title}
      </h1>
      <p className="animate-rise-delay-1 mt-4 max-w-2xl text-lg text-muted">
        {c.lead}{" "}
        <Link
          href={localizedPath(locale, "/auditoria")}
          className="text-accent underline-offset-4 hover:underline"
        >
          {c.auditLinkLabel}
        </Link>{" "}
        {c.leadAudit}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-rise-delay-1 space-y-6">
          <CtaButtons
            pulse
            whatsappLabel={cta.whatsapp}
            scheduleLabel={cta.schedule}
            whatsappMessage={c.whatsappMessage}
          />

          <div className="space-y-4 border-t border-line pt-8 text-sm">
            <p>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                {c.email}
              </span>
              <a
                href={mailto}
                className="mt-1 inline-block text-lg text-accent underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
            <p>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                {c.whatsapp}
              </span>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-lg text-ink"
              >
                {c.openChat}
              </a>
            </p>
            <p>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                {c.schedule}
              </span>
              <a
                href={site.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-lg text-ink underline-offset-4 hover:underline"
              >
                {site.calUrl.replace(/^https?:\/\//, "")}
              </a>
            </p>
            <p className="text-muted">{site.location}</p>
          </div>

          <div className="border-t border-line pt-8">
            <p className="text-base text-muted">{c.briefAlt}</p>
            <Link
              href={briefAgentPath(locale)}
              className="mt-2 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {c.briefLink}
            </Link>
          </div>

          <ContactForm
            labels={{
              formTitle: c.formTitle,
              formLead: c.formLead,
              formName: c.formName,
              formBusiness: c.formBusiness,
              formMessage: c.formMessage,
              formSubmit: c.formSubmit,
              success: c.formSuccess,
              error: c.formError,
            }}
          />
        </div>

        <aside className="animate-rise-delay-2 rounded-[var(--radius)] bg-ink p-8 text-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-surface/50">
            {c.pitchLabel}
          </p>
          <p className="font-display mt-4 text-3xl leading-snug">{c.pitchQuote}</p>
          <p className="mt-6 text-sm leading-relaxed text-surface/65">
            {c.pitchBody}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={c.schedule}
              src={site.calUrl}
              className="h-[420px] w-full bg-white"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
