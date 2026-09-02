"use client";

import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiCopy } from "@/lib/demos/novaai";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function NovaFaq() {
  const { faq } = novaaiCopy;
  const [open, setOpen] = useState<string | null>(faq.items[0]?.id ?? null);

  return (
    <NovaSectionShell
      id="faq"
      eyebrow={faq.eyebrow}
      title={faq.title}
      lead={faq.lead}
    >
      <div className="divide-y divide-white/15 border-y border-white/15">
        {faq.items.map((item, i) => {
          const isOpen = open === item.id;
          return (
            <Reveal key={item.id} delay={80 + i * 60}>
              <div>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`nova-faq-${item.id}`}
                    id={`nova-faq-btn-${item.id}`}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-white sm:text-lg"
                  >
                    {item.question}
                    {isOpen ? (
                      <Minus size={18} className="shrink-0 text-white/45" aria-hidden />
                    ) : (
                      <Plus size={18} className="shrink-0 text-white/45" aria-hidden />
                    )}
                  </button>
                </h3>
                <div
                  id={`nova-faq-${item.id}`}
                  role="region"
                  aria-labelledby={`nova-faq-btn-${item.id}`}
                  hidden={!isOpen}
                  className={isOpen ? "pb-5" : undefined}
                >
                  {isOpen ? (
                    <p className="max-w-3xl text-sm leading-relaxed text-white/65 sm:text-[15px]">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </NovaSectionShell>
  );
}
