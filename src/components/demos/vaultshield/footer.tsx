import { VaultshieldLogo } from "./logo";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";
import { legalPath } from "@/lib/i18n/paths";

export function VsFooter({ content }: { content: VaultshieldContent }) {
  const { footer, locale, brand, conceptNote } = content;

  return (
    <footer className="bg-[#192837] px-5 py-14 text-[#F2F2EE] sm:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <VaultshieldLogo fill="#F2F2EE" />
            <span className="text-sm font-semibold">{brand}</span>
          </div>
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-white/60">
            {footer.tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href} className="text-sm text-white/75 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>{conceptNote}</p>
        <nav className="flex flex-wrap gap-4" aria-label={footer.legalImpressum}>
          <a href={legalPath(locale, "impressum")} className="hover:text-white">
            {footer.legalImpressum}
          </a>
          <a href={legalPath(locale, "datenschutz")} className="hover:text-white">
            {footer.legalPrivacy}
          </a>
          <a href={legalPath(locale, "agb")} className="hover:text-white">
            {footer.legalTerms}
          </a>
        </nav>
      </div>
    </footer>
  );
}
