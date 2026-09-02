import { novaaiCopy } from "@/lib/demos/novaai";
import { Hexagon } from "lucide-react";

export function NovaFooter() {
  const { footer } = novaaiCopy;

  return (
    <footer className="border-t border-white/15 bg-[#0a0a0a] px-5 py-16 sm:px-8 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-2 text-white">
            <Hexagon size={22} strokeWidth={1.5} aria-hidden />
            <span className="text-lg font-medium tracking-tight">{novaaiCopy.brand}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            {footer.tagline}
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/40">
            {footer.conceptNote}
          </p>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
              {col.title}
            </p>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
