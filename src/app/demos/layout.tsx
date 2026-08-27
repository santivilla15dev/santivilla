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
    <div className="bg-background">
      <div className="border-b border-line/80 bg-surface/90">
        <div className="site-shell flex flex-wrap items-center justify-between gap-2 py-2 text-xs text-muted">
          <span>Demo conceptual · parte del portafolio de Santi Villa</span>
          <Link href="/trabajos" className="text-accent hover:underline">
            ← Volver a trabajos
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
