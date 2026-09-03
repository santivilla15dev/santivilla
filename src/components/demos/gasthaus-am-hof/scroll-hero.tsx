"use client";

import { gasthausAssets, gasthausCopy } from "@/lib/demos/gasthaus-am-hof";
import { useEffect, useRef, useState } from "react";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

const PREVIEW_READY = "demo-preview-ready";

type Props = {
  /** Iframe de la home: postMessage, wave, tipografía compacta. */
  preview?: boolean;
};

/**
 * Hero cinematográfico.
 * Preview (iframe): misma página + wave/scrub; tipografía compacta + postMessage.
 * Demo completa: track sticky largo + scrub por scroll.
 * Nav vive dentro del sticky (no se pinta sobre Speisekarte).
 */
export function GasthausScrollHero({ preview = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const displayRef = useRef(0);
  const seekingRef = useRef(false);
  const lastSeekRef = useRef(-1);
  const readySentRef = useRef(false);
  /** Preview: wave hasta que el usuario (o el padre) tome el control. */
  const userDrivingRef = useRef(false);
  const [bandIndex, setBandIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [hintGone, setHintGone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [viewportH, setViewportH] = useState(0);

  function signalPreviewReady() {
    if (!preview || readySentRef.current) return;
    readySentRef.current = true;
    try {
      window.parent.postMessage({ type: PREVIEW_READY }, window.location.origin);
    } catch {
      // ignore
    }
  }

  function syncTargetFromTrack() {
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

  // Preview: altura real del iframe (evita svh raro / colapso).
  useEffect(() => {
    if (!preview) return;
    function syncH() {
      setViewportH(window.innerHeight);
    }
    syncH();
    window.scrollTo(0, 0);
    window.addEventListener("resize", syncH);
    return () => window.removeEventListener("resize", syncH);
  }, [preview]);

  // Solo safety: no avisar a los 400ms (eso ocultaba el fallback antes de pintar).
  useEffect(() => {
    if (!preview) return;
    const safety = window.setTimeout(() => signalPreviewReady(), 2500);
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  useEffect(() => {
    if (reduceMotion && !preview) {
      setBandIndex(gasthausCopy.bands.length - 1);
      return;
    }

    if (!preview) {
      syncTargetFromTrack();
      window.addEventListener("scroll", syncTargetFromTrack, { passive: true });
      window.addEventListener("resize", syncTargetFromTrack);
      return () => {
        window.removeEventListener("scroll", syncTargetFromTrack);
        window.removeEventListener("resize", syncTargetFromTrack);
      };
    }

    // Preview: wave hasta interacción; luego scroll de documento (página completa).
    let waveRaf = 0;
    const waveStart = performance.now();
    const waveDuration = 16000;

    function wave(now: number) {
      if (userDrivingRef.current) return;
      const t = ((now - waveStart) % waveDuration) / waveDuration;
      targetRef.current = t < 0.5 ? t * 2 : (1 - t) * 2;
      waveRaf = requestAnimationFrame(wave);
    }
    waveRaf = requestAnimationFrame(wave);

    function takeOver() {
      if (userDrivingRef.current) return;
      userDrivingRef.current = true;
      cancelAnimationFrame(waveRaf);
    }

    function onScroll() {
      const track = trackRef.current;
      if (!userDrivingRef.current) {
        if (track && -track.getBoundingClientRect().top > 8) takeOver();
        else return;
      }
      syncTargetFromTrack();
    }

    function onWheel() {
      takeOver();
    }

    function onPointerDown() {
      takeOver();
    }

    function onTouchStart() {
      takeOver();
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; deltaY?: number } | null;
      if (data?.type !== "demo-preview-wheel") return;
      takeOver();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("message", onMessage);

    return () => {
      cancelAnimationFrame(waveRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("message", onMessage);
    };
  }, [preview, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function markReady() {
      setReady(true);
      signalPreviewReady();
    }

    if (video.readyState >= 2) markReady();
    else video.addEventListener("loadeddata", markReady, { once: true });

    video.addEventListener(
      "error",
      () => {
        setReady(false);
        signalPreviewReady();
      },
      { once: true },
    );

    return () => {
      video.removeEventListener("loadeddata", markReady);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  useEffect(() => {
    if (reduceMotion && !preview) return;
    const video = videoRef.current;
    let raf = 0;
    let alive = true;

    function tick() {
      if (!alive) return;
      displayRef.current += (targetRef.current - displayRef.current) * 0.12;
      const p = displayRef.current;

      let idx = 0;
      for (let i = 0; i < gasthausCopy.bands.length; i++) {
        const b = gasthausCopy.bands[i];
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
          };
          video.addEventListener("seeked", onSeeked);
          try {
            video.currentTime = t;
          } catch {
            seekingRef.current = false;
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
  }, [ready, reduceMotion, preview]);

  const band = gasthausCopy.bands[bandIndex];

  const media = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={gasthausAssets.poster}
        alt=""
        className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready && !(reduceMotion && !preview) ? "opacity-0" : "opacity-100"
        }`}
        ref={(el) => {
          if (preview && el?.complete && el.naturalWidth > 0) {
            signalPreviewReady();
          }
        }}
        onLoad={() => {
          if (preview) signalPreviewReady();
        }}
      />
      {!(reduceMotion && !preview) ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={gasthausAssets.video}
          muted
          playsInline
          preload="auto"
          poster={gasthausAssets.poster}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[rgba(26,18,14,0.75)] via-[rgba(26,18,14,0.25)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[rgba(26,18,14,0.4)] via-transparent to-[rgba(26,18,14,0.55)]"
        aria-hidden
      />

      <header
        className={`pointer-events-none absolute inset-x-0 top-0 z-[5] flex items-center justify-between ${
          preview
            ? "h-12 px-3"
            : "h-[4.25rem] px-[clamp(1rem,4vw,2.5rem)]"
        }`}
      >
        <a
          href="#"
          className={`pointer-events-auto font-[family-name:var(--font-gasthaus-display)] font-semibold tracking-wide text-[#f3ebe0] no-underline [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] ${
            preview ? "text-[0.95rem]" : "text-[1.35rem]"
          }`}
        >
          {gasthausCopy.brand}
        </a>
        <ul
          className={`pointer-events-auto hidden gap-6 md:flex ${
            preview ? "text-[0.75rem]" : "text-[0.92rem]"
          }`}
        >
          {gasthausCopy.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[rgba(243,235,224,0.82)] no-underline hover:text-[#f3ebe0]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#reservieren"
          className={`pointer-events-auto inline-flex rounded-full bg-[#6b2c2c] font-semibold text-[#f3ebe0] shadow-[0_8px_24px_rgba(107,44,44,0.28)] no-underline transition hover:-translate-y-px ${
            preview ? "px-3 py-1.5 text-[0.72rem]" : "px-4 py-2 text-[0.88rem]"
          }`}
        >
          {gasthausCopy.navCta}
        </a>
      </header>

      {!preview && !hintGone && !reduceMotion ? (
        <p className="absolute bottom-6 left-1/2 z-[4] -translate-x-1/2 font-[family-name:var(--font-gasthaus-mono)] text-[0.68rem] tracking-[0.16em] text-[rgba(243,235,224,0.65)] uppercase">
          Scrollen
        </p>
      ) : null}

      <div
        className={`absolute inset-0 z-[3] flex flex-col justify-end px-[clamp(1.25rem,5vw,4rem)] text-[#f3ebe0] ${
          preview ? "pb-6 pt-14" : "pt-24 pb-[16vh]"
        }`}
      >
        <div key={bandIndex} className="max-w-[20ch]">
          <p className="mb-2 font-[family-name:var(--font-gasthaus-mono)] text-[0.7rem] tracking-[0.16em] text-[rgba(243,235,224,0.72)] uppercase">
            {band.kicker}
          </p>
          <p
            className={`m-0 font-[family-name:var(--font-gasthaus-display)] leading-[1.05] font-semibold [text-shadow:0_12px_40px_rgba(0,0,0,0.5)] ${
              preview
                ? "text-[clamp(1.4rem,4.5vw,2.4rem)]"
                : "text-[clamp(2.5rem,7vw,4.6rem)]"
            }`}
          >
            {band.title}
          </p>
          {band.sub && !preview ? (
            <p className="mt-3 max-w-[28ch] text-[clamp(1rem,2.2vw,1.2rem)] text-[rgba(243,235,224,0.88)]">
              {band.sub}
            </p>
          ) : null}
          {band.cta && !preview ? (
            <a
              href="#reservieren"
              className="mt-5 inline-flex rounded-full bg-[#c4893a] px-5 py-2.5 font-bold text-[#3d2a1f] transition hover:-translate-y-px"
            >
              Reservieren
            </a>
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={trackRef}
      className="relative h-[min(320vh,2400px)] w-full"
      id="gasthaus-hero"
    >
      <div
        className={
          preview
            ? "sticky top-0 isolate w-full overflow-hidden bg-[#1a120e]"
            : "sticky top-0 isolate h-[100svh] min-h-[28rem] w-full overflow-hidden bg-[#1a120e]"
        }
        style={
          preview && viewportH > 0
            ? { height: viewportH }
            : preview
              ? { height: "100vh" }
              : undefined
        }
      >
        {media}
      </div>
    </div>
  );
}

export { PREVIEW_READY as GASTHAUS_PREVIEW_READY_MSG };
