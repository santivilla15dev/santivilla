"use client";

import { Reveal } from "./reveal";
import { novaaiAssets, novaaiCopy } from "@/lib/demos/novaai";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function NovaSectionOne() {
  const [portrait, setPortrait] = useState<string>(novaaiAssets.portrait);

  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <ul className="flex flex-col gap-2">
          {novaaiCopy.serviceLines.map((line, i) => (
            <Reveal key={line} delay={150 + i * 120}>
              <li className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {line}
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            {novaaiCopy.intro}
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150}>
            <p className="mb-5 border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
              {novaaiCopy.badge}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <h1 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              {novaaiCopy.h1[0]}
              <br />
              {novaaiCopy.h1[1]}
            </h1>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div
            id="contact"
            className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt={novaaiCopy.portraitAlt}
              className="h-24 w-20 rounded-lg object-cover"
              onError={() => setPortrait(novaaiAssets.portraitLocal)}
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <p className="text-sm font-medium text-white">{novaaiCopy.talkTitle}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                {novaaiCopy.talkRole}
              </p>
              <a
                href="#contact"
                className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                {novaaiCopy.talkCta}
                <ChevronRight size={14} aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
