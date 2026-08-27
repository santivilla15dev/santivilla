import Link from "next/link";
import { site, whatsappHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line/70 bg-ink text-surface">
      <div className="site-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-surface/70">
            {site.tagline.es}. {site.tagline.de}.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-[0.14em] text-surface/50">
            Navegación
          </p>
          <ul className="space-y-2 text-surface/80">
            <li>
              <Link href="/trabajos" className="hover:text-surface">
                Trabajos
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-surface">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-surface">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-[0.14em] text-surface/50">
            Impressum
          </p>
          <ul className="space-y-2 text-surface/80">
            <li>{site.name}</li>
            <li>{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-surface">
                {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} className="hover:text-surface">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="site-shell py-4 text-xs text-surface/45">
          © {new Date().getFullYear()} {site.name}. Demos conceptuales no son
          sitios oficiales de los negocios mostrados.
        </p>
      </div>
    </footer>
  );
}
