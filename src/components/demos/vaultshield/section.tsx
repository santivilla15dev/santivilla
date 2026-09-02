import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import type { ReactNode } from "react";

export function VsSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  tinted = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 md:py-24"
      style={{ background: tinted ? "#F2F2EE" : "#FFFFFF" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7342E2]">
            {eyebrow}
          </p>
          <h2
            className="mt-3 max-w-[20ch] font-[family-name:var(--font-vs-heading)] leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            {title}
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed opacity-75 sm:text-base">
            {lead}
          </p>
        </FadeIn>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
