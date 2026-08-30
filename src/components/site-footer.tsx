import Link from "next/link";
import type { SiteMessages } from "@/lib/i18n/get-messages";
import { legalPath, localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import { site, whatsappHref } from "@/lib/site";

type Props = {
  locale: Locale;
  messages: SiteMessages;
};

export function SiteFooter({ locale, messages }: Props) {
  const f = messages.footer;
  const n = messages.nav;

  return (
    <footer className="mt-auto border-t border-line/70 bg-ink text-surface">
      <div className="site-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-surface/70">
            {f.tagline}
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-[0.14em] text-surface/50">
            {f.navLabel}
          </p>
          <ul className="space-y-2 text-surface/80">
            <li>
              <Link href={localizedPath(locale, "/trabajos")} className="hover:text-surface">
                {n.work}
              </Link>
            </li>
            <li>
              <Link href={localizedPath(locale, "/servicios")} className="hover:text-surface">
                {n.services}
              </Link>
            </li>
            <li>
              <Link href={localizedPath(locale, "/contacto")} className="hover:text-surface">
                {n.contact}
              </Link>
            </li>
            <li>
              <Link
                href={`${localizedPath(locale, "/")}#about`}
                className="hover:text-surface"
              >
                {f.about}
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-[0.14em] text-surface/50">
            {f.legalLabel}
          </p>
          <ul className="space-y-2 text-surface/80">
            <li>
              <Link href={legalPath(locale, "impressum")} className="hover:text-surface">
                {f.impressum}
              </Link>
            </li>
            <li>
              <Link href={legalPath(locale, "datenschutz")} className="hover:text-surface">
                {f.datenschutz}
              </Link>
            </li>
            <li>
              <Link href={legalPath(locale, "agb")} className="hover:text-surface">
                {f.agb}
              </Link>
            </li>
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
          © {new Date().getFullYear()} {site.name}. {f.copyright}
        </p>
      </div>
    </footer>
  );
}
