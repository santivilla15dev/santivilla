import type { Metadata } from "next";
import Image from "next/image";
import { MicroBotWidgetLazy } from "@/components/micro-bot-widget-lazy";
import { DemoCtaBand, DemoCtaFooterSanti } from "@/components/demos/demo-cta-band";
import { DemoNav } from "@/components/demos/demo-nav";
import { DemoShell } from "@/components/demos/demo-shell";
import { getDemoTheme } from "@/lib/demos/themes";
import { getMessages } from "@/lib/i18n/get-messages";

export const metadata: Metadata = {
  title: "Gasthaus Am Hof — Demo",
  description:
    "Plantilla demo de restaurante: menú, horarios, mapa y WhatsApp.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85";

const menu = [
  {
    section: "Vorspeisen",
    items: [
      { name: "Rindssuppe", price: "€5,90", note: "mit Frittaten" },
      { name: "Käseknödel", price: "€8,50", note: "auf Blattsalat" },
    ],
  },
  {
    section: "Hauptgerichte",
    items: [
      {
        name: "Wiener Schnitzel",
        price: "€18,90",
        note: "vom Kalb, Erdäpfelsalat",
      },
      {
        name: "Tafelspitz",
        price: "€21,50",
        note: "Apfelkren, Schnittlauchsauce",
      },
      {
        name: "Gemüse-Strudel",
        price: "€14,90",
        note: "saisonales Gemüse",
      },
    ],
  },
  {
    section: "Süßes",
    items: [
      { name: "Apfelstrudel", price: "€6,50", note: "Vanillesauce" },
      { name: "Sachertorte", price: "€7,20", note: "Schlagobers" },
    ],
  },
];

const hours = [
  { days: "Di–Fr", time: "11.30–14.30 · 17.30–22.00" },
  { days: "Sa–So", time: "11.30–22.00" },
  { days: "Montag", time: "Ruhetag" },
];

export default function RestaurantDemoPage() {
  const theme = getDemoTheme("gasthaus");
  const botLabels = getMessages("de").microBot;
  const wa =
    "https://wa.me/436600000000?text=" +
    encodeURIComponent(
      "Hallo! Ich möchte einen Tisch im Gasthaus Am Hof reservieren.",
    );

  return (
    <DemoShell themeId="gasthaus">
      {/* Hero: imagen media altura + bloque tipográfico crema */}
      <header>
        <div className="relative h-[42svh] min-h-[14rem] w-full overflow-hidden sm:h-[48svh]">
          <Image
            src={HERO}
            alt="Warmes Restaurantinterieur mit gedeckten Tischen"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="mx-auto max-w-[var(--demo-max)] px-5 py-12 sm:px-8 sm:py-16">
          <p className="demo-eyebrow">Wien · Innere Stadt</p>
          <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(2.75rem,8vw,4.5rem)] leading-[0.95] tracking-tight text-[var(--demo-ink)]">
            Gasthaus Am Hof
          </h1>
          <p className="demo-text-muted mt-5 max-w-lg text-base leading-relaxed">
            Wiener Klassiker, saisonale Küche — und ein Tisch, den man in zehn
            Sekunden reserviert.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="demo-btn-primary">
              Tisch reservieren
            </a>
            <a href="#speisekarte" className="demo-btn-ghost">
              Speisekarte
            </a>
          </div>
        </div>
      </header>

      <DemoNav items={theme.nav} />

      <main>
        {/* Carta editorial + aside horarios sticky */}
        <section
          id="speisekarte"
          className="scroll-mt-20 border-t"
          style={{ borderColor: "var(--demo-border)" }}
        >
          <div className="mx-auto grid max-w-[var(--demo-max)] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,36rem)_1fr] md:gap-16 md:py-24 lg:grid-cols-[minmax(0,38rem)_14rem]">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-[var(--demo-ink)]">
                Speisekarte
              </h2>
              <p className="demo-text-subtle mt-2 text-sm">
                Beispielkarte — fiktiv für die Demo
              </p>
              <div className="mt-12 space-y-12">
                {menu.map((group) => (
                  <div key={group.section}>
                    <h3 className="demo-eyebrow">{group.section}</h3>
                    <ul className="mt-5">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="border-b py-5 last:border-b-0"
                          style={{ borderColor: "var(--demo-border)" }}
                        >
                          <div className="demo-menu-leaders">
                            <span className="font-display text-xl tracking-tight text-[var(--demo-ink)] sm:text-2xl">
                              {item.name}
                            </span>
                            <span className="demo-menu-dots" aria-hidden />
                            <span
                              className="shrink-0 tabular-nums text-sm font-medium sm:text-base"
                              style={{ color: "var(--demo-accent)" }}
                            >
                              {item.price}
                            </span>
                          </div>
                          {item.note ? (
                            <p className="demo-text-subtle mt-1.5 text-sm">{item.note}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <aside
              id="zeiten"
              className="scroll-mt-20 h-fit border p-6 md:sticky md:top-28"
              style={{
                borderColor: "var(--demo-border)",
                background: "var(--demo-panel)",
              }}
            >
              <h2 className="font-display text-xl tracking-tight text-[var(--demo-ink)]">
                Öffnungszeiten
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-3">
                    <span>{row.days}</span>
                    <span className="demo-text-muted tabular-nums text-right">
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
              <div id="kontakt" className="mt-8 border-t pt-6" style={{ borderColor: "var(--demo-border)" }}>
                <p className="text-sm leading-relaxed">
                  Am Hof 1, 1010 Wien
                  <br />
                  U1 / U3 Stephansplatz
                </p>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-btn-primary mt-5 w-full"
                >
                  WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="anfahrt"
          className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 pb-12 sm:px-8"
        >
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] tracking-tight text-[var(--demo-ink)]">
            Anfahrt
          </h2>
          <div className="demo-map mt-6 min-h-[16rem]">
            <iframe
              title="Karte Gasthaus Am Hof"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Am%20Hof%20Wien&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </section>

        <DemoCtaBand
          title="Tisch in 10 Sekunden"
          lead="Name, Uhrzeit, Personenanzahl per WhatsApp — Antwort in Minuten."
          ctaHref={wa}
          ctaLabel="WhatsApp öffnen"
          external
          footer={
            <>
              Vorlage von <DemoCtaFooterSanti /> — anpassbar für dein Lokal.
            </>
          }
        />
      </main>

      <MicroBotWidgetLazy locale="de" labels={botLabels} />
    </DemoShell>
  );
}
