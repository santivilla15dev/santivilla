import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { VsSection } from "./section";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";

export function VsTestimonials({ content }: { content: VaultshieldContent }) {
  const { testimonials } = content;

  return (
    <VsSection
      eyebrow={testimonials.eyebrow}
      title={testimonials.title}
      lead={testimonials.lead}
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <FadeIn key={item.name} delay={i * 0.07} as="li">
            <blockquote className="flex h-full flex-col rounded-2xl border border-[#192837]/8 bg-[#F2F2EE]/50 p-6">
              <p className="text-[15px] leading-relaxed opacity-80">“{item.quote}”</p>
              <footer className="mt-6">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs opacity-55">{item.role}</p>
              </footer>
            </blockquote>
          </FadeIn>
        ))}
      </ul>
    </VsSection>
  );
}
