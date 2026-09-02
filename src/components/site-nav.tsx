"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  // Cierra el panel al navegar — ajuste durante el render en lugar de
  // setState en useEffect. El cierre con Escape lo gestiona Radix (Sheet).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const linkClass =
    "rounded-full px-3 py-1.5 text-muted transition hover:bg-accent-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

  return (
    <nav className="flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
      {/* md+: navegación horizontal */}
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

      {/* Móvil: hamburger + Sheet superior */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={m.menuOpen}
            className="size-[45px] rounded-full text-ink hover:bg-accent-soft md:hidden"
          >
            <Menu aria-hidden className="size-[22px]" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="gap-0 border-line/60 bg-surface p-0"
        >
          <SheetTitle className="sr-only">{m.menuOpen}</SheetTitle>
          <div className="site-shell flex items-center justify-end py-2">
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={m.menuClose}
                className="size-[45px] rounded-full text-ink hover:bg-accent-soft"
              >
                <X aria-hidden className="size-[22px]" />
              </Button>
            </SheetClose>
          </div>
          <div className="site-shell flex flex-col gap-1 pb-4 text-base">
            {links.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-3 text-ink transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
