import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Demos",
};

export default async function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = fromCookie && isLocale(fromCookie) ? fromCookie : defaultLocale;

  return (
    <div className="demo-immersive flex min-h-screen flex-col">
      {/* Una sola franja: legal + vuelta a PROYECTOS en la home */}
      <div className="sticky top-0 z-[60] border-b border-white/10 bg-[#0a0c0b]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-[11px] sm:px-6 sm:text-xs">
          <p className="min-w-0 leading-snug text-[#e8e4dc]/80">
            Demo / Konzept · Portfolio Santi Villa — keine offizielle Seite
          </p>
          <Link
            href={`/${locale}#projects`}
            className="shrink-0 font-medium text-[#d4b45a] transition hover:text-[#e8c96a]"
          >
            ← Proyectos
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
