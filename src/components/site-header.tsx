import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import type { SiteMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import { site } from "@/lib/site";

type Props = {
  locale: Locale;
  messages: SiteMessages;
};

export function SiteHeader({ locale, messages }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-surface/80 backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 py-4">
        <Link
          href={localizedPath(locale, "/")}
          className="font-display rounded-sm text-xl text-ink transition hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:text-2xl"
        >
          {site.name}
        </Link>
        <SiteNav locale={locale} messages={messages} />
      </div>
    </header>
  );
}
