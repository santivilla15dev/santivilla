import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gasthaus Am Hof — Demo",
  description:
    "Plantilla demo de restaurante: menú, horarios, mapa y WhatsApp.",
  robots: { index: false, follow: false },
};

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
      { name: "Wiener Schnitzel", price: "€18,90", note: "vom Kalb, Erdäpfelsalat" },
      { name: "Tafelspitz", price: "€21,50", note: "Apfelkren, Schnittlauchsauce" },
      { name: "Gemüse-Strudel", price: "€14,90", note: "saisonales Gemüse" },
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

export default function RestaurantDemoPage() {
  const wa =
    "https://wa.me/436600000000?text=" +
    encodeURIComponent(
      "Hallo! Ich möchte einen Tisch im Gasthaus Am Hof reservieren.",
    );

  return (
    <div className="min-h-screen bg-[#1c1410] text-[#f6efe6]">
      <div className="sticky top-0 z-50 bg-[#8b4518]/90 px-4 py-2 text-center text-[11px] font-semibold text-[#fff8f0] backdrop-blur sm:text-xs">
        Demo-Vorlage · fiktives Gasthaus — keine echte Reservation
      </div>

      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,20,16,0.25) 0%, rgba(28,20,16,0.85) 70%, #1c1410 100%), radial-gradient(ellipse at 70% 20%, #5c3a22 0%, #1c1410 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-lg px-5 pb-16 pt-12 sm:max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d4a574]">
            Wien · Innere Stadt
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.8rem,12vw,4.5rem)] leading-[0.92]">
            Gasthaus
            <br />
            Am Hof
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#f6efe6]/75">
            Wiener Klassiker, saisonale Küche und ein Tisch, den man in 10
            Sekunden reserviert.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#d4a574] px-5 py-3 text-sm font-semibold text-[#1c1410] transition hover:brightness-110"
            >
              Tisch reservieren
            </a>
            <a
              href="#speisekarte"
              className="rounded-full border border-[#f6efe6]/25 px-5 py-3 text-sm font-medium"
            >
              Speisekarte
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 pb-24 sm:max-w-2xl">
        <section className="rounded-3xl bg-[#2a1f19] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Öffnungszeiten
          </h2>
          <ul className="mt-5 space-y-2 text-sm text-[#f6efe6]/80">
            <li className="flex justify-between gap-4 border-b border-white/10 py-2">
              <span>Di–Fr</span>
              <span>11.30–14.30 · 17.30–22.00</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/10 py-2">
              <span>Sa–So</span>
              <span>11.30–22.00</span>
            </li>
            <li className="flex justify-between gap-4 py-2">
              <span>Montag</span>
              <span>Ruhetag</span>
            </li>
          </ul>
        </section>

        <section
          id="speisekarte"
          className="scroll-mt-16 rounded-3xl bg-[#2a1f19] p-6"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Speisekarte
          </h2>
          <div className="mt-6 space-y-8">
            {menu.map((group) => (
              <div key={group.section}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a574]">
                  {group.section}
                </h3>
                <ul className="mt-3 space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-[#f6efe6]/55">{item.note}</p>
                      </div>
                      <p className="shrink-0 text-[#d4a574]">{item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#2a1f19] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Anfahrt
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#f6efe6]/75">
            Am Hof 1, 1010 Wien
            <br />
            U1 / U3 Stephansplatz · wenige Gehminuten
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Karte Gasthaus Am Hof"
              className="h-52 w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Am%20Hof%20Wien&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </section>

        <section className="rounded-3xl bg-[#d4a574] p-6 text-[#1c1410]">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Reservieren
          </h2>
          <p className="mt-3 text-sm leading-relaxed opacity-80">
            Schreib uns auf WhatsApp — Name, Uhrzeit, Personenanzahl. Wir
            melden uns in Minuten.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-[#1c1410] px-5 py-3 text-sm font-semibold text-[#f6efe6]"
          >
            WhatsApp öffnen
          </a>
          <p className="mt-6 text-xs opacity-60">
            Vorlage von{" "}
            <Link href="/" className="underline underline-offset-2">
              Santi Villa
            </Link>{" "}
            — anpassbar für dein Lokal.
          </p>
        </section>
      </main>
    </div>
  );
}
