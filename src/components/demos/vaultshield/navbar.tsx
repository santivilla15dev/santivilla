"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { VaultshieldLogo } from "./logo";
import { vaultshieldTheme, type VaultshieldContent } from "@/lib/demos/vaultshield";
import { locales, type Locale } from "@/lib/i18n/locales";

const EASE = [0.22, 1, 0.36, 1] as const;

function LangSwitcher({
  content,
  langHrefs,
  className = "",
}: {
  content: VaultshieldContent;
  langHrefs: Record<Locale, string>;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest ${className}`}
      aria-label={content.langLabel}
    >
      {locales.map((code) => (
        <a
          key={code}
          href={langHrefs[code]}
          aria-current={code === content.locale ? "true" : undefined}
          className={`rounded-full px-2 py-1 transition-opacity hover:opacity-100 ${
            code === content.locale
              ? "bg-[#192837] text-white"
              : "opacity-60"
          }`}
        >
          {code}
        </a>
      ))}
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#plans"
      className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
      style={{ background: vaultshieldTheme.accent }}
    >
      {children}
    </a>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#plans"
      className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-[filter] hover:brightness-95"
      style={{ background: vaultshieldTheme.loginBg, color: vaultshieldTheme.text }}
    >
      {children}
    </a>
  );
}

export function VaultshieldNavbar({
  content,
  langHrefs,
}: {
  content: VaultshieldContent;
  langHrefs: Record<Locale, string>;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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
    // Sin z-index: crear un contexto de apilamiento aquí dejaría la hoja
    // fixed (z-80) por debajo del hero y del banner Konzept del layout.
    <header className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
      <a href={langHrefs[content.locale]} aria-label={content.brand} className="flex items-center">
        <VaultshieldLogo />
      </a>

      <nav className="hidden items-center gap-8 lg:flex" aria-label={content.brand}>
        {content.nav.links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-3 lg:flex">
        <LangSwitcher content={content} langHrefs={langHrefs} className="mr-2" />
        <PrimaryButton>{content.nav.start}</PrimaryButton>
        <SecondaryButton>{content.nav.signIn}</SecondaryButton>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={content.nav.menuOpen}
        aria-expanded={open}
        aria-controls="vs-mobile-menu"
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
      >
        <Menu size={26} />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label={content.nav.menuClose}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70]"
              style={{
                background: "rgba(25,40,55,0.35)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.aside
              id="vs-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={content.brand}
              className="fixed right-0 top-0 z-[80] flex flex-col"
              style={{
                width: "min(88vw, 360px)",
                height: "100dvh",
                background: vaultshieldTheme.sheetBg,
                boxShadow: "-12px 0 48px rgba(25,40,55,0.18)",
                color: vaultshieldTheme.text,
              }}
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <VaultshieldLogo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={content.nav.menuClose}
                  className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <X size={26} />
                </button>
              </div>
              <div className="mx-6 h-px" style={{ background: "rgba(25,40,55,0.15)" }} />

              <nav className="flex flex-1 flex-col gap-1 px-6 py-6" aria-label={content.brand}>
                {content.nav.links.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-2xl font-semibold tracking-tight"
                    initial={reduce ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: EASE }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="flex flex-col gap-3 px-6 pb-8"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + content.nav.links.length * 0.07, duration: 0.4, ease: EASE }}
              >
                <LangSwitcher content={content} langHrefs={langHrefs} className="mb-2" />
                <a
                  href="#plans"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
                  style={{ background: vaultshieldTheme.accent }}
                >
                  {content.nav.start}
                </a>
                <a
                  href="#plans"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-5 py-3 text-center text-sm font-semibold"
                  style={{ background: vaultshieldTheme.loginBg }}
                >
                  {content.nav.signIn}
                </a>
              </motion.div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
