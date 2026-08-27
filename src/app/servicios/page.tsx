import type { Metadata } from "next";
import { CtaButtons } from "@/components/cta-buttons";
import { packages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Landing, sitio completo para negocios y mantenimiento mensual.",
};

export default function ServiciosPage() {
  return (
    <div className="site-shell py-16 sm:py-20">
      <h1 className="animate-rise font-display text-5xl text-ink sm:text-6xl">
        Servicios
      </h1>
      <p className="animate-rise-delay-1 mt-4 max-w-2xl text-lg text-muted">
        Tres paquetes simples. Tú eliges el alcance; yo me encargo de que se
        vea bien en el móvil y que tus clientes te encuentren fácil.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <article
            key={pkg.id}
            className={`animate-rise flex flex-col rounded-[var(--radius)] border border-line bg-surface p-7 shadow-[var(--shadow)] ${index === 1 ? "lg:-translate-y-2 lg:border-accent" : ""}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Paquete 0{index + 1}
            </p>
            <h2 className="font-display mt-3 text-3xl text-ink">{pkg.name}</h2>
            <p className="mt-2 text-2xl font-medium text-accent">{pkg.price}</p>
            <p className="mt-4 text-muted">{pkg.description}</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-ink/80">
              {pkg.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl text-ink">También ofrezco</h2>
        <ul className="mt-5 space-y-3 text-muted">
          <li>
            <strong className="text-ink">Centro comercial / multi-tienda</strong>{" "}
            — desde ~€3.000–8.000+ según shops, idiomas y CMS.
          </li>
          <li>
            <strong className="text-ink">Demo de pitch</strong> — te preparo una
            vista previa conceptual (como Lugner) para enseñar al dueño.
          </li>
          <li>
            <strong className="text-ink">Dominio + hosting</strong> — setup en
            Vercel incluido en los paquetes de sitio.
          </li>
        </ul>
        <div className="mt-10">
          <CtaButtons whatsappMessage="Hola Santi, quiero cotizar un paquete de web." />
        </div>
      </section>
    </div>
  );
}
