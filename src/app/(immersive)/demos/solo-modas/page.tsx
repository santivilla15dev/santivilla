import type { Metadata } from "next";
import Image from "next/image";
import { DemoCtaBand, DemoCtaFooterSanti } from "@/components/demos/demo-cta-band";
import { DemoHero } from "@/components/demos/demo-hero";
import { DemoNav } from "@/components/demos/demo-nav";
import { DemoShell } from "@/components/demos/demo-shell";
import { DemoStoreLocator } from "@/components/demos/demo-store-locator";
import { getDemoTheme } from "@/lib/demos/themes";
import {
  soloModasDemo,
  soloModasMapsEmbedUrl,
  soloModasWhatsAppHref,
} from "@/lib/demos/solo-modas";

export const metadata: Metadata = {
  title: "Solo Modas — Demo",
  description:
    "Demo tienda de ropa Colombia: categorías, sedes, horarios y WhatsApp — mobile-first.",
  robots: { index: false, follow: false },
};

export default function SoloModasDemoPage() {
  const d = soloModasDemo;
  const theme = getDemoTheme("solo-modas");
  const wa = soloModasWhatsAppHref();
  const mainStore = d.stores[0];
  const storeLocations = d.stores.map((store) => ({
    name: store.name,
    address: store.address,
    city: store.city,
    hours: store.hours,
    mapsEmbedUrl: soloModasMapsEmbedUrl(store.mapsQuery),
  }));

  return (
    <DemoShell themeId="solo-modas">
      <DemoHero
        variant="split"
        imageSrc={d.heroImage}
        imageAlt="Interior editorial de tienda de moda Solo Modas"
        eyebrow={`${d.city} · Moda`}
        title={d.name}
        lead={d.tagline}
        ctas={[
          { href: wa, label: "Escribir por WhatsApp", external: true },
          { href: "#colecciones", label: "Colecciones", variant: "ghost" },
        ]}
      />

      <DemoNav items={theme.nav} />

      <main>
        {/* Índice tipográfico — sin cards */}
        <section
          id="colecciones"
          className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 py-20 sm:px-8 md:py-28"
        >
          <p className="demo-eyebrow">Índice</p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
            Colecciones
          </h2>
          <ul className="mt-14">
            {d.categories.map((cat) => (
              <li
                key={cat.title}
                className="grid gap-2 border-b py-8 md:grid-cols-[1fr_auto] md:items-end"
                style={{ borderColor: "var(--demo-border)" }}
              >
                <div>
                  <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight text-[var(--demo-ink)]">
                    {cat.title}
                  </h3>
                  <p className="demo-text-muted mt-3 max-w-md text-[15px] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <p className="demo-text-subtle text-sm md:text-right">{cat.priceFrom}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Lookbook full-bleed */}
        {d.lookbookImages.map((src, i) => (
          <section
            key={src}
            className="relative h-[55svh] min-h-[16rem] w-full overflow-hidden sm:h-[70svh]"
          >
            <Image
              src={src}
              alt={i === 0 ? "Lookbook Solo Modas — colección" : "Lookbook Solo Modas — detalle"}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </section>
        ))}

        <DemoStoreLocator stores={storeLocations} id="tiendas" />

        <section
          id="contacto"
          className="scroll-mt-20 border-t"
          style={{ borderColor: "var(--demo-border)" }}
        >
          <div className="mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-20">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-[var(--demo-ink)]">
              Contacto
            </h2>
            <p className="demo-text-muted mt-6 max-w-lg text-[15px] leading-relaxed">
              ¿Quieres saber si hay tu talla o qué tienda abre hoy? Escríbenos por
              WhatsApp — te respondemos desde la sede más cercana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="demo-btn-primary">
                WhatsApp
              </a>
              <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="demo-btn-ghost">
                Llamar
              </a>
            </div>
          </div>
        </section>

        <DemoCtaBand
          title="Visítanos hoy"
          lead={`${mainStore.name} — ${mainStore.address}, ${mainStore.city}`}
          ctaHref={wa}
          ctaLabel="Consultar por WhatsApp"
          external
          footer={
            <>
              <DemoCtaFooterSanti /> — adaptable para tu tienda de moda en Colombia.
            </>
          }
        />
      </main>
    </DemoShell>
  );
}
