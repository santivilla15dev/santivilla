import type { Metadata } from "next";
import Image from "next/image";
import { DemoCtaBand, DemoCtaFooterSanti } from "@/components/demos/demo-cta-band";
import { DemoHero } from "@/components/demos/demo-hero";
import { DemoNav } from "@/components/demos/demo-nav";
import { DemoShell } from "@/components/demos/demo-shell";
import { DemoSizeCheck } from "@/components/demos/demo-size-check";
import { DemoStoreLocator } from "@/components/demos/demo-store-locator";
import { getDemoTheme } from "@/lib/demos/themes";
import {
  universoDelCalzadoDemo,
  universoMapsEmbedUrl,
  universoWhatsAppHref,
} from "@/lib/demos/universo-del-calzado";

export const metadata: Metadata = {
  title: "Universo del Calzado — Demo",
  description:
    "Demo tienda deportiva Santa Rosa de Osos: zapatos, camisetas de club, dos sedes y WhatsApp.",
  robots: { index: false, follow: false },
};

export default function UniversoDelCalzadoDemoPage() {
  const d = universoDelCalzadoDemo;
  const theme = getDemoTheme("universo-del-calzado");
  const wa = universoWhatsAppHref();
  const mainStore = d.stores[0];
  const storeLocations = d.stores.map((store) => ({
    name: store.name,
    address: store.address,
    city: store.city,
    hours: store.hours,
    mapsEmbedUrl: universoMapsEmbedUrl(store.mapsQuery),
  }));

  return (
    <DemoShell themeId="universo-del-calzado">
      <DemoHero
        imageSrc={d.heroImage}
        imageAlt="Futbolistas en cancha — Universo del Calzado"
        eyebrow={`${d.city} · ${d.region}`}
        title={d.name}
        lead={d.tagline}
        ctas={[
          { href: wa, label: "Preguntar por WhatsApp", external: true },
          { href: "#tiendas", label: "Ver tiendas", variant: "ghost" },
        ]}
      />

      <DemoNav items={theme.nav} />

      <DemoSizeCheck
        whatsappHrefBase={wa}
        categories={d.categories.map((c) => c.title)}
      />

      <main>
        {/* Lista asimétrica con thumbs */}
        <section
          id="categorias"
          className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-24"
        >
          <p className="demo-eyebrow">Catálogo</p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
            Categorías
          </h2>
          <ul className="mt-12 space-y-6">
            {d.categories.map((cat) => (
              <li
                key={cat.title}
                className="grid gap-5 border-b pb-8 last:border-b-0 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-center md:grid-cols-[minmax(0,16rem)_1fr]"
                style={{ borderColor: "var(--demo-border)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--demo-radius)]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 16rem"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[var(--demo-ink)] sm:text-3xl">
                    {cat.title}
                  </h3>
                  <p className="demo-text-muted mt-2 max-w-lg text-[15px] leading-relaxed">
                    {cat.description}
                  </p>
                  <p
                    className="mt-3 text-sm font-medium"
                    style={{ color: "var(--demo-accent)" }}
                  >
                    {cat.priceFrom}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <DemoStoreLocator
          stores={storeLocations}
          id="tiendas"
          title="Dos tiendas en Santa Rosa"
          layout="dual"
        />

        <section
          id="contacto"
          className="scroll-mt-20 border-t"
          style={{ borderColor: "var(--demo-border)", background: "var(--demo-panel)" }}
        >
          <div className="mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-20">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] tracking-tight text-[var(--demo-ink)]">
              Contacto
            </h2>
            <p className="demo-text-muted mt-6 max-w-lg text-[15px] leading-relaxed">
              ¿Tienen la talla 42 o la camiseta de un club? Escríbenos por WhatsApp
              — te confirmamos desde la sede más cercana.
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
          title="Pregunta por tu talla"
          lead={`${mainStore.name} — ${mainStore.address}, ${mainStore.city}`}
          ctaHref={wa}
          ctaLabel="WhatsApp: talla o camiseta"
          external
          footer={
            <>
              <DemoCtaFooterSanti /> — adaptable para tu tienda deportiva en Colombia.
            </>
          }
        />
      </main>
    </DemoShell>
  );
}
