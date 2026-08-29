"use client";

import { useMemo, useState } from "react";

type Props = {
  whatsappHrefBase: string;
  categories: string[];
  sizes?: string[];
};

const DEFAULT_SIZES = ["38", "39", "40", "41", "42", "43", "44", "45"];

export function DemoSizeCheck({
  whatsappHrefBase,
  categories,
  sizes = DEFAULT_SIZES,
}: Props) {
  const [size, setSize] = useState(sizes[4] ?? "42");
  const [category, setCategory] = useState(categories[0] ?? "Zapatos");

  const href = useMemo(() => {
    const msg = encodeURIComponent(
      `Hola Universo del Calzado, ¿tienen ${category} en talla ${size}? Gracias.`,
    );
    // Replace existing text= param if present
    if (whatsappHrefBase.includes("text=")) {
      return whatsappHrefBase.replace(/text=[^&]*/, `text=${msg}`);
    }
    const sep = whatsappHrefBase.includes("?") ? "&" : "?";
    return `${whatsappHrefBase}${sep}text=${msg}`;
  }, [whatsappHrefBase, category, size]);

  return (
    <section
      className="border-y px-5 py-10 sm:px-8"
      style={{ borderColor: "var(--demo-border)", background: "var(--demo-panel)" }}
    >
      <div className="mx-auto max-w-[var(--demo-max)]">
        <p className="demo-eyebrow">Consulta rápida</p>
        <h2 className="font-display mt-3 text-[clamp(1.5rem,3vw,2rem)] tracking-tight text-[var(--demo-ink)]">
          ¿Tienen mi talla?
        </h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="flex min-w-[8rem] flex-1 flex-col gap-1.5 text-xs uppercase tracking-wider demo-text-subtle">
            Categoría
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-[var(--demo-btn-radius)] border bg-[var(--demo-bg)] px-3 py-3 text-sm normal-case tracking-normal text-[var(--demo-ink)]"
              style={{ borderColor: "var(--demo-border-strong)" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[6rem] flex-col gap-1.5 text-xs uppercase tracking-wider demo-text-subtle">
            Talla
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="rounded-[var(--demo-btn-radius)] border bg-[var(--demo-bg)] px-3 py-3 text-sm normal-case tracking-normal text-[var(--demo-ink)]"
              style={{ borderColor: "var(--demo-border-strong)" }}
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="demo-btn-primary sm:mb-0"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
