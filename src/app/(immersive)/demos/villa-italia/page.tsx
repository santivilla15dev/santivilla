import type { Metadata } from "next";
import Image from "next/image";
import { DemoCtaBand, DemoCtaFooterSanti } from "@/components/demos/demo-cta-band";
import { DemoHero } from "@/components/demos/demo-hero";
import { DemoShell } from "@/components/demos/demo-shell";
import { getDemoTheme } from "@/lib/demos/themes";
import {
  villaItaliaDemo,
  villaItaliaMapsEmbedUrl,
  villaItaliaWhatsAppHref,
} from "@/lib/demos/villa-italia";

export const metadata: Metadata = {
  title: "Villa Italia — Demo",
  description:
    "Demo pizzería Colombia: carta, horarios, domicilios y WhatsApp — mobile-first.",
  robots: { index: false, follow: false },
};

export default function VillaItaliaDemoPage() {
  const d = villaItaliaDemo;
  const theme = getDemoTheme("villa-italia");
  const wa = villaItaliaWhatsAppHref();
  const waDelivery = villaItaliaWhatsAppHref(
    "Hola Villa Italia, quiero pedir a domicilio. Mi dirección es: ",
  );

  return (
    <DemoShell themeId="villa-italia">
      <DemoHero
        imageSrc={d.heroImage}
        imageAlt="Pizza al horno de leña en Villa Italia"
        eyebrow={`${d.city} · ${d.region}`}
        title={d.name}
        lead={d.tagline}
        ctas={[
          { href: wa, label: "Pedir por WhatsApp", external: true },
          { href: "#pizzas", label: "Ver carta", variant: "ghost" },
        ]}
      />

      {/* Barra sticky de anclas de carta */}
      <nav
        className="sticky top-[2.75rem] z-40 border-b backdrop-blur-md"
        style={{
          borderColor: "var(--demo-border)",
          background: "color-mix(in srgb, var(--demo-bg) 92%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-[var(--demo-max)] gap-1 overflow-x-auto px-5 py-3 text-[11px] uppercase tracking-[0.16em] sm:px-8">
          {theme.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="demo-text-muted shrink-0 px-3 py-2 transition hover:text-[var(--demo-ink)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 px-3 py-2 font-semibold"
            style={{ color: "var(--demo-accent)" }}
          >
            WhatsApp
          </a>
        </div>
      </nav>

      <main>
        {/* Especialidad full-bleed */}
        <section
          id="especialidad"
          className="relative scroll-mt-20 min-h-[70svh] overflow-hidden"
        >
          <Image
            src={d.specialtyBand.image}
            alt={d.specialtyBand.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1a120e 0%, rgba(26,18,14,0.75) 50%, rgba(26,18,14,0.2) 100%)",
            }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[var(--demo-max)] flex-col justify-end px-5 py-16 sm:px-8">
            <p className="demo-eyebrow">Lo que más piden</p>
            <h2 className="font-display mt-3 max-w-[14ch] text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-[var(--demo-ink)]">
              {d.specialtyBand.title}
            </h2>
            <p className="demo-text-muted mt-4 max-w-md text-[15px] leading-relaxed">
              {d.specialtyBand.note}
            </p>
            <p className="mt-4 text-sm" style={{ color: "var(--demo-accent-secondary)" }}>
              {d.deliveryNote}
            </p>
          </div>
        </section>

        {/* Carta por secciones con anclas */}
        <section className="mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-24">
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
            Carta
          </h2>
          <p className="demo-text-subtle mt-3 text-sm">
            Precios en COP (placeholder) — pide por WhatsApp
          </p>
          <div className="mt-14 space-y-16">
            {d.menu.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-28">
                <h3 className="demo-eyebrow">{group.section}</h3>
                <ul className="mt-5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-6 border-b py-5 last:border-b-0"
                      style={{ borderColor: "var(--demo-border)" }}
                    >
                      <div>
                        <p className="font-display text-xl tracking-tight text-[var(--demo-ink)] sm:text-2xl">
                          {item.name}
                        </p>
                        {item.note ? (
                          <p className="demo-text-subtle mt-1.5 text-sm">{item.note}</p>
                        ) : null}
                      </div>
                      <p
                        className="shrink-0 tabular-nums"
                        style={{ color: "var(--demo-accent)" }}
                      >
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="ubicacion"
          className="scroll-mt-28 border-t"
          style={{ borderColor: "var(--demo-border)", background: "var(--demo-panel)" }}
        >
          <div className="mx-auto grid max-w-[var(--demo-max)] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-[var(--demo-ink)]">
                Dónde estamos
              </h2>
              <p className="demo-text-muted mt-6 text-[15px] leading-relaxed">
                {d.address}
                <br />
                {d.city}, {d.region}
              </p>
              <ul className="mt-6 space-y-2 text-sm demo-text-muted">
                {d.hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-4 max-w-xs">
                    <span>{row.days}</span>
                    <span className="tabular-nums">{row.time}</span>
                  </li>
                ))}
              </ul>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-btn-primary mt-8"
              >
                WhatsApp
              </a>
            </div>
            <div className="demo-map min-h-[16rem]">
              <iframe
                title={`Mapa ${d.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={villaItaliaMapsEmbedUrl()}
              />
            </div>
          </div>
        </section>

        <DemoCtaBand
          title="Domicilio en un mensaje"
          lead="Escribe tu pedido por WhatsApp — pizza, pasta o combo. Te confirmamos tiempo y total."
          ctaHref={waDelivery}
          ctaLabel="Pedir domicilio"
          external
          footer={
            <>
              <DemoCtaFooterSanti /> — adaptable para tu pizzería en Colombia.
            </>
          }
        />
      </main>
    </DemoShell>
  );
}
