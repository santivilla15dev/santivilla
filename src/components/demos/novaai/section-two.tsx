"use client";

import { Reveal } from "./reveal";
import { novaaiCopy } from "@/lib/demos/novaai";
import { ChevronRight } from "lucide-react";

export function NovaSectionTwo() {
  return (
    <section
      id="nova-scrub-end"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={120}>
          <p className="border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
            {novaaiCopy.insightBadge}
          </p>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            {novaaiCopy.insightIntro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              {novaaiCopy.h2[0]}
              <br />
              {novaaiCopy.h2[1]}
            </h2>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              {novaaiCopy.body}
            </p>
          </Reveal>
          <Reveal delay={420} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              {novaaiCopy.demoCta}
              <ChevronRight size={14} aria-hidden />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              {novaaiCopy.consultCta}
            </a>
          </Reveal>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {novaaiCopy.capabilities.map((row, i) => (
            <Reveal key={row.index} delay={300 + i * 110}>
              <div
                className={`flex gap-5 py-5 ${
                  i < novaaiCopy.capabilities.length - 1 ? "border-b border-white/15" : ""
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                  {row.index}
                </span>
                <div>
                  <p className="group flex items-center gap-2 text-base font-medium text-white sm:text-lg">
                    {row.title}
                    <ChevronRight
                      size={16}
                      className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                      aria-hidden
                    />
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{row.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
