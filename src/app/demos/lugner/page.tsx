import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lugner City — Redesign Konzept",
  description:
    "Konzept / Redesign-Vorschlag — keine offizielle Website von Lugner City.",
  robots: { index: false, follow: false },
};

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
  "Papier / Bücher / Medien",
  "Accessoires / Optik",
  "Sonstiges",
  "Dienstleistungen",
  "Gastronomie",
  "Ärztezentrum",
];

const transit = [
  { line: "U6", stop: "Burggasse / Stadthalle" },
  { line: "48A", stop: "Lugner City (stadteinwärts) · Koppstraße (stadtauswärts)" },
  { line: "6 / 18", stop: "Burggasse / Stadthalle" },
  { line: "9 / 49", stop: "Urban-Loritz-Platz" },
];

const nav = [
  { href: "#zeiten", label: "Zeiten" },
  { href: "#shops", label: "Shops" },
  { href: "#anfahrt", label: "Anfahrt" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function LugnerDemoPage() {
  return (
    <div className="min-h-screen bg-[#0c1218] text-[#f2f0eb]">
      {/* Banner legal / ético */}
      <div className="sticky top-0 z-50 bg-[#c9a227] px-4 py-2.5 text-center text-[11px] font-semibold leading-snug tracking-wide text-[#1a1408] sm:text-xs">
        Konzept / Redesign-Vorschlag — keine offizielle Website von Lugner City
      </div>

      {/* Hero full-bleed */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#1f3d4a_0%,transparent_50%),linear-gradient(160deg,#101820_0%,#0c1218_55%,#1a2830_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-lg px-5 pb-14 pt-10 sm:max-w-2xl">
          <nav className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-white/55">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 px-3 py-1.5 transition hover:border-white/40 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.28em] text-[#c9a227]">
            Wien 15 · Gablenzgasse
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(3rem,14vw,4.75rem)] leading-[0.9] tracking-tight">
            Lugner
            <br />
            City
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            Shoppen, Ärztezentrum, Kino und Gastro — klar auf dem Handy. Öffnen,
            finden, ankommen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#zeiten"
              className="rounded-full bg-[#c9a227] px-5 py-3 text-sm font-semibold text-[#1a1408] transition hover:brightness-110"
            >
              Öffnungszeiten
            </a>
            <a
              href="#shops"
              className="rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Shops entdecken
            </a>
          </div>

          <p className="mt-10 text-sm text-white/45">
            Heute offen · Mo–Fr bis 21.00 · Sa bis 18.00
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg space-y-4 px-4 pb-24 sm:max-w-2xl">
        <section
          id="zeiten"
          className="scroll-mt-16 rounded-3xl bg-[#151d26] p-6"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Öffnungszeiten
          </h2>
          <ul className="mt-6 space-y-5">
            {hours.map((block) => (
              <li
                key={block.title}
                className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
              >
                <p className="font-medium text-[#c9a227]">{block.title}</p>
                {block.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-white/75">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </section>

        <section id="shops" className="scroll-mt-16 rounded-3xl bg-[#151d26] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Shops & Kategorien
          </h2>
          <p className="mt-2 text-sm text-white/55">
            Schnellfilter — Auswahl der öffentlichen Kategorien von lugner.at
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {shopCategories.map((cat) => (
              <li key={cat}>
                <span className="flex min-h-14 items-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm leading-snug text-white/85">
                  {cat}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-white/40">
            Vollständiges Shop-Verzeichnis folgt im produktiven Relaunch.
          </p>
        </section>

        <section
          id="anfahrt"
          className="scroll-mt-16 rounded-3xl bg-[#151d26] p-6"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Anfahrt
          </h2>
          <ul className="mt-6 space-y-4">
            {transit.map((t) => (
              <li key={t.line} className="flex gap-4">
                <span className="flex h-10 min-w-16 items-center justify-center rounded-xl bg-[#c9a227] px-2 text-sm font-bold text-[#1a1408]">
                  {t.line}
                </span>
                <p className="pt-2 text-sm text-white/75">{t.stop}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/50">Parken & Shoppen vor Ort.</p>
        </section>

        <section
          id="kontakt"
          className="scroll-mt-16 rounded-3xl bg-[#c9a227] p-6 text-[#1a1408]"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Kontakt
          </h2>
          <p className="mt-4 font-medium">Lugner City GmbH</p>
          <p className="mt-1 text-sm leading-relaxed opacity-80">
            Wien 15, Gablenzgasse 11
            <br />
            Tel:{" "}
            <a href="tel:+431981500" className="underline underline-offset-2">
              01-98 150-0
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:friede@lugner.at"
              className="underline underline-offset-2"
            >
              friede@lugner.at
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            <a
              href="https://www.lugner.at"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1a1408] px-4 py-2 text-[#f2f0eb]"
            >
              Aktuelle Website
            </a>
            <Link
              href="/contacto"
              className="rounded-full border border-[#1a1408]/35 px-4 py-2"
            >
              Redesign anfragen (Santi)
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
