import { existsSync } from "node:fs";
import { join } from "node:path";
import { AboutSection } from "./about-section";
import { FaqContactSection } from "./faq-contact-section";
import { kanit } from "./font";
import { HeroSection } from "./hero-section";
import { MarqueeSection } from "./marquee-section";
import { ProjectsSection } from "./projects-section";
import { ServicesSection } from "./services-section";
import { getCreator3dContent } from "@/lib/demos/3d-creator";
import { getMessages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/locales";

// Retrato propio: si existe public/demos/3d-creator/portrait.webp
// (recorte con fondo transparente) sustituye al render 3D de la spec.
const LOCAL_PORTRAIT = "/demos/3d-creator/portrait.webp";

export function Creator3dLanding({
  locale,
  langHrefs,
}: {
  locale: Locale;
  langHrefs: Record<Locale, string>;
}) {
  const content = getCreator3dContent(locale);
  const { home, cta } = getMessages(locale);
  const hasLocalPortrait = existsSync(
    join(process.cwd(), "public", LOCAL_PORTRAIT),
  );

  return (
    <div
      className={`demo-3d ${kanit.variable} min-h-screen bg-[#0C0C0C] text-[#D7E2EA] [overflow-x:clip]`}
    >
      <HeroSection
        content={content}
        langHrefs={langHrefs}
        portraitSrc={hasLocalPortrait ? LOCAL_PORTRAIT : undefined}
      />
      <MarqueeSection />
      <AboutSection content={content} />
      <ServicesSection content={content} />
      <ProjectsSection content={content} />
      <FaqContactSection
        copy={{
          faqEyebrow: home.faqEyebrow,
          faqTitle: home.faqTitle,
          faqItems: home.faqItems,
          ctaEyebrow: home.finalCtaEyebrow,
          ctaTitle: home.finalCtaTitle,
          whatsappLabel: cta.whatsapp,
          scheduleLabel: cta.schedule,
          whatsappMessage: content.contact.whatsapp,
        }}
      />
    </div>
  );
}
