import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { projects, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero: marca + una frase + CTAs — una sola composición */}
      <section className="grain relative overflow-hidden">
        <div className="site-shell grid min-h-[calc(100vh-4.5rem)] items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="animate-fade text-sm font-medium uppercase tracking-[0.22em] text-accent">
              {site.location}
            </p>
            <h1 className="animate-rise font-display mt-4 text-[clamp(3.4rem,10vw,6.5rem)] leading-[0.92] text-ink">
              {site.name}
            </h1>
            <p className="animate-rise-delay-1 mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {site.tagline.es}. Sitios claros, rápidos y perfectos en el móvil —
              para restaurantes, locales y centros como{" "}
              <span className="text-ink">Lugner City</span>.
            </p>
            <div className="animate-rise-delay-2 mt-8">
              <CtaButtons pulse />
            </div>
          </div>

          {/* Ancla visual: “pantalla móvil” estilizada, no card genérica */}
          <div className="animate-rise-delay-1 relative mx-auto w-full max-w-sm">
            <div
              className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink text-surface shadow-[var(--shadow)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs uppercase tracking-[0.16em] text-surface/50">
                <span>Demo mobile</span>
                <span>Live</span>
              </div>
              <div className="space-y-5 p-6">
                <p className="font-display text-3xl leading-tight">
                  Tu negocio,
                  <br />
                  legible en 3 segundos.
                </p>
                <p className="text-sm leading-relaxed text-surface/65">
                  Horarios, menú, mapa y WhatsApp — sin pelearse con zoom en el
                  móvil.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/demos/lugner"
                    className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink"
                  >
                    Ver Lugner
                  </Link>
                  <Link
                    href="/demos/restaurant"
                    className="rounded-full border border-white/20 px-4 py-2 text-sm text-surface"
                  >
                    Ver Gastro
                  </Link>
                </div>
              </div>
              <div className="h-40 bg-[linear-gradient(135deg,#0b5f63_0%,#1a3344_45%,#c45c26_100%)] opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 py-20">
        <div className="site-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                Trabajos recientes
              </h2>
              <p className="mt-3 max-w-lg text-muted">
                Demos en vivo que puedes abrir ahora mismo y mandar por
                WhatsApp.
              </p>
            </div>
            <Link
              href="/trabajos"
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={project.href}
                  className="group block border-t border-ink/15 pt-6 transition hover:border-accent"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {project.type}
                  </p>
                  <h3 className="font-display mt-2 text-2xl text-ink transition group-hover:text-accent sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted">{project.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/60 py-20">
        <div className="site-shell max-w-3xl">
          <h2 className="font-display text-4xl text-ink">Cómo trabajo</h2>
          <ol className="mt-8 space-y-6">
            {[
              "Me cuentas qué necesita tu negocio (o te mando una demo).",
              "Diseño y construyo el sitio mobile-first en días, no meses.",
              "Lanzamos con dominio, hosting y WhatsApp listo para clientes.",
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-2xl text-accent">
                  0{i + 1}
                </span>
                <p className="pt-1 text-lg text-muted">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <CtaButtons />
          </div>
        </div>
      </section>
    </>
  );
}
