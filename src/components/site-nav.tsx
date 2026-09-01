"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { SiteMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";

type Props = {
  locale: Locale;
  messages: SiteMessages;
};

export function SiteNav({ locale, messages }: Props) {
  const m = messages.nav;
  const links = [
    { href: localizedPath(locale, "/trabajos"), label: m.work },
    { href: localizedPath(locale, "/servicios"), label: m.services },
    { href: localizedPath(locale, "/contacto"), label: m.contact },
  ] as const;

  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Cierra el panel al navegar — ajuste durante el render en lugar de
  // setState en useEffect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Cierra con Escape
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass =
    "rounded-full px-3 py-1.5 text-muted transition hover:bg-accent-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

  return (
    <nav className="flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
      {/* md+: navegación horizontal (igual que antes) */}
      <div className="hidden items-center gap-1 sm:gap-2 md:flex">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </Link>
        ))}
        <p className="hidden text-xs text-muted sm:block">{m.localeHint}</p>
      </div>

      {/* Locale switcher siempre visible */}
      <LocaleSwitcher locale={locale} labels={m.localeLabels} />

      {/* Móvil: botón hamburger */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? m.menuClose : m.menuOpen}
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-[45px] min-w-[45px] items-center justify-center rounded-full text-ink transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 md:hidden"
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {/* Móvil: panel desplegable bajo el header */}
      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-line/60 bg-surface shadow-lg md:hidden"
        >
          <div className="site-shell flex flex-col gap-1 py-3 text-base">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-ink transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
