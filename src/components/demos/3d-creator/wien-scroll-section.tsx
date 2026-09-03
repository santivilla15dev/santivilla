"use client";

/* eslint-disable @next/next/no-img-element */

import { ContactButton } from "./contact-button";
import type { Creator3dContent } from "@/lib/demos/3d-creator";
import { portfolioWienAssets } from "@/lib/demos/portfolio-wien";
import { useEffect, useRef, useState } from "react";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

type Props = {
  content: Creator3dContent;
};

/**
 * Segunda secuencia cinematográfica: terraza Wien, scrub tras Proyectos.
 * Sin nav del hero; solo marca corta, bandas y CTA WhatsApp.
 */
export function WienScrollSection({ content }: Props) {
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

  const { bands, scrollHint, eyebrow } = content.wienScroll;

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

  const mediaClass =
    "absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[58%_center] md:object-[54%_center]";

  return (
    <section
      ref={trackRef}
      className="relative h-[min(170vh,1100px)] w-full md:h-[min(220vh,1600px)]"
      id="wien-scrub"
      aria-label={eyebrow}
    >
      <div className="sticky top-0 isolate h-[100svh] min-h-[28rem] w-full overflow-hidden bg-[#0C0C0C]">
        <img
          src={portfolioWienAssets.poster}
          alt={
            reduceMotion || failed
              ? "Santi Villa en una terraza en Wien"
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
            src={portfolioWienAssets.video}
            muted
            playsInline
            preload="auto"
            poster={portfolioWienAssets.poster}
          />
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/75 via-black/30 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/35 via-transparent to-black/80 sm:to-black/70"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-12 md:px-10 md:pb-14">
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/70">
            {eyebrow}
          </p>
          <p
            key={bandIndex}
            className="max-w-[22ch] font-black uppercase leading-[0.95] tracking-tight text-[#D7E2EA] [text-shadow:0_12px_40px_rgba(0,0,0,0.55)] text-[clamp(1.8rem,6.5vw,3.6rem)]"
          >
            {band.line}
          </p>

          <div className="mt-6 sm:mt-8">
            <ContactButton content={content} />
          </div>

          {!hintGone && !reduceMotion ? (
            <p className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.18em] text-[#D7E2EA]/45 sm:bottom-4">
              {scrollHint}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
