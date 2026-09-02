"use client";

import { VsSection } from "./section";
import { vaultshieldTheme, type VaultshieldContent } from "@/lib/demos/vaultshield";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

export function VsPlans({ content }: { content: VaultshieldContent }) {
  const { plans } = content;
  const [yearly, setYearly] = useState(true);
  const reduce = useReducedMotion();

  return (
    <VsSection id="plans" eyebrow={plans.eyebrow} title={plans.title} lead={plans.lead}>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div
          className="inline-flex rounded-full bg-[#F2F2EE] p-1"
          role="group"
          aria-label={`${plans.monthly} / ${plans.yearly}`}
        >
          <button
            type="button"
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              !yearly ? "bg-white shadow-sm" : "opacity-60"
            }`}
          >
            {plans.monthly}
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              yearly ? "bg-white shadow-sm" : "opacity-60"
            }`}
          >
            {plans.yearly}
          </button>
        </div>
        <span className="text-xs font-medium text-[#7342E2]">{plans.yearlyHint}</span>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.items.map((plan) => (
          <li
            key={plan.id}
            className={`relative flex flex-col rounded-[24px] border p-6 ${
              plan.popular
                ? "border-[#7342E2] bg-white shadow-[0_12px_40px_rgba(115,66,226,0.12)]"
                : "border-[#192837]/10 bg-[#F2F2EE]/40"
            }`}
          >
            {plan.popular ? (
              <span
                className="absolute -top-3 left-5 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                style={{ background: vaultshieldTheme.accent }}
              >
                {plans.popular}
              </span>
            ) : null}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-3 flex items-end gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={yearly ? plan.yearly : plan.monthly}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-[family-name:var(--font-vs-heading)] text-3xl leading-none"
                >
                  {yearly ? plan.yearly : plan.monthly}
                </motion.span>
              </AnimatePresence>
              <span className="mb-0.5 text-xs opacity-55">
                {yearly ? plan.periodYearly : plan.periodMonthly}
              </span>
            </p>
            <ul className="mt-5 flex-1 space-y-2">
              {plan.includes.map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-snug opacity-80">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#7342E2]" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <a
              href="#plans"
              className="mt-6 rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white"
              style={{ background: vaultshieldTheme.accent }}
            >
              {plans.cta}
            </a>
          </li>
        ))}
      </ul>
    </VsSection>
  );
}
