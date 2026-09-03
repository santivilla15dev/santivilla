"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";

export function DemoBanner({
  locale,
  notice,
  back,
}: {
  locale: Locale;
  notice: string;
  back: string;
}) {
  const params = useSearchParams();
  // Ocultar chrome en previews embebidas de la home.
  if (params.get("preview") === "1") return null;

  return (
    <div className="sticky top-0 z-[60] border-b border-white/10 bg-[#0a0c0b]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-[11px] sm:px-6 sm:text-xs">
        <p className="min-w-0 leading-snug text-[#e8e4dc]/80">{notice}</p>
        <Link
          href={`/${locale}#projects`}
          className="shrink-0 font-medium text-[#d4b45a] transition hover:text-[#e8c96a]"
        >
          {back}
        </Link>
      </div>
    </div>
  );
}
