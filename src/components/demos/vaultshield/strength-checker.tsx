"use client";

import { CHECKER_TIPS, scorePassword } from "./strength";
import { VsSection } from "./section";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";
import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";

const BAR = ["#c45c5c", "#d4a04a", "#6a8f4e", "#7342E2"];

export function VsStrengthChecker({ content }: { content: VaultshieldContent }) {
  const { checker, locale } = content;
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const result = useMemo(
    () => scorePassword(value, [...CHECKER_TIPS[locale]]),
    [value, locale],
  );

  return (
    <VsSection id="checker" eyebrow={checker.eyebrow} title={checker.title} lead={checker.lead}>
      <div className="mx-auto max-w-xl rounded-[28px] border border-[#192837]/10 bg-[#F2F2EE] p-5 sm:p-7">
        <label className="sr-only" htmlFor="vs-password-check">
          {checker.placeholder}
        </label>
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 ring-1 ring-[#192837]/10">
          <input
            id="vs-password-check"
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={checker.placeholder}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:opacity-40"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#192837]/60 hover:bg-[#192837]/5"
            aria-pressed={visible}
            aria-label={visible ? checker.hide : checker.show}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="mt-3 text-xs opacity-55">{checker.privacy}</p>

        {!value ? (
          <p className="mt-6 text-sm opacity-60">{checker.empty}</p>
        ) : (
          <div className="mt-6 space-y-4">
            <div
              className="h-2 overflow-hidden rounded-full bg-white"
              role="meter"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={result.level}
              aria-label={checker.levels[result.level]}
            >
              <div
                className="h-full rounded-full transition-[width] duration-300"
                style={{
                  width: `${((result.level + 1) / 4) * 100}%`,
                  background: BAR[result.level],
                }}
              />
            </div>
            <p className="text-sm font-semibold" style={{ color: BAR[result.level] }}>
              {checker.levels[result.level]}
            </p>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="opacity-50">{checker.entropy}</dt>
                <dd className="mt-0.5 font-semibold">{result.bits} bits</dd>
              </div>
              <div>
                <dt className="opacity-50">{checker.crackTime}</dt>
                <dd className="mt-0.5 font-semibold">{result.crack}</dd>
              </div>
            </dl>
            {result.tips.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-50">
                  {checker.tipsTitle}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm opacity-75">
                  {result.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </VsSection>
  );
}
