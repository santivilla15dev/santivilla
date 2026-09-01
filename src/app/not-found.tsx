import { headers } from "next/headers";
import Link from "next/link";

import { getMessages } from "@/lib/i18n/get-messages";
import { defaultLocale, isLocale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/paths";

export default async function NotFound() {
  const h = await headers();
  const localeHeader = h.get("x-locale") ?? defaultLocale;
  const locale = isLocale(localeHeader) ? localeHeader : defaultLocale;
  const m = getMessages(locale).notFound;

  return (
    <main className="site-shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl text-accent sm:text-8xl">404</p>
      <h1 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
        {m.title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{m.body}</p>
      <Link
        href={localizedPath(locale, "/")}
        className="mt-10 inline-flex min-h-[45px] items-center rounded-full bg-accent px-6 text-sm font-semibold text-background transition hover:bg-accent-hot focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {m.cta}
      </Link>
    </main>
  );
}
