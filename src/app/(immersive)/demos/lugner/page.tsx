import type { Metadata } from "next";
import Link from "next/link";
import { DemoMetricsStrip } from "@/components/demo-metrics-strip";
import { DemoHero } from "@/components/demos/demo-hero";
import { DemoNav } from "@/components/demos/demo-nav";
import { DemoShell } from "@/components/demos/demo-shell";
import { lugnerBenchmark } from "@/lib/demos/benchmarks";
import { getDemoTheme } from "@/lib/demos/themes";

export const metadata: Metadata = {
  title: "Lugner City — Redesign Konzept",
  description:
    "Konzept / Redesign-Vorschlag — keine offizielle Website von Lugner City.",
  robots: { index: false, follow: false },
};

const HERO = "/demos/lugner-hero.jpg";

const hours = [
  {
    title: "Lugner City",
    lines: ["Mo–Fr 9.00–21.00 Uhr", "Sa 9.00–18.00 Uhr"],
  },
  {
    title: "Gastronomie Mörtelmarkt",
    lines: [
      "Mo–Do 9.00–23.00 Uhr",
      "Fr+Sa 9.00–24.00 Uhr",
      "So 10.00–23.00 Uhr",
    ],
  },
  {
    title: "Gastronomie Kino City",
    lines: [
      "Mo–Do 9.00–24.00 Uhr",
      "Fr+Sa 9.00–2.00 Uhr",
      "So 10.00–24.00 Uhr",
    ],
  },
];

const shopCategories = [
  "Lebensmittel",
  "Drogerie",
  "Bekleidung",
  "Schuhe / Leder",
  "Elektronik",
  "Spiel / Sport",
  "Papier / Bücher",
  "Accessoires / Optik",
  "Dienstleistungen",
  "Gastronomie",
  "Ärztezentrum",
  "Sonstiges",
];

const transit = [
  { line: "U6", stop: "Burggasse / Stadthalle" },
  { line: "48A", stop: "Lugner City · Koppstraße" },
  { line: "6 / 18", stop: "Burggasse / Stadthalle" },
  { line: "9 / 49", stop: "Urban-Loritz-Platz" },
];

