import type { Metadata } from "next";
import { CtaButtons } from "@/components/cta-buttons";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "WhatsApp, email o agenda 15 minutos con Santi Villa.",
};

export default function ContactoPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Consulta web — santivilla.com")}&body=${encodeURIComponent("Hola Santi,\n\nMe gustaría hablar de una web para...\n")}`;

  return (
    <div className="site-shell py-16 sm:py-20">
      <h1 className="animate-rise font-display text-5xl text-ink sm:text-6xl">
        Contacto
      </h1>
      <p className="animate-rise-delay-1 mt-4 max-w-2xl text-lg text-muted">
        Cuéntame qué negocio tienes y qué necesitas. Respondo por WhatsApp o
        agendamos 15 minutos.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-rise-delay-1 space-y-6">
          <CtaButtons
            pulse
            whatsappMessage="Hola Santi, quiero hablar de una web para mi negocio."
          />

          <div className="space-y-4 border-t border-line pt-8 text-sm">
            <p>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                Email
              </span>
              <a
                href={mailto}
                className="mt-1 inline-block text-lg text-accent underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
            <p>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                WhatsApp
              </span>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-lg text-ink"
              >
                Abrir chat
              </a>
            </p>
            <p>
              <span className="block text-xs uppercase tracking-[0.16em] text-muted">
                Agenda
              </span>
              <a
                href={site.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-lg text-ink underline-offset-4 hover:underline"
              >
                {site.calUrl.replace(/^https?:\/\//, "")}
              </a>
            </p>
            <p className="text-muted">{site.location}</p>
          </div>

          {/* Formulario sin backend: mailto */}
          <form
            action={mailto}
            className="rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow)]"
          >
            <p className="font-display text-2xl text-ink">Mensaje rápido</p>
            <p className="mt-2 text-sm text-muted">
              Al enviar se abre tu app de correo con el mensaje listo (sin
              servidor).
            </p>
            <label className="mt-5 block text-sm">
              <span className="text-muted">Tu nombre</span>
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                className="mt-1 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
              />
            </label>
            <label className="mt-4 block text-sm">
              <span className="text-muted">Negocio</span>
              <input
                name="business"
                type="text"
                placeholder="Restaurante / local / centro"
                className="mt-1 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
              />
            </label>
            <label className="mt-4 block text-sm">
              <span className="text-muted">¿Qué necesitas?</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Landing, menú online, rediseño móvil…"
                className="mt-1 w-full resize-y rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
              />
            </label>
            <a
              href={mailto}
              className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface transition hover:bg-accent"
            >
              Abrir email
            </a>
          </form>
        </div>

        <aside className="animate-rise-delay-2 rounded-[var(--radius)] bg-ink p-8 text-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-surface/50">
            Pitch listo
          </p>
          <p className="font-display mt-4 text-3xl leading-snug">
            “Hola, soy Santi — rediseñé cómo se vería tu sitio en el móvil.
            ¿Tenemos 15 min?”
          </p>
          <p className="mt-6 text-sm leading-relaxed text-surface/65">
            Usa ese mensaje con el link de{" "}
            <span className="text-surface">/demos/lugner</span> o tu demo
            personalizada. Transparencia: es un concepto, no el sitio oficial.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Calendario"
              src={site.calUrl}
              className="h-[420px] w-full bg-white"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
