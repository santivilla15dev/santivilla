"use client";

import { useId, useState } from "react";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: Props) {
  const reactId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="mt-10 divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${reactId}-panel-${item.id}`;
        const buttonId = `${reactId}-btn-${item.id}`;

        return (
          <li key={item.id}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-4 rounded-sm py-5 text-left transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="font-display text-xl text-ink sm:text-2xl">
                {item.question}
              </span>
              <span
                className="mt-1 shrink-0 font-display text-2xl leading-none text-accent"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-base leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