export default function LugnerDemoPage() {
  const theme = getDemoTheme("lugner");

  return (
    <DemoShell themeId="lugner">
      <DemoHero
        variant="compact"
        imageSrc={HERO}
        imageAlt="Stadtansicht — Lugner City Wien"
        eyebrow="Wien 15 · Gablenzgasse"
        title="Lugner City"
        lead="Shoppen, Ärztezentrum, Kino und Gastro — klar auf dem Handy. Öffnen, finden, ankommen."
        ctas={[
          { href: "#shops", label: "Shops" },
          { href: "#zeiten", label: "Zeiten", variant: "ghost" },
        ]}
      />

      <DemoNav items={theme.nav} sticky />

      <div
        className="border-b px-5 py-3 sm:px-8"
        style={{ borderColor: "var(--demo-border)", background: "var(--demo-bg)" }}
      >
        <div className="mx-auto max-w-[var(--demo-max)]">
          <p className="demo-eyebrow text-[10px] opacity-75">Konzept — nicht offiziell</p>
          <DemoMetricsStrip
            benchmark={lugnerBenchmark}
            labels={{
              metricsTitle: "",
              metricsSource: "",
              metricsBefore: "",
              metricsAfter: "",
              metricsPerformance: "",
              metricsLcp: "",
              metricsFcp: "",
              metricsUxNote: "",
            }}
            compact
          />
        </div>
      </div>

      <main>
        {/* Directorio tipográfico primero — pieza principal del mall */}
        <section
          id="shops"
          className="scroll-mt-20 border-b"
          style={{ borderColor: "var(--demo-border)", background: "var(--demo-panel)" }}
        >
          <div className="mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-24">
            <p className="demo-eyebrow">Verzeichnis</p>
            <h2 className="font-display mt-3 text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
              Shops & Kategorien
            </h2>
            <p className="demo-text-muted mt-3 max-w-lg text-[15px]">
              Öffentliche Kategorien von lugner.at — im Relaunch mit Suche und Filter.
            </p>
            <ul className="mt-12 columns-1 gap-x-16 sm:columns-2 lg:columns-3">
              {shopCategories.map((cat) => (
                <li
                  key={cat}
                  className="break-inside-avoid border-b py-3.5 font-display text-lg tracking-tight text-[var(--demo-ink)] sm:text-xl"
                  style={{ borderColor: "var(--demo-border)" }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Horarios compactos */}
        <section
          id="zeiten"
          className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 py-14 sm:px-8 md:py-16"
        >
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] tracking-tight text-[var(--demo-ink)]">
            Öffnungszeiten
          </h2>
          <p className="demo-text-muted mt-2 text-sm">
            Heute offen · Mo–Fr bis 21.00 · Sa bis 18.00
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {hours.map((block) => (
              <li
                key={block.title}
                className="border-t pt-4"
                style={{ borderColor: "var(--demo-border)" }}
              >
                <p className="text-sm font-medium" style={{ color: "var(--demo-accent)" }}>
                  {block.title}
                </p>
                {block.lines.map((line) => (
                  <p key={line} className="demo-text-muted mt-1.5 text-sm">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </section>

        {/* Anfahrt timeline */}
        <section
          id="anfahrt"
          className="scroll-mt-20 border-t"
          style={{ borderColor: "var(--demo-border)" }}
        >
          <div className="mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-24">
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
              Anfahrt
            </h2>
            <ul className="relative mt-10 ml-3 space-y-0 border-l-2 pl-8 sm:ml-4"
              style={{ borderColor: "var(--demo-accent)" }}
            >
              {transit.map((t) => (
                <li key={t.line} className="relative pb-10 last:pb-0">
                  <span
                    className="absolute -left-[2.15rem] top-0 flex size-6 items-center justify-center rounded-sm text-[10px] font-bold"
                    style={{
                      background: "var(--demo-accent)",
                      color: "var(--demo-cta-ink)",
                    }}
                    aria-hidden
                  />
                  <span
                    className="font-display text-2xl sm:text-3xl"
                    style={{ color: "var(--demo-accent)" }}
                  >
                    {t.line}
                  </span>
                  <p className="demo-text-muted mt-1 text-[15px]">{t.stop}</p>
                </li>
              ))}
            </ul>
            <p className="demo-text-subtle mt-8 text-sm">Parken & Shoppen vor Ort.</p>
            <div className="demo-map mt-10 min-h-[18rem] w-full">
              <iframe
                title="Karte Lugner City Wien"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Lugner+City+Wien&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </section>

        <section
          id="kontakt"
          className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20"
          style={{
            background: "var(--demo-cta-band-bg)",
            color: "var(--demo-cta-band-ink)",
          }}
        >
          <div className="mx-auto max-w-[var(--demo-max)]">
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight">
              Kontakt
            </h2>
            <p className="mt-5 font-medium">Lugner City GmbH</p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed opacity-85">
              Wien 15, Gablenzgasse 11
              <br />
              Tel:{" "}
              <a href="tel:+431981500" className="underline underline-offset-2">
                01-98 150-0
              </a>
              <br />
              Email:{" "}
              <a href="mailto:friede@lugner.at" className="underline underline-offset-2">
                friede@lugner.at
              </a>
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
              <a
                href="https://www.lugner.at"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-5 py-3.5 transition hover:brightness-110"
                style={{
                  borderRadius: "var(--demo-btn-radius)",
                  background: "var(--demo-bg)",
                  color: "var(--demo-ink)",
                }}
              >
                Aktuelle Website
              </a>
              <Link
                href="/contacto"
                className="inline-flex border px-5 py-3.5 transition hover:opacity-80"
                style={{
                  borderRadius: "var(--demo-btn-radius)",
                  borderColor:
                    "color-mix(in srgb, var(--demo-cta-band-ink) 40%, transparent)",
                }}
              >
                Redesign anfragen (Santi)
              </Link>
            </div>
          </div>
        </section>
      </main>
    </DemoShell>
  );
}
