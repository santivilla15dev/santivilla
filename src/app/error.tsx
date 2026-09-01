"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const COPY = {
  de: {
    title: "Etwas ist schiefgelaufen",
    body: "Ein unerwarteter Fehler ist aufgetreten. Versuch es erneut oder komm später wieder.",
    retry: "Erneut versuchen",
    home: "Zur Startseite",
  },
  en: {
    title: "Something went wrong",
    body: "An unexpected error occurred. Try again or come back later.",
    retry: "Try again",
    home: "Back to home",
  },
  es: {
    title: "Algo salió mal",
    body: "Ocurrió un error inesperado. Inténtalo de nuevo o vuelve más tarde.",
    retry: "Intentar de nuevo",
    home: "Volver al inicio",
  },
} as const;

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = segment === "en" || segment === "es" ? segment : "de";
  const copy = COPY[locale];

  return (
    <main className="site-shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{copy.body}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex min-h-[45px] items-center rounded-full bg-accent px-6 text-sm font-semibold text-background transition hover:bg-accent-hot focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {copy.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="inline-flex min-h-[45px] items-center rounded-full border border-line px-6 text-sm font-semibold text-ink transition hover:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {copy.home}
        </Link>
      </div>
    </main>
  );
}
