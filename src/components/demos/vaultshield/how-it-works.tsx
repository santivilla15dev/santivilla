import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { VsSection } from "./section";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";

export function VsHowItWorks({ content }: { content: VaultshieldContent }) {
  const { howItWorks } = content;

  return (
    <VsSection
      id="how"
      eyebrow={howItWorks.eyebrow}
      title={howItWorks.title}
      lead={howItWorks.lead}
      tinted
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step, i) => (
          <FadeIn key={step.number} delay={i * 0.08} as="li">
            <p className="font-[family-name:var(--font-vs-heading)] text-4xl text-[#7342E2]/40">
              {step.number}
            </p>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">{step.body}</p>
          </FadeIn>
        ))}
      </ol>
    </VsSection>
  );
}
