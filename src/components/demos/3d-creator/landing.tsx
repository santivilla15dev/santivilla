import { AboutSection } from "./about-section";
import { FaqContactSection } from "./faq-contact-section";
import { kanit } from "./font";
import { HeroSection } from "./hero-section";
import { MarqueeSection } from "./marquee-section";
import { ProjectsSection } from "./projects-section";
import { ServicesSection } from "./services-section";
import { WienScrollSection } from "./wien-scroll-section";
import { getCreator3dContent } from "@/lib/demos/3d-creator";
import { getMessages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/locales";

export function Creator3dLanding({
  locale,
  langHrefs,
}: {
  locale: Locale;
  langHrefs: Record<Locale, string>;
}) {
  const content = getCreator3dContent(locale);
  const { home, cta } = getMessages(locale);

  return (
    <div
      className={`demo-3d ${kanit.variable} min-h-screen bg-[#0C0C0C] text-[#D7E2EA] [overflow-x:clip]`}
    >
      <HeroSection content={content} langHrefs={langHrefs} />
      <MarqueeSection />
      <AboutSection content={content} />
      <ServicesSection content={content} />
      <ProjectsSection content={content} />
      <WienScrollSection content={content} />
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
