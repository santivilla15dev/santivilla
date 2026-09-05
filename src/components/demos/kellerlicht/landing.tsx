"use client";

import {
  kellerlichtAssets,
  kellerlichtCopy,
  kellerlichtWa,
} from "@/lib/demos/kellerlicht";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, type FormEvent } from "react";
import { KellerlichtScrollHero } from "./scroll-hero";

const SECTION_X = "px-5 sm:px-8 lg:px-16";
const SECTION_Y = "py-16 sm:py-20 lg:py-28";
const H2 = "kl-display text-3xl sm:text-4xl lg:text-5xl";

/* ------------------------------------------------------------------ */
/*  Wine row                                                          */
/* ------------------------------------------------------------------ */
function Wine({
  name,
  price,
  note,
  open,
  onToggle,
}: {
  name: string;
  price: string;
  note: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`grid w-full grid-cols-[1fr_auto] gap-x-4 rounded-[0.7rem] px-2 py-2.5 text-left transition ${
        open ? "bg-[rgba(212,160,90,0.12)]" : "hover:bg-[rgba(212,160,90,0.08)]"
      }`}
    >
      <span className="font-semibold text-[#2a211c]">{name}</span>
      <span className="kl-mono text-sm text-[#7a2e3a]">
        {price}
      </span>
      <span
        className={`col-span-2 overflow-hidden text-sm text-[rgba(42,33,28,0.72)] transition-all ${
          open ? "mt-1 max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {note}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section divider                                                   */
/* ------------------------------------------------------------------ */
function SectionDivider() {
  return (
    <div className={`mx-auto max-w-[600px] ${SECTION_X}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(42,33,28,0.15)] to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky nav (appears after hero)                                   */
/* ------------------------------------------------------------------ */
function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const heroTrack = document.getElementById("kellerlicht-hero");
      if (!heroTrack) return;
      const rect = heroTrack.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex h-[4.25rem] items-center justify-between px-4 sm:px-8 lg:px-10 backdrop-blur-[14px] transition-all duration-500 ${
        visible
          ? "translate-y-0 bg-[rgba(242,232,220,0.92)] opacity-100 shadow-[0_1px_12px_rgba(42,33,28,0.08)]"
          : "-translate-y-full opacity-0"
      }`}
    >
      <a
        href="#"
        className="kl-display text-[1.35rem] font-semibold tracking-wide text-[#1c1412] no-underline"
      >
        {kellerlichtCopy.brand}
      </a>
      <ul className="hidden gap-6 text-[0.92rem] md:flex">
        {kellerlichtCopy.nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-[rgba(42,33,28,0.72)] no-underline transition-colors hover:text-[#1c1412]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#reservieren"
        className="inline-flex rounded-full bg-[#7a2e3a] px-4 py-2 text-[0.88rem] font-semibold text-[#f2e8dc] shadow-[0_8px_24px_rgba(122,46,58,0.28)] no-underline transition hover:-translate-y-px"
      >
        {kellerlichtCopy.navCta}
      </a>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Landing                                                           */
/* ------------------------------------------------------------------ */
export function KellerlichtLanding() {
  const params = useSearchParams();
  const preview = params.get("preview") === "1";
  const [openWine, setOpenWine] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <div className="relative">
      <KellerlichtScrollHero preview={preview} />

      {!preview && <StickyNav />}

      {/* ── Am Glas ── */}
      <SectionDivider />
      <section
        id="am-glas"
        className={`relative scroll-mt-24 ${SECTION_X} ${SECTION_Y}`}
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-3 kl-mono text-[0.72rem] tracking-[0.16em] text-[#7a2e3a] uppercase">
            {kellerlichtCopy.menuLead.eyebrow}
          </p>
          <h2 className={`m-0 mb-4 ${H2} leading-[1.1] font-semibold text-[#1c1412]`}>
            {kellerlichtCopy.menuLead.title}
          </h2>
          <p className="mt-3 mb-10 max-w-[38ch] text-[1.1rem] leading-relaxed text-[rgba(42,33,28,0.72)]">
            {kellerlichtCopy.menuLead.lead}
          </p>

          <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-10">
            <div className="rounded-[1.25rem] border border-[rgba(42,33,28,0.1)] bg-[rgba(255,252,247,0.55)] p-5 shadow-[0_4px_24px_rgba(42,33,28,0.06)] backdrop-blur-sm sm:p-6">
              {kellerlichtCopy.menu.map((group, gi) => (
                <div
                  key={group.section}
                  className={
                    gi > 0
                      ? "mt-6 border-t border-[rgba(42,33,28,0.1)] pt-6"
                      : ""
                  }
                >
                  <h3 className="mb-3 kl-display text-[1.45rem] text-[#1c1412]">
                    {group.section}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Wine
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        note={item.note}
                        open={openWine === item.name}
                        onToggle={() =>
                          setOpenWine((cur) =>
                            cur === item.name ? null : item.name,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
              <p className="mt-5 text-sm text-[rgba(42,33,28,0.72)]">
                {kellerlichtCopy.menuLead.tip}
              </p>
            </div>
            <figure className="aspect-[4/3] overflow-hidden rounded-[1.4rem] shadow-[0_30px_60px_rgba(42,33,28,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kellerlichtAssets.board}
                alt="Brettl mit Käse, Schinken und Wein am Glas"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ── Das Haus ── */}
      <SectionDivider />
      <section
        id="warum"
        className={`relative scroll-mt-24 ${SECTION_X} ${SECTION_Y}`}
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-3 kl-mono text-[0.72rem] tracking-[0.16em] text-[#7a2e3a] uppercase">
            {kellerlichtCopy.trust.eyebrow}
          </p>
          <h2 className={`m-0 mb-4 ${H2} leading-[1.1] font-semibold text-[#1c1412]`}>
            {kellerlichtCopy.trust.title}
          </h2>
          <p className="mt-3 mb-10 max-w-[38ch] text-[1.1rem] leading-relaxed text-[rgba(42,33,28,0.72)]">
            {kellerlichtCopy.trust.lead}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {kellerlichtCopy.trust.items.map((item) => (
              <article
                key={item.num}
                className="rounded-[1.2rem] border border-[rgba(42,33,28,0.08)] bg-gradient-to-br from-[rgba(255,252,247,0.7)] to-[rgba(242,232,220,0.35)] p-5 shadow-[0_4px_20px_rgba(42,33,28,0.05)] transition-shadow hover:shadow-[0_8px_32px_rgba(42,33,28,0.1)]"
              >
                <span className="kl-mono text-xs tracking-widest text-[#d4a05a]">
                  {item.num}
                </span>
                <h3 className="mt-2 mb-2 kl-display text-[1.55rem] text-[#1c1412]">
                  {item.title}
                </h3>
                <p className="m-0 text-[rgba(42,33,28,0.72)]">{item.body}</p>
              </article>
            ))}
          </div>
          <figure className="mt-10 aspect-[16/10] overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_rgba(42,33,28,0.16)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kellerlichtAssets.bar}
              alt="Weinbar mit Kerzenlicht und Steinwand"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ── Zeiten ── */}
      <SectionDivider />
      <section
        id="zeiten"
        className={`relative scroll-mt-24 ${SECTION_X} ${SECTION_Y}`}
      >
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 kl-mono text-[0.72rem] tracking-[0.16em] text-[#7a2e3a] uppercase">
              {kellerlichtCopy.hours.eyebrow}
            </p>
            <h2 className={`m-0 mb-4 ${H2} leading-[1.1] font-semibold text-[#1c1412]`}>
              {kellerlichtCopy.hours.title}
            </h2>
            <p className="mt-3 mb-8 max-w-[38ch] text-[1.1rem] leading-relaxed text-[rgba(42,33,28,0.72)]">
              {kellerlichtCopy.hours.lead}
            </p>
            <ul className="m-0 list-none p-0">
              {kellerlichtCopy.hours.rows.map((row) => (
                <li
                  key={row.days}
                  className="flex justify-between gap-4 border-b border-[rgba(42,33,28,0.12)] py-3"
                >
                  <span>{row.days}</span>
                  <span className="kl-mono text-sm text-[rgba(42,33,28,0.72)]">
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[rgba(42,33,28,0.72)]">
              {kellerlichtCopy.hours.note}
            </p>
          </div>
          <figure className="aspect-[16/10] overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_rgba(42,33,28,0.16)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kellerlichtAssets.vault}
              alt="Weinkeller mit Flaschen und Steinbogen"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ── FAQ ── */}
      <SectionDivider />
      <section
        id="faq"
        className={`relative scroll-mt-24 ${SECTION_X} ${SECTION_Y}`}
      >
        <div className="mx-auto max-w-[720px]">
          <p className="mb-3 kl-mono text-[0.72rem] tracking-[0.16em] text-[#7a2e3a] uppercase">
            {kellerlichtCopy.faq.eyebrow}
          </p>
          <h2 className={`m-0 mb-8 ${H2} leading-[1.1] font-semibold text-[#1c1412]`}>
            {kellerlichtCopy.faq.title}
          </h2>
          <div className="space-y-3">
            {kellerlichtCopy.faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-[rgba(42,33,28,0.1)] bg-[rgba(255,252,247,0.5)] px-4 py-3 shadow-[0_2px_12px_rgba(42,33,28,0.04)] transition-shadow open:shadow-[0_4px_20px_rgba(42,33,28,0.08)]"
              >
                <summary className="flex cursor-pointer items-center gap-2.5 font-semibold text-[#1c1412] list-none [&::-webkit-details-marker]:hidden">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4a05a]" />
                  <span className="flex-1">{item.q}</span>
                  <span className="text-[1.2rem] text-[#d4a05a] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 mb-0 pl-4 text-[rgba(42,33,28,0.72)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservieren ── */}
      <section
        id="reservieren"
        className="relative mx-5 mb-12 scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-[rgba(242,232,220,0.1)] bg-[linear-gradient(135deg,rgba(28,20,18,0.82),rgba(42,33,28,0.5)_50%,rgba(28,20,18,0.7)),url('/demos/kellerlicht/hero-end.jpg')] bg-cover bg-center px-8 py-12 text-[#f2e8dc] shadow-[0_28px_60px_rgba(42,33,28,0.22)] sm:mx-8 sm:mb-16 lg:mx-16 lg:mb-20 lg:px-16 lg:py-20"
      >
        <p className="mb-3 kl-mono text-[0.72rem] tracking-[0.16em] text-[#d4a05a] uppercase">
          {kellerlichtCopy.reserve.eyebrow}
        </p>
        <h2 className={`m-0 mb-4 ${H2} leading-[1.1] font-semibold kl-cream`}>
          {kellerlichtCopy.reserve.title}
        </h2>
        <p className="mt-3 mb-8 max-w-[38ch] text-[1.1rem] leading-relaxed text-[rgba(242,232,220,0.82)]">
          {kellerlichtCopy.reserve.lead}
        </p>

        <form className="grid max-w-[420px] gap-3" onSubmit={onSubmit}>
          {!done ? (
            <>
              <label className="grid gap-1 text-sm">
                Name
                <input
                  name="name"
                  required
                  placeholder="Maria Huber"
                  className="rounded-xl border border-[rgba(242,232,220,0.28)] bg-[rgba(28,20,18,0.35)] px-3 py-3 text-[#f2e8dc] outline-none placeholder:text-[rgba(242,232,220,0.45)]"
                />
              </label>
              <label className="grid gap-1 text-sm">
                Gäste
                <select
                  name="guests"
                  required
                  className="rounded-xl border border-[rgba(242,232,220,0.28)] bg-[rgba(28,20,18,0.35)] px-3 py-3 text-[#f2e8dc] outline-none"
                  defaultValue="2"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm">
                Wunschtermin
                <input
                  name="when"
                  required
                  placeholder="Fr 19:30"
                  className="rounded-xl border border-[rgba(242,232,220,0.28)] bg-[rgba(28,20,18,0.35)] px-3 py-3 text-[#f2e8dc] outline-none placeholder:text-[rgba(242,232,220,0.45)]"
                />
              </label>
              <label className="grid gap-1 text-sm">
                Nachricht
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Fensterplatz, stiller Tisch…"
                  className="rounded-xl border border-[rgba(242,232,220,0.28)] bg-[rgba(28,20,18,0.35)] px-3 py-3 text-[#f2e8dc] outline-none placeholder:text-[rgba(242,232,220,0.45)]"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-[#d4a05a] px-5 py-3 font-bold text-[#1c1412] transition hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(212,160,90,0.35)]"
              >
                {kellerlichtCopy.reserve.submit}
              </button>
              <p className="m-0 text-sm text-[rgba(242,232,220,0.7)]">
                Oder{" "}
                <a
                  href={kellerlichtWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4a05a]"
                >
                  {kellerlichtCopy.reserve.waLabel}
                </a>
                .
              </p>
            </>
          ) : (
            <div role="status">
              <p className="m-0 kl-display text-[2rem] font-semibold">
                {kellerlichtCopy.reserve.successTitle}
              </p>
              <p className="mt-2 text-[rgba(242,232,220,0.85)]">
                {kellerlichtCopy.reserve.successBody}
              </p>
              <p className="mt-4 text-sm">
                <a
                  href={kellerlichtWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4a05a]"
                >
                  WhatsApp öffnen
                </a>
              </p>
            </div>
          )}
        </form>
      </section>

      {/* ── Footer ── */}
      <footer className={`border-t border-[rgba(42,33,28,0.12)] ${SECTION_X} py-12 text-sm text-[rgba(42,33,28,0.72)]`}>
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 flex-shrink-0 text-[#d4a05a]"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2v4M8 10v12M4 6h8a4 4 0 0 1 0 8H8" />
              <path d="M16 2l2 18M20 2l-2 2" />
            </svg>
            <div>
              <strong className="mb-0.5 block kl-display text-[1.35rem] font-semibold text-[#1c1412]">
                {kellerlichtCopy.brand}
              </strong>
              <p className="m-0 max-w-[36ch] text-[0.85rem]">
                {kellerlichtCopy.footer}
              </p>
            </div>
          </div>
          <nav className="flex gap-5 text-[0.88rem]">
            <a href="#am-glas" className="text-[rgba(42,33,28,0.72)] no-underline transition-colors hover:text-[#1c1412]">
              Am Glas
            </a>
            <a href="#warum" className="text-[rgba(42,33,28,0.72)] no-underline transition-colors hover:text-[#1c1412]">
              Das Haus
            </a>
            <a href="#zeiten" className="text-[rgba(42,33,28,0.72)] no-underline transition-colors hover:text-[#1c1412]">
              Zeiten
            </a>
            <a href="#reservieren" className="text-[rgba(42,33,28,0.72)] no-underline transition-colors hover:text-[#1c1412]">
              Tisch sichern
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
