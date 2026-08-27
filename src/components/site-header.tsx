import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/trabajos", label: "Trabajos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-surface/80 backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-display text-xl text-ink transition hover:text-accent sm:text-2xl"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-muted transition hover:bg-accent-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
