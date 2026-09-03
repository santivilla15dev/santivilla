import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";
import { Star } from "lucide-react";

export function VsTrustBar({ content }: { content: VaultshieldContent }) {
  const { trust, conceptNote } = content;

  return (
    <section className="border-y border-[#192837]/8 bg-white px-5 py-8 sm:px-8">
      <FadeIn className="mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 text-[#7342E2]" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="text-sm">
            <strong className="font-semibold">{trust.rating}</strong>{" "}
            <span className="opacity-60">{trust.ratingLabel}</span>
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10">
          {trust.metrics.map((m) => (
            <li key={m.label}>
              <p className="font-[family-name:var(--font-vs-heading)] text-xl leading-none sm:text-2xl">
                {m.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug opacity-60">{m.label}</p>
            </li>
          ))}
        </ul>
      </FadeIn>
      <p className="mx-auto mt-6 max-w-[1280px] text-xs opacity-50">{conceptNote}</p>
    </section>
  );
}
