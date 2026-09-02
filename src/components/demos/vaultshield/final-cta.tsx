import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { vaultshieldTheme, type VaultshieldContent } from "@/lib/demos/vaultshield";
import { ArrowRightCircle } from "lucide-react";

export function VsFinalCta({ content }: { content: VaultshieldContent }) {
  const { finalCta } = content;

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28" style={{ background: vaultshieldTheme.accent }}>
      <FadeIn className="mx-auto max-w-[1280px] text-white">
        <h2
          className="max-w-[16ch] font-[family-name:var(--font-vs-heading)] leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
        >
          {finalCta.title}
        </h2>
        <p className="mt-4 max-w-[50ch] text-[15px] leading-relaxed text-white/80">
          {finalCta.lead}
        </p>
        <a
          href="#plans"
          className="mt-8 inline-flex items-center justify-between gap-8 rounded-full bg-white px-6 py-4 text-sm font-semibold"
          style={{ color: vaultshieldTheme.accent }}
        >
          <span>{finalCta.button}</span>
          <ArrowRightCircle size={20} aria-hidden />
        </a>
      </FadeIn>
    </section>
  );
}
