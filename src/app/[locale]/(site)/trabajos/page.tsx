import Image from "next/image";
import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { DemoMetricsStrip } from "@/components/demo-metrics-strip";
import { stadtgalerieBenchmark } from "@/lib/demos/benchmarks";
import { getMessages } from "@/lib/i18n/get-messages";
import type { ProjectMessages } from "@/lib/i18n/messages/types";
import { pageMetadata } from "@/lib/i18n/metadata";
import { localizedPath } from "@/lib/i18n/paths";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const AFTER_HERO = "/demos/lugner-hero.jpg";
const GASTHAUS_THUMB =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
const VILLA_THUMB =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80";
const SOLO_MODAS_THUMB =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80";
const UNIVERSO_THUMB =
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80";
const VAULTSHIELD_THUMB = "/demos/vaultshield/hero-poster.webp";

type Props = { params: Promise<{ locale: string }> };

function projectThumb(slug: string) {
  switch (slug) {
    case "restaurant":
      return GASTHAUS_THUMB;
    case "villa-italia":
      return VILLA_THUMB;
    case "solo-modas":
      return SOLO_MODAS_THUMB;
    case "universo-del-calzado":
      return UNIVERSO_THUMB;
    case "vaultshield":
      return VAULTSHIELD_THUMB;
    default:
      return null;
  }
}

function ProjectList({
  projects,
  locale,
  openLabel,
}: {
  projects: ProjectMessages[];
  locale: Locale;
  openLabel: string;
}) {
  return (
    <ul className="mt-10">
      {projects.map((project) => {
        const thumb = projectThumb(project.slug);
        return (
          <li
            key={project.slug}
            className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 md:aspect-square">
              {thumb ? (
                <Image
                  src={thumb}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              ) : (
                <div className="flex h-full items-end bg-[linear-gradient(145deg,#0b5f63_0%,#15202b_100%)] p-4">
                  <span className="font-display text-2xl leading-none text-white">
                    SV
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                {project.type}
              </p>
              <h3 className="font-display mt-2 text-2xl tracking-tight text-ink sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                {project.blurb}
              </p>
            </div>
            <Link
              href={
                project.href.startsWith("/demos")
                  ? project.href
                  : localizedPath(locale, project.href)
              }
              className="inline-flex w-fit items-center border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent-soft md:justify-self-end"
            >
              {openLabel}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return pageMetadata(raw, "work", "/trabajos");
}

export default async function TrabajosPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const m = getMessages(locale);
  const w = m.work;
  const cta = m.cta;
  const templates = m.projects.filter((p) => p.group === "template");
  const saas = m.projects.filter((p) => p.group === "saas");

  return (
    <div className="pb-24">
      <header className="site-shell pt-16 sm:pt-20">
        <h1 className="animate-rise font-display text-5xl tracking-tight text-ink sm:text-6xl">
          {w.title}
        </h1>
        <p className="animate-rise-delay-1 mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {w.lead}
        </p>
      </header>

      <section className="site-shell mt-16 border-t border-line pt-14 sm:mt-20 sm:pt-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
          {w.viennaTitle}
        </p>
        <p className="mt-2 max-w-xl text-sm text-muted">{w.viennaLead}</p>
        <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight text-ink">
          {w.stadtgalerieTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          {w.stadtgalerieBody}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-hot">
              {w.before}
            </p>
            <div className="mt-4 overflow-hidden border border-ink/20 bg-surface">
              <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
                <span className="size-1.5 rounded-full bg-ink/25" aria-hidden />
                <span className="size-1.5 rounded-full bg-ink/25" aria-hidden />
                <span className="size-1.5 rounded-full bg-ink/25" aria-hidden />
                <span className="ml-2 truncate text-[10px] text-muted">
                  {w.beforeHost}
                </span>
              </div>
              <div className="relative aspect-[4/5] bg-[#d8dde2]">
                <Image
                  src="/trabajos/lugner-before.jpg"
                  alt={w.beforeHost}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {w.beforeNote}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {w.after}
            </p>
            <Link
              href="/demos/stadtgalerie"
              className="group mt-4 block overflow-hidden border border-ink/20 transition hover:border-accent"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0b1016] px-3 py-2">
                <span className="size-1.5 rounded-full bg-white/35" aria-hidden />
                <span className="size-1.5 rounded-full bg-white/35" aria-hidden />
                <span className="size-1.5 rounded-full bg-white/35" aria-hidden />
                <span className="ml-2 truncate text-[10px] text-white/55">
                  demo · Konzept
                </span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0b1016]">
                <Image
                  src={AFTER_HERO}
                  alt={w.caseBrand}
                  fill
                  className="object-cover object-center opacity-55 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-60"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0b1016] via-[#0b1016]/40 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#d4b45a]">
                    Wien 15
                  </p>
                  <p className="font-display mt-2 text-[clamp(1.75rem,4vw,2.35rem)] leading-[0.9] tracking-tight text-[#f5f1e8]">
                    {w.caseBrand}
                  </p>
                  <p className="mt-3 max-w-[22ch] text-xs leading-relaxed text-[#e8e4dc]/90 sm:text-sm">
                    Öffnungszeiten · Shops · Anfahrt — klar auf dem Handy.
                  </p>
                  <span className="mt-5 inline-flex bg-[#d4b45a] px-3.5 py-2 text-[11px] font-semibold text-[#1a1408]">
                    {w.openDemo}
                  </span>
                </div>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {w.afterNote}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Link
            href="/demos/stadtgalerie"
            className="inline-flex bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {w.openDemoCta}
          </Link>
          <p className="max-w-md text-xs text-muted">{w.konzeptNote}</p>
        </div>

        <DemoMetricsStrip benchmark={stadtgalerieBenchmark} labels={w} />
      </section>

      <section className="site-shell mt-20 border-t border-line pt-14 sm:mt-24 sm:pt-16">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-ink">
          {w.templatesTitle}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
          {w.templatesLead}
        </p>
        <p className="mt-2 text-sm text-accent">{w.templatesNote}</p>
        <ProjectList projects={templates} locale={locale} openLabel={w.open} />
      </section>

      {saas.length > 0 ? (
        <section className="site-shell mt-16 border-t border-line pt-14 sm:mt-20 sm:pt-16">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-ink">
            {w.saasTitle}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            {w.saasLead}
          </p>
          <ProjectList projects={saas} locale={locale} openLabel={w.open} />
        </section>
      ) : null}

      <section className="site-shell mt-16 border-t border-line pt-14 sm:mt-20 sm:pt-16">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-ink">
          {w.pricingTitle}
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          {w.pricingLead}
        </p>
        <ul className="mt-10">
          {m.packages.map((pkg) => (
            <li
              key={pkg.id}
              className="grid gap-2 border-t border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <h3 className="font-display text-xl text-ink sm:text-2xl">
                  {pkg.name}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {pkg.description}
                </p>
              </div>
              <p className="text-lg font-medium tabular-nums text-accent sm:text-right">
                {pkg.price}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{w.centerNote}</p>
        <div className="mt-10">
          <CtaButtons
            whatsappLabel={cta.whatsapp}
            scheduleLabel={cta.schedule}
            whatsappMessage={w.whatsappMessage}
          />
        </div>
      </section>
    </div>
  );
}
