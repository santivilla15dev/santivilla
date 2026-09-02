"use client";

import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiAssets, novaaiCopy } from "@/lib/demos/novaai";
import { useState } from "react";

export function NovaAbout() {
  const { about } = novaaiCopy;
  const [portrait, setPortrait] = useState<string>(novaaiAssets.portrait);

  return (
    <NovaSectionShell
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      lead={about.lead}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt={novaaiCopy.portraitAlt}
              className="aspect-[4/5] w-full object-cover"
              onError={() => setPortrait(novaaiAssets.portraitLocal)}
            />
            <p className="border-t border-white/15 px-5 py-4 text-sm text-white/70">
              {about.studio}
            </p>
          </div>
        </Reveal>

        <ul className="divide-y divide-white/15 border-y border-white/15">
          {about.people.map((person, i) => (
            <Reveal key={person.name} delay={160 + i * 100}>
              <li className="py-7">
                <h3 className="text-xl font-medium text-white">{person.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{person.bio}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </NovaSectionShell>
  );
}
