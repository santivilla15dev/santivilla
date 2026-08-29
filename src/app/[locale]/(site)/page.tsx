import Image from "next/image";
import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { localizedPath, menuDigitizerPath, microBotPath, copyAdaptPath, briefAgentPath } from "@/lib/i18n/paths";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { site } from "@/lib/site";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";

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
  const cta = messages.cta;
  const menuCta = messages.menuDigitizer.homeCta;
  const microBotCta = messages.microBot.homeCta;
  const copyCta = messages.copyAdapt.homeCta;
  const briefCta = messages.briefAgent.homeCta;
  const projects = messages.projectsForHome;

  return (
    <>
      <section className="grain relative overflow-hidden">
        <div className="site-shell grid min-h-[calc(100vh-4.5rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="animate-fade text-sm font-medium uppercase tracking-[0.22em] text-accent">
              {site.location}
            </p>
            <h1 className="animate-rise font-display mt-4 text-[clamp(3.4rem,10vw,6.5rem)] leading-[0.92] text-ink">
              {site.name}
            </h1>
            <p className="animate-rise-delay-1 mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {c.heroLead}
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap items-center gap-4">
              <CtaButtons
                pulse
                whatsappLabel={cta.whatsapp}
                scheduleLabel={cta.schedule}
                whatsappMessage={cta.defaultWhatsapp}
              />
              <Link
                href={localizedPath(locale, "/auditoria")}
                className="text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {c.heroAuditLink}
              </Link>
            </div>
          </div>

          <div className="animate-rise-delay-1 relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-10 rounded-full bg-accent/10 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink shadow-[var(--shadow)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={HERO_PHOTO}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-surface">
                  <p className="text-xs uppercase tracking-[0.18em] text-surface/55">
                    {c.heroCardEyebrow}
                  </p>
                  <p className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
                    {c.heroCardTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                <p className="font-display text-sm text-accent">
                  0{i + 1}
                </p>
                <h3 className="font-display mt-2 text-2xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={briefAgentPath(locale)}
              className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:brightness-110"
            >
              {briefCta}
            </Link>
            <Link
              href={microBotPath(locale)}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {microBotCta}
            </Link>
            <Link
              href={copyAdaptPath(locale)}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {copyCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 py-20">
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demos/lugner"
                className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:brightness-110"
              >
                {c.clientDesignCtaDemo}
              </Link>
              <Link
                href={localizedPath(locale, "/auditoria")}
                className="rounded-full border border-ink/20 bg-surface px-5 py-3 text-sm font-medium text-ink"
              >
                {c.clientDesignCtaAudit}
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

      <section className="border-t border-line/70 bg-ink py-20 text-surface">
        <div className="site-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c9a227]">
              {c.mobileErstEyebrow}
            </p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              {c.mobileErstTitle}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-surface/70">
              {c.mobileErstBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={localizedPath(locale, "/auditoria")}
                className="inline-flex rounded-full bg-[#c9a227] px-6 py-3 text-sm font-medium text-ink transition hover:brightness-110"
              >
                {c.mobileErstCta}
              </Link>
              <Link
                href={menuDigitizerPath(locale)}
                className="text-sm font-medium text-[#c9a227] underline-offset-4 hover:underline"
              >
                {menuCta}
              </Link>
              <Link
                href={briefAgentPath(locale)}
                className="text-sm font-medium text-[#c9a227] underline-offset-4 hover:underline"
              >
                {briefCta}
              </Link>
            </div>
          </div>
          <div className="border border-white/10 p-8">
            <p className="font-display text-5xl text-[#c9a227]">0–100</p>
            <p className="mt-3 text-sm text-surface/60">{c.mobileErstScoreNote}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 py-20">
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

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
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
                  <h3 className="font-display mt-2 text-2xl text-ink transition group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted">{project.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/60 py-20">
        <div className="site-shell max-w-3xl">
          <h2 className="font-display text-4xl text-ink">{c.processTitle}</h2>
          <ol className="mt-8 space-y-6">
            {c.processSteps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-2xl text-accent">
                  0{i + 1}
                </span>
                <p className="pt-1 text-lg text-muted">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
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
