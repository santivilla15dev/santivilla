import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demos",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="demo-immersive flex min-h-screen flex-col">
      {/* Una sola franja: legal + escape al portfolio */}
      <div className="sticky top-0 z-[60] border-b border-white/10 bg-[#0a0c0b]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-[11px] sm:px-6 sm:text-xs">
          <p className="min-w-0 leading-snug text-[#e8e4dc]/80">
            Demo / Konzept · Portfolio Santi Villa — keine offizielle Seite
          </p>
          <Link
            href="/trabajos"
            className="shrink-0 font-medium text-[#d4b45a] transition hover:text-[#e8c96a]"
          >
            ← Trabajos
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
