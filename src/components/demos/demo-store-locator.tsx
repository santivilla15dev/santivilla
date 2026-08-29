"use client";

import { useState } from "react";

export type StoreLocation = {
  name: string;
  address: string;
  city: string;
  hours: string;
  mapsEmbedUrl: string;
};

type Props = {
  stores: StoreLocation[];
  id?: string;
  title?: string;
  /** tabs = one map at a time; dual = all stores side-by-side on desktop */
  layout?: "tabs" | "dual";
};

export function DemoStoreLocator({
  stores,
  id = "tiendas",
  title = "Nuestras tiendas",
  layout = "tabs",
}: Props) {
  const [active, setActive] = useState(0);
  const store = stores[active] ?? stores[0];

  if (!store) return null;

  if (layout === "dual") {
    return (
      <section
        id={id}
        className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 py-20 sm:px-8 md:py-28"
      >
        <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
          {title}
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {stores.map((s) => (
            <li key={s.name} className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-xl text-[var(--demo-ink)]">{s.name}</h3>
                <p className="demo-text-muted mt-2 text-[15px] leading-relaxed">
                  {s.address}
                  <br />
                  {s.city}
                </p>
                <p
                  className="mt-3 text-sm"
                  style={{ color: "var(--demo-accent)" }}
                >
                  {s.hours}
                </p>
              </div>
              <div className="demo-map min-h-[12rem]">
                <iframe
                  title={`Mapa ${s.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={s.mapsEmbedUrl}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      id={id}
      className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 py-20 sm:px-8 md:py-28"
    >
      <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
        {title}
      </h2>
      <div className="mt-10 flex flex-wrap gap-2">
        {stores.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setActive(i)}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider transition"
            style={{
              borderRadius: "var(--demo-btn-radius)",
              background:
                i === active
                  ? "var(--demo-cta-bg)"
                  : "color-mix(in srgb, var(--demo-ink) 8%, transparent)",
              color: i === active ? "var(--demo-cta-ink)" : "var(--demo-ink)",
              border: `1px solid var(--demo-border)`,
            }}
          >
            {s.name.includes("—")
              ? s.name.split("—").pop()?.trim()
              : s.city}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="demo-panel p-6">
          <h3 className="font-display text-xl text-[var(--demo-ink)]">{store.name}</h3>
          <p className="demo-text-muted mt-3 text-[15px] leading-relaxed">
            {store.address}
            <br />
            {store.city}
          </p>
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--demo-accent-secondary)" }}
          >
            {store.hours}
          </p>
        </div>
        <div className="demo-map min-h-[14rem] md:min-h-[16rem]">
          <iframe
            title={`Mapa ${store.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={store.mapsEmbedUrl}
          />
        </div>
      </div>
    </section>
  );
}
