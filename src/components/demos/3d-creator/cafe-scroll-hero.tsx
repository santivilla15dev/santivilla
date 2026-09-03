"use client";

/* eslint-disable @next/next/no-img-element */

import { ContactButton } from "./contact-button";
import { portfolioCafeAssets } from "@/lib/demos/portfolio-cafe";
import type { Creator3dContent } from "@/lib/demos/3d-creator";
import { locales, type Locale } from "@/lib/i18n/locales";
import { whatsappHref } from "@/lib/site";
import { useEffect, useRef, useState } from "react";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

type Props = {
  content: Creator3dContent;
  langHrefs: Record<Locale, string>;
};

/**
 * Hero cinematográfico del home: scrub del vídeo café en desktop y móvil.
 * Still fijo solo con reduced-motion o si el vídeo falla.
 */
export function CafeScrollHero({ content, langHrefs }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const displayRef = useRef(0);
  const seekingRef = useRef(false);
  const lastSeekRef = useRef(-1);
  const [bandIndex, setBandIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hintGone, setHintGone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const bands = content.hero.bands;

  function syncFromTrack() {
    const track = trackRef.current;
    if (!track) return;
    const total = Math.max(1, track.offsetHeight - window.innerHeight);
    const scrolled = -track.getBoundingClientRect().top;
    targetRef.current = clamp01(scrolled / total);
    if (targetRef.current > 0.04) setHintGone(true);
  }

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setReduceMotion(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setBandIndex(bands.length - 1);
      return;
    }
    syncFromTrack();
    window.addEventListener("scroll", syncFromTrack, { passive: true });
    window.addEventListener("resize", syncFromTrack);
    return () => {
      window.removeEventListener("scroll", syncFromTrack);
      window.removeEventListener("resize", syncFromTrack);
    };
  }, [reduceMotion, bands.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    function markReady() {
      setReady(true);
    }

    if (video.readyState >= 2) markReady();
    else video.addEventListener("loadeddata", markReady, { once: true });

    video.addEventListener(
      "error",
      () => {
        setFailed(true);
        setReady(false);
      },
      { once: true },
    );

    return () => {
      video.removeEventListener("loadeddata", markReady);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || failed) return;
    const video = videoRef.current;
    let raf = 0;
    let alive = true;

    function tick() {
      if (!alive) return;
      displayRef.current += (targetRef.current - displayRef.current) * 0.14;
      const p = displayRef.current;

      let idx = 0;
      for (let i = 0; i < bands.length; i++) {
        const b = bands[i];
        if (p >= b.from && p < b.to) idx = i;
      }
      setBandIndex((prev) => (prev === idx ? prev : idx));

      if (video && ready && video.duration && !seekingRef.current) {
        const t = p * Math.max(0, video.duration - 0.04);
        if (Math.abs(t - lastSeekRef.current) > 0.012) {
          lastSeekRef.current = t;
          seekingRef.current = true;
          const onSeeked = () => {
            seekingRef.current = false;
            video.removeEventListener("seeked", onSeeked);
            window.clearTimeout(safety);
          };
          const safety = window.setTimeout(() => {
            seekingRef.current = false;
            video.removeEventListener("seeked", onSeeked);
          }, 220);
          video.addEventListener("seeked", onSeeked);
          try {
            video.currentTime = t;
          } catch {
            seekingRef.current = false;
            window.clearTimeout(safety);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [ready, reduceMotion, failed, bands]);

  const band = bands[bandIndex] ?? bands[0];
  const showVideo = !reduceMotion && !failed;

  const navItems = [
    { label: content.nav.about, href: "#about" },
    { label: content.nav.services, href: "#services" },
    { label: content.nav.projects, href: "#projects" },
  ];

  const mediaClass =
    "absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-[58%_center]";

  return (
    <div
      ref={trackRef}
      className="relative h-[min(220vh,1600px)] w-full"
      id="home-cafe-hero"
    >
      <div className="sticky top-0 isolate h-[100svh] min-h-[28rem] w-full overflow-hidden bg-[#0C0C0C]">
        <img
          src={portfolioCafeAssets.poster}
          alt={
            reduceMotion || failed
              ? "Santi Villa diseñando en una cafetería"
              : ""
          }
          className={`z-0 transition-opacity duration-700 ${mediaClass} ${
            showVideo && ready ? "opacity-0" : "opacity-100"
          }`}
        />

        {showVideo ? (
          <video
            ref={videoRef}
            className={`z-[1] transition-opacity duration-700 ${mediaClass} ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            src={portfolioCafeAssets.video}
            muted
            playsInline
            preload="auto"
            poster={portfolioCafeAssets.poster}
          />
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/70 via-black/25 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/45 via-transparent to-black/65"
          aria-hidden
        />

        <nav className="absolute inset-x-0 top-0 z-20 px-5 pt-4 sm:px-8 sm:pt-5 md:px-10 md:pt-6">
          <div
            className="flex justify-end gap-3 text-[11px] font-medium uppercase tracking-widest text-[#D7E2EA]/60"
            aria-label={content.langLabel}
          >
            {locales.map((code) => (
              <a
                key={code}
                href={langHrefs[code]}
                aria-current={code === content.locale ? "true" : undefined}
                className={`transition-colors hover:text-[#D7E2EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] ${
                  code === content.locale
                    ? "text-[#D7E2EA] underline decoration-[#B600A8] decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                {code}
              </a>
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] font-medium uppercase tracking-wide text-[#D7E2EA] sm:gap-x-4 sm:text-sm sm:tracking-wider md:text-lg lg:text-[1.4rem]">
            {navItems.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <a
                  href={item.href}
                  className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="whitespace-nowrap">
              <a
                href={whatsappHref(content.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
              >
                {content.nav.contact}
              </a>
            </li>
          </ul>
        </nav>

        {/* Primer viewport: marca + una línea + CTA (sin tagline duplicada). */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-10 pt-24 sm:px-8 sm:pb-12 md:px-10 md:pb-14">
          <h1 className="max-w-[12ch] font-black uppercase leading-[0.95] tracking-tight text-[#D7E2EA] [text-shadow:0_12px_40px_rgba(0,0,0,0.55)] text-[clamp(2.2rem,8.5vw,5.2rem)]">
            {content.hero.heading}
          </h1>

          <p
            key={bandIndex}
            className="mt-3 max-w-[20ch] text-[clamp(0.95rem,2.4vw,1.35rem)] font-light leading-snug text-[#D7E2EA] [text-shadow:0_8px_24px_rgba(0,0,0,0.55)] sm:mt-4 sm:max-w-[26ch]"
          >
            {band.line}
          </p>

          <div className="mt-6 sm:mt-8">
            <ContactButton content={content} />
          </div>

          {!hintGone && !reduceMotion ? (
            <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.18em] text-[#D7E2EA]/45 sm:bottom-4">
              {content.hero.scrollHint}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
