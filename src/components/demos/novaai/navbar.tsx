"use client";

import { Reveal } from "./reveal";
import { novaaiCopy } from "@/lib/demos/novaai";
import { Hexagon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

function NavLink({
  item,
  onClick,
  className = "",
}: {
  item: (typeof novaaiCopy.nav)[number];
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={`text-white/85 transition-colors duration-300 hover:text-white ${className}`}
    >
      {item.label}
      {"count" in item && item.count ? (
        <sup className="font-mono text-[10px] text-white/60">{item.count}</sup>
      ) : null}
    </a>
  );
}

export function NovaNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

        <nav
          className="hidden items-center gap-8 md:flex lg:gap-10"
          aria-label="NovaAI"
        >
          {novaaiCopy.nav.map((item, i) => (
            <Reveal key={item.label} delay={100 + i * 100}>
              <NavLink item={item} className="text-sm" />
            </Reveal>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Reveal delay={500} className="hidden md:block">
            <a
              href="#contact"
              className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
            >
              {novaaiCopy.navCta}
            </a>
          </Reveal>

          <Reveal delay={400} className="md:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={novaaiCopy.menuOpen}
              aria-expanded={open}
              aria-controls="nova-mobile-menu"
              className="-mr-1 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </Reveal>
        </div>
      </div>

      {/* Sheet móvil: mismo lenguaje de cristal que el resto de la demo */}
      <div
        className={`fixed inset-0 z-[70] md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label={novaaiCopy.menuClose}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-[4px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          id="nova-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={novaaiCopy.brand}
          className={`absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,340px)] flex-col border-l border-white/15 bg-white/15 text-white shadow-[-12px_0_48px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
            <span className="flex items-center gap-2">
              <Hexagon size={22} strokeWidth={1.5} aria-hidden />
              <span className="text-lg font-medium tracking-tight">
                {novaaiCopy.brand}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={novaaiCopy.menuClose}
              className="-mr-1 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-5 py-6" aria-label="NovaAI">
            {novaaiCopy.nav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                className="py-3 text-2xl font-medium tracking-tight"
              />
            ))}
          </nav>

          <div className="border-t border-white/15 px-5 py-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
            >
              {novaaiCopy.navCta}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
