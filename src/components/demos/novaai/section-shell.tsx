import { Reveal } from "./reveal";
import type { ReactNode } from "react";

export function NovaSectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="bg-[#0a0a0a] px-5 py-20 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal delay={80}>
          <p className="border-l-2 border-white bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/90 backdrop-blur-md inline-block">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <h2 className="mt-6 max-w-3xl text-3xl font-normal leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {lead}
          </p>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
