"use client";

import { Reveal } from "./reveal";
import { novaaiCopy } from "@/lib/demos/novaai";
import { Hexagon } from "lucide-react";

export function NovaNavbar() {
  return (
    <header className="fixed inset-x-0 top-[var(--nova-banner,3.25rem)] z-50 border-b border-white/15">
      <div className="flex items-center justify-between px-5 py-3 sm:px-8 md:px-12">
        <Reveal delay={0}>
          <a href="#top" className="flex items-center gap-2 text-white">
            <Hexagon size={24} strokeWidth={1.5} aria-hidden />
            <span className="text-lg font-medium tracking-tight sm:text-xl">
              {novaaiCopy.brand}
            </span>
          </a>
        </Reveal>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10" aria-label="NovaAI">
          {novaaiCopy.nav.map((item, i) => (
            <Reveal key={item.label} delay={100 + i * 100}>
              <a
                href={item.href}
                className="text-sm text-white/85 transition-colors duration-300 hover:text-white"
              >
                {item.label}
                {"count" in item && item.count ? (
                  <sup className="font-mono text-[10px] text-white/60">{item.count}</sup>
                ) : null}
              </a>
            </Reveal>
          ))}
        </nav>

        <Reveal delay={500}>
          <a
            href="#contact"
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            {novaaiCopy.navCta}
          </a>
        </Reveal>
      </div>
    </header>
  );
}
