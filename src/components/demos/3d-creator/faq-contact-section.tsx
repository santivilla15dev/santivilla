"use client";

import { FadeIn } from "./fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/components/faq-accordion";
import { emailHref, hasCal, hasWhatsApp, site, whatsappHref } from "@/lib/site";

export type FaqContactCopy = {
  faqEyebrow: string;
  faqTitle: string;
  faqItems: FaqItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  whatsappLabel: string;
  scheduleLabel: string;
  whatsappMessage: string;
};

const PILL =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] sm:px-10 sm:py-3.5 sm:text-base";

export function FaqContactSection({ copy }: { copy: FaqContactCopy }) {
  return (
    <section
      id="faq"
      className="relative bg-[#0C0C0C] px-6 pb-32 pt-8 text-[#D7E2EA] md:px-10 md:pb-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#d4b45a]">
            {copy.faqEyebrow}
          </p>
          <h2
            className="mt-4 font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 96px)" }}
          >
            {copy.faqTitle}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="border-y border-white/15">
            {copy.faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-white/15"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-medium text-[#D7E2EA] hover:text-white hover:no-underline sm:text-2xl [&>svg]:text-[#D7E2EA]/60">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base font-light leading-relaxed text-[#D7E2EA]/90 sm:text-lg">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>

      <FadeIn className="mx-auto mt-28 max-w-[1400px] border-t border-white/15 pt-20 md:mt-40 md:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#d4b45a]">
          {copy.ctaEyebrow}
        </p>
        <h2
          className="mt-4 max-w-[18ch] font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 120px)" }}
        >
          {copy.ctaTitle}
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-14">
          {hasWhatsApp() ? (
            <a
              href={whatsappHref(copy.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${PILL} text-[#1a1408] hover:brightness-110`}
              style={{
                background: "#d4b45a",
                boxShadow: "0 8px 24px rgba(212, 180, 90, 0.28)",
              }}
            >
              {copy.whatsappLabel}
            </a>
          ) : (
            <a
              href={emailHref()}
              className={`${PILL} text-[#1a1408] hover:brightness-110`}
              style={{
                background: "#d4b45a",
                boxShadow: "0 8px 24px rgba(212, 180, 90, 0.28)",
              }}
            >
              {site.email}
            </a>
          )}
          {hasCal() ? (
            <a
              href={site.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${PILL} border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10`}
            >
              {copy.scheduleLabel}
            </a>
          ) : null}
          <a
            href={emailHref()}
            className="ml-2 text-sm font-light text-[#D7E2EA] underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
          >
            {site.email}
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
