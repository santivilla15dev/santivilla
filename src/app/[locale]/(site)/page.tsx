import Image from "next/image";
import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { CtaButtons } from "@/components/cta-buttons";
import { DemoMetricsStrip } from "@/components/demo-metrics-strip";
import { FaqAccordion } from "@/components/faq-accordion";
import { TrustSignals } from "@/components/trust-signals";
import { formatMs } from "@/lib/audit/vitals-format";
import {
  portfolioHomeBenchmark,
  stadtgalerieBenchmark,
} from "@/lib/demos/benchmarks";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { localizedPath } from "@/lib/i18n/paths";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { site, whatsappHref } from "@/lib/site";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const HERO_PHOTO = "/demos/lugner-hero.webp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return pageMetadata(raw, "meta", "/");
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const c = messages.home;
  const w = messages.work;
  const cta = messages.cta;
  const projects = messages.projectsForHome;
  const viennaProjects = projects.filter((p) => p.group === "vienna");
  const templateProjects = projects.filter((p) => p.group === "template");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: messages.meta.description,
    url: `https://${site.domain}`,
    email: site.email,
    areaServed: { "@type": "City", name: "Wien" },
    knowsLanguage: ["de", "en", "es"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="grain relative overflow-hidden">
        <div className="site-shell grid min-h-[calc(100vh-4.5rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="animate-fade text-sm font-medium uppercase tracking-[0.22em] text-accent">
              {site.location}
            </p>
            <h1 className="animate-rise font-display mt-4 text-ink">
              <span className="block text-[clamp(3.4rem,10vw,6.5rem)] leading-[0.92]">
                {site.name}
              </span>
              <span className="mt-4 block max-w-xl text-[clamp(1.35rem,3.5vw,1.85rem)] font-medium leading-snug tracking-normal text-ink/90">
                {c.heroH1}
              </span>
            </h1>
            <p className="animate-rise-delay-1 mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {c.heroLead}
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={localizedPath(locale, "/auditoria")}
                className="cta-pulse inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-medium text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {c.heroAuditCta}
              </Link>
              <a
                href={whatsappHref(cta.defaultWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-sm font-medium text-muted underline-offset-4 transition hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {cta.whatsapp}
              </a>
            </div>
            <p className="animate-rise-delay-2 mt-4 max-w-xl text-sm font-medium text-ink">
              {c.heroGuarantee}
            </p>
          </div>

          <div className="animate-rise-delay-1 relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
            <div
              className="absolute -inset-10 rounded-full bg-accent/10 blur-3xl"
              aria-hidden
            />
            <div className="relative rounded-[2rem] border-[10px] border-ink bg-ink p-1 shadow-[var(--shadow)]">
              <div
                className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-ink/80 ring-1 ring-white/10"
                aria-hidden
              />
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.35rem] bg-ink">
                <Image
                  src={HERO_PHOTO}
                  alt={c.heroCardAlt}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 280px, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-surface sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-surface/55 sm:text-xs">
                    {c.heroCardEyebrow}
                  </p>
                  <p className="font-display mt-2 text-xl leading-tight sm:text-2xl">
                    {c.heroCardTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-line/70 bg-surface/40 py-5 sm:py-6"
        aria-label={c.trustSignalsLabel}
      >
        <div className="site-shell">
          <TrustSignals items={c.trustSignals} />
        </div>
      </section>

      <section className="border-t border-line/70 py-20">
        <div className="site-shell max-w-3xl">
          <p className="animate-fade text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {c.introEyebrow}
          </p>
          <h2 className="animate-rise font-display mt-3 text-4xl text-ink sm:text-5xl">
            {c.introTitle}
          </h2>
          <p className="animate-rise-delay-1 mt-6 text-lg leading-relaxed text-muted">
            {c.introBody}
          </p>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/50 py-20">
        <div className="site-shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {c.clientDesignEyebrow}
            </p>
            <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
              {c.clientDesignTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {c.clientDesignBody}
            </p>
            <div className="mt-8">
              <Link
                href="/demos/stadtgalerie"
                className="text-sm font-medium text-muted underline-offset-4 transition hover:text-accent hover:underline"
              >
                {c.clientDesignCtaDemo}
              </Link>
            </div>
          </div>
          <ol className="space-y-5 border-l border-accent/40 pl-6">
            {c.clientDesignSteps.map((step, i) => (
              <li key={step} className="relative">
                <span className="font-display absolute -left-[1.85rem] top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-xs text-white">
                  {i + 1}
                </span>
                <p className="leading-relaxed text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line/70 py-20">
        <div className="site-shell max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {c.proofEyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
            {c.proofTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{c.proofBody}</p>
          <DemoMetricsStrip benchmark={stadtgalerieBenchmark} labels={w} />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/demos/stadtgalerie"
              className="text-sm font-medium text-muted underline-offset-4 transition hover:text-accent hover:underline"
            >
              {c.proofCtaDemo}
            </Link>
            <Link
              href={localizedPath(locale, "/trabajos")}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {c.proofCtaWork}
            </Link>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
            {c.heroCost}
          </p>
          <p className="mt-4 border-t border-ink/10 pt-4 text-sm text-muted">
            {c.selfScoreEyebrow}:{" "}
            <span className="font-display tabular-nums text-ink">
              {portfolioHomeBenchmark.performance}
              {c.selfScoreTitle}
            </span>{" "}
            · {c.selfScoreMeta} · LCP {formatMs(portfolioHomeBenchmark.lcpMs)} ·{" "}
            {new Date(portfolioHomeBenchmark.measuredAt).toLocaleDateString(
              locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "de-AT",
              { year: "numeric", month: "short", day: "numeric" },
            )}{" "}
            <a
              href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(portfolioHomeBenchmark.url)}&form_factor=mobile`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {c.selfScoreLink}
            </a>
          </p>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/50 py-20">
        <div className="site-shell">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            {c.advantagesTitle}
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2">
            {c.advantages.map((item, i) => (
              <li
                key={item.title}
                className="animate-rise border-t border-ink/15 pt-6"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <p className="font-display text-sm text-accent">0{i + 1}</p>
                <h3 className="font-display mt-2 text-2xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line/70 bg-ink py-20 text-surface">
        <div className="site-shell">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c9a227]">
            {c.includesEyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">
            {c.includesTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-surface/70">
            {c.includesLead}
          </p>
          <ol className="mt-12 max-w-2xl space-y-8">
            {c.includes.map((item, i) => (
              <li
                key={item.tool}
                className="border-t border-white/15 pt-6"
              >
                <p className="font-display text-sm text-[#c9a227]">
                  0{i + 1}
                </p>
                <h3 className="font-display mt-2 text-2xl text-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-surface/65">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line/70 py-20">
        <div className="site-shell max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {c.pricingEyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
            {c.pricingFrom}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {c.pricingBody}
          </p>
          <p className="mt-8">
            <Link
              href={localizedPath(locale, "/servicios")}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {c.pricingLink}
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/50 py-20">
        <div className="site-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                {c.workTitle}
              </h2>
              <p className="mt-3 max-w-lg text-muted">{c.workBody}</p>
            </div>
            <Link
              href={localizedPath(locale, "/trabajos")}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {c.workLink}
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="font-display text-2xl text-ink sm:text-3xl">
              {w.viennaTitle}
            </h3>
            <p className="mt-2 max-w-lg text-sm text-muted">{w.viennaLead}</p>
            <p className="mt-3">
              <Link
                href="/demos/stadtgalerie"
                className="text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {w.demoCta}
              </Link>
            </p>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {viennaProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={
                      project.href.startsWith("/demos")
                        ? project.href
                        : localizedPath(locale, project.href)
                    }
                    className="group block border-t border-ink/15 pt-6 transition hover:border-accent"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {project.type}
                    </p>
                    <h4 className="font-display mt-2 text-2xl text-ink transition group-hover:text-accent">
                      {project.title}
                    </h4>
                    <p className="mt-3 text-muted">{project.blurb}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <h3 className="font-display text-2xl text-ink sm:text-3xl">
              {w.templatesTitle}
            </h3>
            <p className="mt-2 max-w-lg text-sm text-muted">
              {w.templatesLead}
            </p>
            <p className="mt-2 text-sm text-accent">{w.templatesNote}</p>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templateProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={
                      project.href.startsWith("/demos")
                        ? project.href
                        : localizedPath(locale, project.href)
                    }
                    className="group block border-t border-ink/15 pt-6 transition hover:border-accent"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {project.type}
                    </p>
                    <h4 className="font-display mt-2 text-2xl text-ink transition group-hover:text-accent">
                      {project.title}
                    </h4>
                    <p className="mt-3 text-muted">{project.blurb}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AboutSection
        copy={{
          eyebrow: c.aboutEyebrow,
          title: c.aboutTitle,
          body: c.aboutBody,
          stackLabel: c.aboutStackLabel,
          stack: c.aboutStack,
          photoAlt: c.aboutPhotoAlt,
        }}
      />

      <section className="border-t border-line/70 py-20">
        <div className="site-shell max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {c.faqEyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
            {c.faqTitle}
          </h2>
          <FaqAccordion items={c.faqItems} />
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/60 py-20">
        <div className="site-shell max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {c.finalCtaEyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
            {c.finalCtaTitle}
          </h2>
          <div className="mt-8">
            <CtaButtons
              whatsappLabel={cta.whatsapp}
              scheduleLabel={cta.schedule}
              whatsappMessage={cta.defaultWhatsapp}
            />
          </div>
        </div>
      </section>
    </>
  );
}
