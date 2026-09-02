import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { VsIllustration } from "./illustration";
import { VsSection } from "./section";
import { vaultshieldAssets, type VaultshieldContent } from "@/lib/demos/vaultshield";

export function VsSecurity({ content }: { content: VaultshieldContent }) {
  const { security } = content;

  return (
    <VsSection
      id="security"
      eyebrow={security.eyebrow}
      title={security.title}
      lead={security.lead}
      tinted
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <FadeIn>
          <VsIllustration src={vaultshieldAssets.shield} alt={security.imageAlt} kind="shield" />
        </FadeIn>
        <ul className="grid gap-5 sm:grid-cols-2">
          {security.items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05} as="li">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{item.body}</p>
            </FadeIn>
          ))}
        </ul>
      </div>
    </VsSection>
  );
}
