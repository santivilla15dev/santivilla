import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { SiteMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import { site } from "@/lib/site";

type Props = {
  locale: Locale;
  messages: SiteMessages;
};

export function SiteHeader({ locale, messages }: Props) {
  const m = messages.nav;
  const links = [
    { href: localizedPath(locale, "/trabajos"), label: m.work },
    { href: localizedPath(locale, "/servicios"), label: m.services },
    { href: localizedPath(locale, "/contacto"), label: m.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-surface/80 backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 py-4">
        <Link
          href={localizedPath(locale, "/")}
          className="font-display text-xl text-ink transition hover:text-accent sm:text-2xl"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-muted transition hover:bg-accent-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <p className="hidden text-xs text-muted sm:block">{m.localeHint}</p>
          <LocaleSwitcher locale={locale} labels={m.localeLabels} />
        </nav>
      </div>
    </header>
  );
}
