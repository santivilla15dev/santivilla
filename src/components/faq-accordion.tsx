"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-10 border-y border-line"
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="border-line">
          <AccordionTrigger className="py-5 font-display text-xl font-normal text-ink hover:text-accent hover:no-underline sm:text-2xl">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-base leading-relaxed text-muted">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
