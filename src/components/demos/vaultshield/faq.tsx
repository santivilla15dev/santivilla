"use client";

import { VsSection } from "./section";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function VsFaq({ content }: { content: VaultshieldContent }) {
  const { faq } = content;
  const [open, setOpen] = useState<string | null>(faq.items[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <VsSection id="help" eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} tinted>
      <div className="divide-y divide-[#192837]/10 border-y border-[#192837]/10">
        {faq.items.map((item) => {
          const isOpen = open === item.id;
          return (
            <div key={item.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${item.id}`}
                  id={`faq-btn-${item.id}`}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold sm:text-lg"
                >
                  {item.question}
                  {isOpen ? (
                    <Minus size={20} className="shrink-0 opacity-50" aria-hidden />
                  ) : (
                    <Plus size={20} className="shrink-0 opacity-50" aria-hidden />
                  )}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed opacity-70 sm:text-[15px]">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </VsSection>
  );
}
