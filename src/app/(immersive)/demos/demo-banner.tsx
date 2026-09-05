"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";

export function DemoBanner({
  locale,
  badge,
  notice,
  back,
}: {
  locale: Locale;
  badge: string;
  notice: string;
  back: string;
}) {
  const params = useSearchParams();
  // Ocultar chrome en previews embebidas de la home.
  if (params.get("preview") === "1") return null;

  return (
    <div
      className="sticky top-0 z-[60] border-b border-[rgba(212,180,90,0.18)] shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      style={{ background: "rgba(18, 14, 12, 0.88)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="shrink-0 rounded-full border border-[rgba(212,180,90,0.35)] bg-[rgba(212,180,90,0.12)] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-[#d4b45a] uppercase sm:text-[11px]">
            {badge}
          </span>
          <p className="min-w-0 truncate text-xs leading-snug tracking-wide text-[#f2ebe0]/78 sm:text-[13px]">
            {notice}
          </p>
        </div>

        <Link
          href={`/${locale}#projects`}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(212,180,90,0.4)] bg-[rgba(212,180,90,0.08)] px-3 py-1.5 text-xs font-medium tracking-wide text-[#d4b45a] transition hover:border-[#d4b45a] hover:bg-[rgba(212,180,90,0.16)] hover:text-[#e8c96a] sm:text-[13px]"
        >
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:-translate-x-0.5"
          >
            ←
          </span>
          {back}
        </Link>
      </div>
    </div>
  );
}
