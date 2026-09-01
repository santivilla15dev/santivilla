"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/locales";
import { switchLocalePath } from "@/lib/i18n/paths";

type Props = {
  locale: Locale;
  labels: Record<Locale, string>;
};

// Fuera del componente: el compilador de React no debe tratar las mutaciones
// de document/window como parte del scope reactivo.
function persistLocaleCookie(target: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function hardNavigate(href: string) {
  window.location.href = href;
}

export function LocaleSwitcher({ locale, labels }: Props) {
  const pathname = usePathname();

  function onSwitch(target: Locale) {
    persistLocaleCookie(target);
    hardNavigate(switchLocalePath(pathname, target));
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-line bg-surface-2 p-0.5 text-xs font-medium">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => onSwitch(loc)}
          title={labels[loc]}
          aria-label={labels[loc]}
          className={`rounded-full px-2.5 py-1 uppercase transition focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
            loc === locale
              ? "bg-ink text-surface"
              : "text-muted hover:text-ink"
          }`}
          aria-current={loc === locale ? "true" : undefined}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
