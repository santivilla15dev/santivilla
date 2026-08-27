import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { packages, projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trabajos",
  description:
    "Demos en vivo: rediseño conceptual de Lugner City y plantilla de restaurante.",
};

export default function TrabajosPage() {
  return (
    <div className="site-shell py-16 sm:py-20">
      <h1 className="animate-rise font-display text-5xl text-ink sm:text-6xl">
        Trabajos
      </h1>
      <p className="animate-rise-delay-1 mt-4 max-w-2xl text-lg text-muted">
        Proyectos demo listos para abrir en el móvil y compartir. Cada uno
        muestra cómo quedaría un negocio real — sin ser el sitio oficial.
      </p>

      {/* Antes / después Lugner — pieza de pitch */}
      <section className="mt-14 overflow-hidden rounded-[var(--radius)] border border-line bg-surface shadow-[var(--shadow)]">
        <div className="border-b border-line px-6 py-5 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Caso de venta · Wien
          </p>
          <h2 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
            Lugner City: antes vs después
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            El sitio actual (
            <a
              href="https://www.lugner.at"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              lugner.at
            </a>
            ) usa Typo3 antiguo: en el móvil hay que hacer zoom, los bloques
            pelean por espacio y la info clave (horarios, anfahrt, shops) no
            está a un toque. La demo nueva es mobile-first.
          </p>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-accent-hot">
              Antes
            </p>
            <div className="mt-4 min-h-52 rounded-2xl bg-[linear-gradient(180deg,#c5cdd4,#9aa7b2)] p-4 text-[11px] leading-relaxed text-ink/70">
              <div className="space-y-2 opacity-80">
                <div className="h-3 w-2/3 bg-ink/20" />
                <div className="h-24 bg-ink/10" />
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-10 bg-ink/15" />
                  <div className="h-10 bg-ink/15" />
                  <div className="h-10 bg-ink/15" />
                </div>
                <p className="pt-2">
                  Layout denso · tipografía pequeña · poco usable en 390px
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              {projects[0].beforeNote}
            </p>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-accent">
              Después (demo)
            </p>
            <div className="mt-4 min-h-52 rounded-2xl bg-ink p-5 text-surface">
              <p className="font-display text-2xl">Lugner City</p>
              <p className="mt-2 text-sm text-surface/65">
                Öffnungszeiten · Shops · Anfahrt — klar auf dem Handy.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-accent px-3 py-1">Heute offen</span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  U6 Stadthalle
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">{projects[0].afterNote}</p>
            <Link
              href="/demos/lugner"
              className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Abrir demo Lugner
            </Link>
          </div>
        </div>
      </section>

      <ul className="mt-12 grid gap-8">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="border-t border-ink/15 pt-8 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">
                  {project.type}
                </p>
                <h3 className="font-display mt-2 text-3xl text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 text-muted">{project.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={project.href}
                className="rounded-full border border-ink/15 bg-surface px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent-soft"
              >
                Ver demo
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Precios orientativos en la misma página de pitch */}
      <section className="mt-20 border-t border-line pt-14">
        <h2 className="font-display text-4xl text-ink">Precios orientativos</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Orientativos en euros (Austria / EU). El depósito (30–50%) reserva la
          fecha; la entrega del código es al pagar.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="border-t-2 border-accent pt-5"
            >
              <h3 className="font-display text-2xl text-ink">{pkg.name}</h3>
              <p className="mt-2 text-xl font-medium text-accent">{pkg.price}</p>
              <p className="mt-3 text-sm text-muted">{pkg.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Centro comercial (multi-sección + shops): desde ~€3.000 según alcance.
        </p>
        <div className="mt-8">
          <CtaButtons whatsappMessage="Hola Santi, vi tus trabajos (Lugner / restaurante) y quiero hablar de un proyecto." />
        </div>
      </section>
    </div>
  );
}
