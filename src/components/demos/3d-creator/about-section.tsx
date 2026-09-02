"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatedText } from "./animated-text";
import { ContactButton } from "./contact-button";
import { FadeIn } from "./fade-in";
import { creator3dAssets, type Creator3dContent } from "@/lib/demos/3d-creator";

const DECOR = [
  {
    src: creator3dAssets.moon,
    className: "left-[4%] top-[6%] w-[90px] sm:w-[130px] md:w-[180px]",
    x: -80,
  },
  {
    src: creator3dAssets.object,
    className: "right-[4%] top-[10%] w-[100px] sm:w-[150px] md:w-[210px]",
    x: 80,
  },
  {
    src: creator3dAssets.lego,
    className: "bottom-[8%] left-[6%] w-[90px] sm:w-[130px] md:w-[170px]",
    x: -80,
  },
  {
    src: creator3dAssets.group,
    className: "bottom-[6%] right-[5%] w-[110px] sm:w-[160px] md:w-[220px]",
    x: 80,
  },
] as const;

export function AboutSection({ content }: { content: Creator3dContent }) {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center md:px-10 md:py-40"
    >
      {DECOR.map((item) => (
        <FadeIn
          key={item.src}
          x={item.x}
          y={0}
          duration={0.9}
          className={`pointer-events-none absolute ${item.className}`}
        >
          <img src={item.src} alt="" className="block w-full" loading="lazy" />
        </FadeIn>
      ))}

      <FadeIn>
        <h2
          className="font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          {content.about.title}
        </h2>
      </FadeIn>

      <AnimatedText
        text={content.about.body}
        className="mx-auto mt-10 max-w-[900px] font-light leading-snug text-[#D7E2EA] md:mt-14"
        style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.1rem)" }}
      />

      <FadeIn delay={0.2} className="mt-12 md:mt-16">
        <ContactButton content={content} />
      </FadeIn>
    </section>
  );
}
