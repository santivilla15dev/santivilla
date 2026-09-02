import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { VsIllustration } from "./illustration";
import { VsSection } from "./section";
import { vaultshieldAssets, type VaultshieldContent } from "@/lib/demos/vaultshield";
import { Fingerprint, KeyRound, Radio, Share2, Shield, Zap } from "lucide-react";

const ICONS = [Shield, Zap, Fingerprint, Radio, Share2, KeyRound];

export function VsFeatures({ content }: { content: VaultshieldContent }) {
  const { features } = content;

  return (
    <VsSection id="vault" eyebrow={features.eyebrow} title={features.title} lead={features.lead}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.items.map((item, i) => {
            const Icon = ICONS[i] ?? Shield;
            return (
              <FadeIn key={item.title} delay={i * 0.04} as="li">
                <article className="h-full rounded-2xl border border-[#192837]/8 bg-[#F2F2EE]/60 p-5">
                  <Icon size={20} className="text-[#7342E2]" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">{item.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </ul>
        <FadeIn delay={0.1}>
          <VsIllustration src={vaultshieldAssets.vault} alt={features.imageAlt} kind="vault" />
        </FadeIn>
      </div>
    </VsSection>
  );
}
