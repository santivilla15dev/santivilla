"use client";

import { ContactButton } from "./contact-button";
import { FadeIn } from "./fade-in";
import { HeroPortrait, type PortraitVideo } from "./hero-portrait";
import { Magnet } from "./magnet";
import { PortraitMotion } from "./portrait-motion";
import { creator3dAssets, type Creator3dContent } from "@/lib/demos/3d-creator";
import { locales, type Locale } from "@/lib/i18n/locales";
import { whatsappHref } from "@/lib/site";

// El heading llena el ancho: a más caracteres, menos vw (tope 17.5vw como la spec).
function headingSize(text: string): string {
  const vw = Math.min(17.5, 178 / text.length);
  return `${vw.toFixed(2)}vw`;
}

export function HeroSection({
  content,
  langHrefs,
  portraitSrc = creator3dAssets.portrait,
  portraitVideo,
}: {
  content: Creator3dContent;
  /** Destino de cada idioma en el switcher (ruta por locale o ?lang=). */
  langHrefs: Record<Locale, string>;
  portraitSrc?: string;
  /** Bucle de vídeo del retrato; si falta, se muestra la imagen estática. */
  portraitVideo?: PortraitVideo;
}) {
  const navItems = [
    { label: content.nav.about, href: "#about" },
    { label: content.nav.services, href: "#services" },
    { label: content.nav.projects, href: "#projects" },
  ];

  return (
    <section className="relative flex h-svh flex-col [overflow-x:clip]">
      <FadeIn as="nav" delay={0} y={-20} className="px-6 pt-5 md:px-10 md:pt-6">
        <div
          className="flex justify-end gap-3 text-[11px] font-medium uppercase tracking-widest text-[#D7E2EA]/60"
          aria-label={content.langLabel}
        >
          {locales.map((code) => (
            <a
              key={code}
              href={langHrefs[code]}
              aria-current={code === content.locale ? "true" : undefined}
              className={`transition-colors hover:text-[#D7E2EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] ${
                code === content.locale
                  ? "text-[#D7E2EA] underline decoration-[#B600A8] decoration-2 underline-offset-4"
                  : ""
              }`}
            >
              {code}
            </a>
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-sm sm:tracking-wider md:text-lg lg:text-[1.4rem]">
          {navItems.map((item) => (
            <li key={item.href} className="whitespace-nowrap">
              <a
                href={item.href}
                className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="whitespace-nowrap">
            <a
              href={whatsappHref(content.contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
            >
              {content.nav.contact}
            </a>
          </li>
        </ul>
      </FadeIn>

      <div className="overflow-hidden">
        {/* y < altura mínima del h1 (38 px a 320 px): si el desplazamiento inicial
            lo saca por completo de la caja recortada, whileInView nunca dispara. */}
        <FadeIn delay={0.15} y={20}>
          <h1
            className="hero-heading mt-6 w-full font-black uppercase leading-none tracking-tight whitespace-nowrap sm:mt-4 md:-mt-3"
            style={{ fontSize: headingSize(content.hero.heading) }}
          >
            {content.hero.heading}
          </h1>
        </FadeIn>
      </div>

      <div className="mt-auto flex flex-col items-start gap-4 px-6 pb-7 sm:flex-row sm:items-end sm:justify-between sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[260px] sm:max-w-[240px] md:max-w-[300px]">
          <p
            className="font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
            style={{ fontSize: "clamp(0.72rem, 1.3vw, 1.4rem)" }}
          >
            {content.hero.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton content={content} />
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        // Tamaño ligado a ancho Y alto: en móvil vertical centrado y limitado por
        // la altura (no tapa el titular); en el resto anclado abajo, sin pasar del
        // 52 % de la altura para no cubrir el titular en pantallas apaisadas.
        className="absolute left-1/2 top-[48%] z-10 w-[min(72vw,40svh)] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[min(60vw,56svh,560px)] sm:translate-y-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <PortraitMotion delay={0.6}>
            <HeroPortrait src={portraitSrc} video={portraitVideo} alt="Santi Villa" />
          </PortraitMotion>
        </Magnet>
      </FadeIn>
    </section>
  );
}
