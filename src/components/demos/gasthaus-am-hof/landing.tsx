"use client";

import {
  gasthausAssets,
  gasthausCopy,
  gasthausWa,
} from "@/lib/demos/gasthaus-am-hof";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { GasthausScrollHero } from "./scroll-hero";

function Dish({
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
        open ? "bg-[rgba(196,137,58,0.12)]" : "hover:bg-[rgba(196,137,58,0.08)]"
      }`}
    >
      <span className="font-semibold text-[#2a211c]">{name}</span>
      <span className="font-[family-name:var(--font-gasthaus-mono)] text-sm text-[#6b2c2c]">
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

export function GasthausLanding() {
  const params = useSearchParams();
  const preview = params.get("preview") === "1";
  const [openDish, setOpenDish] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  /* Tarjeta / demo: nav va dentro del sticky hero (no absolute sobre Speisekarte). */
  return (
    <div className="relative">
      <GasthausScrollHero preview={preview} />

      <section
        id="speisekarte"
        className="relative scroll-mt-24 px-[clamp(1.25rem,5vw,4rem)] py-[clamp(4rem,10vw,7rem)]"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-3 font-[family-name:var(--font-gasthaus-mono)] text-[0.72rem] tracking-[0.16em] text-[#6b2c2c] uppercase">
            {gasthausCopy.menuLead.eyebrow}
          </p>
          <h2 className="m-0 font-[family-name:var(--font-gasthaus-display)] text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-semibold text-[#3d2a1f]">
            {gasthausCopy.menuLead.title}
          </h2>
          <p className="mt-3 mb-8 max-w-[38ch] text-[1.05rem] text-[rgba(42,33,28,0.72)]">
            {gasthausCopy.menuLead.lead}
          </p>

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <div className="rounded-[1.25rem] border border-[rgba(61,42,31,0.1)] bg-[rgba(255,252,247,0.55)] p-5 backdrop-blur-sm sm:p-6">
              {gasthausCopy.menu.map((group, gi) => (
                <div
                  key={group.section}
                  className={
                    gi > 0
                      ? "mt-6 border-t border-[rgba(61,42,31,0.1)] pt-6"
                      : ""
                  }
                >
                  <h3 className="mb-3 font-[family-name:var(--font-gasthaus-display)] text-[1.45rem] text-[#3d2a1f]">
                    {group.section}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Dish
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        note={item.note}
                        open={openDish === item.name}
                        onToggle={() =>
                          setOpenDish((cur) =>
                            cur === item.name ? null : item.name,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
              <p className="mt-5 text-sm text-[rgba(42,33,28,0.72)]">
                {gasthausCopy.menuLead.tip}
              </p>
            </div>
            <figure className="aspect-[4/3] overflow-hidden rounded-[1.4rem] shadow-[0_30px_60px_rgba(42,33,28,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gasthausAssets.schnitzel}
                alt="Wiener Schnitzel mit Erdäpfelsalat und Weißwein"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        id="warum"
        className="relative scroll-mt-24 px-[clamp(1.25rem,5vw,4rem)] py-[clamp(4rem,10vw,7rem)]"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-3 font-[family-name:var(--font-gasthaus-mono)] text-[0.72rem] tracking-[0.16em] text-[#6b2c2c] uppercase">
            {gasthausCopy.trust.eyebrow}
          </p>
          <h2 className="m-0 font-[family-name:var(--font-gasthaus-display)] text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-semibold text-[#3d2a1f]">
            {gasthausCopy.trust.title}
          </h2>
          <p className="mt-3 mb-8 max-w-[38ch] text-[1.05rem] text-[rgba(42,33,28,0.72)]">
            {gasthausCopy.trust.lead}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {gasthausCopy.trust.items.map((item) => (
              <article
                key={item.num}
                className="rounded-[1.2rem] border border-[rgba(61,42,31,0.08)] bg-gradient-to-br from-[rgba(255,252,247,0.7)] to-[rgba(243,235,224,0.35)] p-5"
              >
                <span className="font-[family-name:var(--font-gasthaus-mono)] text-xs tracking-widest text-[#c4893a]">
                  {item.num}
                </span>
                <h3 className="mt-2 mb-2 font-[family-name:var(--font-gasthaus-display)] text-[1.55rem] text-[#3d2a1f]">
                  {item.title}
                </h3>
                <p className="m-0 text-[rgba(42,33,28,0.72)]">{item.body}</p>
              </article>
            ))}
          </div>
          <figure className="mt-10 aspect-[16/10] overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_rgba(42,33,28,0.16)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gasthausAssets.dining}
              alt="Gastraum mit Holztäfelung und warmen Lampen"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section
        id="zeiten"
        className="relative scroll-mt-24 px-[clamp(1.25rem,5vw,4rem)] py-[clamp(4rem,10vw,7rem)]"
      >
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="mb-3 font-[family-name:var(--font-gasthaus-mono)] text-[0.72rem] tracking-[0.16em] text-[#6b2c2c] uppercase">
              {gasthausCopy.hours.eyebrow}
            </p>
            <h2 className="m-0 font-[family-name:var(--font-gasthaus-display)] text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-semibold text-[#3d2a1f]">
              {gasthausCopy.hours.title}
            </h2>
            <p className="mt-3 mb-6 max-w-[38ch] text-[1.05rem] text-[rgba(42,33,28,0.72)]">
              {gasthausCopy.hours.lead}
            </p>
            <ul className="m-0 list-none p-0">
              {gasthausCopy.hours.rows.map((row) => (
                <li
                  key={row.days}
                  className="flex justify-between gap-4 border-b border-[rgba(61,42,31,0.12)] py-3"
                >
                  <span>{row.days}</span>
                  <span className="font-[family-name:var(--font-gasthaus-mono)] text-sm text-[rgba(42,33,28,0.72)]">
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[rgba(42,33,28,0.72)]">
              {gasthausCopy.hours.note}
            </p>
          </div>
          <figure className="aspect-[16/10] overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_rgba(42,33,28,0.16)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gasthausAssets.door}
              alt="Holztür des Gasthauses bei Nacht"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section
        id="faq"
        className="relative scroll-mt-24 px-[clamp(1.25rem,5vw,4rem)] py-[clamp(4rem,10vw,7rem)]"
      >
        <div className="mx-auto max-w-[720px]">
          <p className="mb-3 font-[family-name:var(--font-gasthaus-mono)] text-[0.72rem] tracking-[0.16em] text-[#6b2c2c] uppercase">
            {gasthausCopy.faq.eyebrow}
          </p>
          <h2 className="m-0 mb-6 font-[family-name:var(--font-gasthaus-display)] text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-semibold text-[#3d2a1f]">
            {gasthausCopy.faq.title}
          </h2>
          <div className="space-y-3">
            {gasthausCopy.faq.items.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-[rgba(61,42,31,0.1)] bg-[rgba(255,252,247,0.5)] px-4 py-3"
              >
                <summary className="cursor-pointer list-none font-semibold text-[#3d2a1f] [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <p className="mt-2 mb-0 text-[rgba(42,33,28,0.72)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="reservieren"
        className="relative mx-[clamp(1.25rem,5vw,4rem)] mb-[clamp(3rem,8vw,5rem)] scroll-mt-24 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(26,18,14,0.78),rgba(61,42,31,0.55)),url('/demos/restaurant/hero-end.jpg')] bg-cover bg-center px-[clamp(2.5rem,6vw,4rem)] py-[clamp(2.5rem,6vw,4rem)] text-[#f3ebe0] shadow-[0_28px_60px_rgba(42,33,28,0.22)]"
      >
        <p className="mb-3 font-[family-name:var(--font-gasthaus-mono)] text-[0.72rem] tracking-[0.16em] text-[#c4893a] uppercase">
          {gasthausCopy.reserve.eyebrow}
        </p>
        <h2 className="m-0 font-[family-name:var(--font-gasthaus-display)] text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-semibold text-[#f3ebe0]">
          {gasthausCopy.reserve.title}
        </h2>
        <p className="mt-3 mb-6 max-w-[38ch] text-[rgba(243,235,224,0.82)]">
          {gasthausCopy.reserve.lead}
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
                  className="rounded-xl border border-[rgba(243,235,224,0.28)] bg-[rgba(26,18,14,0.35)] px-3 py-3 text-[#f3ebe0] outline-none placeholder:text-[rgba(243,235,224,0.45)]"
                />
              </label>
              <label className="grid gap-1 text-sm">
                Gäste
                <select
                  name="guests"
                  required
                  className="rounded-xl border border-[rgba(243,235,224,0.28)] bg-[rgba(26,18,14,0.35)] px-3 py-3 text-[#f3ebe0] outline-none"
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
                  className="rounded-xl border border-[rgba(243,235,224,0.28)] bg-[rgba(26,18,14,0.35)] px-3 py-3 text-[#f3ebe0] outline-none placeholder:text-[rgba(243,235,224,0.45)]"
                />
              </label>
              <label className="grid gap-1 text-sm">
                Nachricht
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Fensterplatz, Kinderstuhl…"
                  className="rounded-xl border border-[rgba(243,235,224,0.28)] bg-[rgba(26,18,14,0.35)] px-3 py-3 text-[#f3ebe0] outline-none placeholder:text-[rgba(243,235,224,0.45)]"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-[#c4893a] px-5 py-3 font-bold text-[#3d2a1f] transition hover:-translate-y-px"
              >
                {gasthausCopy.reserve.submit}
              </button>
              <p className="m-0 text-sm text-[rgba(243,235,224,0.7)]">
                Oder{" "}
                <a
                  href={gasthausWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4893a]"
                >
                  {gasthausCopy.reserve.waLabel}
                </a>
                .
              </p>
            </>
          ) : (
            <div role="status">
              <p className="m-0 font-[family-name:var(--font-gasthaus-display)] text-[2rem] font-semibold">
                {gasthausCopy.reserve.successTitle}
              </p>
              <p className="mt-2 text-[rgba(243,235,224,0.85)]">
                {gasthausCopy.reserve.successBody}
              </p>
              <p className="mt-4 text-sm">
                <a
                  href={gasthausWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4893a]"
                >
                  WhatsApp öffnen
                </a>
              </p>
            </div>
          )}
        </form>
      </section>

      <footer className="border-t border-[rgba(61,42,31,0.12)] px-[clamp(1.25rem,5vw,4rem)] py-10 text-sm text-[rgba(42,33,28,0.72)]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-end justify-between gap-4">
          <div>
            <strong className="mb-1 block font-[family-name:var(--font-gasthaus-display)] text-[1.35rem] font-semibold text-[#3d2a1f]">
              {gasthausCopy.brand}
            </strong>
            {gasthausCopy.footer}
          </div>
          <div>
            <a href="#speisekarte" className="text-inherit">
              Speisekarte
            </a>
            {" · "}
            <a href="#reservieren" className="text-inherit">
              Reservieren
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
