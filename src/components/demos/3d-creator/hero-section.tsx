"use client";

/* eslint-disable @next/next/no-img-element */

import { ContactButton } from "./contact-button";
import { FadeIn } from "./fade-in";
import { Magnet } from "./magnet";
import {
  creator3dAssets,
  creator3dCopy,
  creator3dNav,
} from "@/lib/demos/3d-creator";
import { whatsappHref } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative flex h-[calc(100svh-3.5rem)] flex-col [overflow-x:clip] sm:h-[calc(100svh-2.75rem)]">
      <FadeIn as="nav" delay={0} y={-20} className="px-6 pt-6 md:px-10 md:pt-8">
        <ul className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:text-lg lg:text-[1.4rem]">
          {creator3dNav.map((item) => (
            <li key={item.href}>
              <a
                href={
                  item.href === "#contact"
                    ? whatsappHref(creator3dCopy.contactWhatsapp)
                    : item.href
                }
                target={item.href === "#contact" ? "_blank" : undefined}
                rel={item.href === "#contact" ? "noopener noreferrer" : undefined}
                className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full text-[14vw] font-black uppercase leading-none tracking-tight whitespace-nowrap sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p
            className="font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            {creator3dCopy.heroTagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={creator3dAssets.portrait}
            alt="Retrato 3D del creador"
            className="block w-full select-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}
