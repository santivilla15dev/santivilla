"use client";

import { AnimatedText } from "./animated-text";
import { ContactButton } from "./contact-button";
import { FadeIn } from "./fade-in";
import type { Creator3dContent } from "@/lib/demos/3d-creator";

export function AboutSection({ content }: { content: Creator3dContent }) {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center md:px-10 md:py-40"
    >
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
