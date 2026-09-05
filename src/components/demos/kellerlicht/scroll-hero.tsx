"use client";

import { kellerlichtAssets, kellerlichtCopy } from "@/lib/demos/kellerlicht";
import {
  onFirstUserGesture,
  primeVideoForScrub,
} from "@/lib/demos/scrub-video";
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
 * Nav vive dentro del sticky (no se pinta sobre Am Glas).
 */
export function KellerlichtScrollHero({ preview = false }: Props) {
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
    const vh = window.visualViewport?.height ?? window.innerHeight;
    const total = Math.max(1, track.offsetHeight - vh);
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
      setBandIndex(kellerlichtCopy.bands.length - 1);
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
    if (reduceMotion && !preview) return;

    let cancelled = false;
    let unsubGesture: (() => void) | undefined;

    async function runPrime() {
      try {
        const ok = await primeVideoForScrub(video!);
        if (cancelled) return;
        if (ok) {
          setReady(true);
          signalPreviewReady();
          return;
        }
        unsubGesture = onFirstUserGesture(() => {
          void (async () => {
            const retryOk = await primeVideoForScrub(video!);
            if (cancelled) return;
            if (retryOk) setReady(true);
            signalPreviewReady();
          })();
        });
      } catch {
        if (!cancelled) {
          setReady(false);
          signalPreviewReady();
        }
      }
    }

    void runPrime();

    return () => {
      cancelled = true;
      unsubGesture?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, reduceMotion]);

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
      for (let i = 0; i < kellerlichtCopy.bands.length; i++) {
        const b = kellerlichtCopy.bands[i];
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
          }, 320);
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
  }, [ready, reduceMotion, preview]);

  const band = kellerlichtCopy.bands[bandIndex];

  const media = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={kellerlichtAssets.poster}
        alt=""
        className={`absolute inset-0 z-0 h-full w-full min-h-full min-w-full object-cover object-[60%_center] md:object-center transition-opacity duration-700 ${
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
          className={`absolute inset-0 z-[1] h-full w-full min-h-full min-w-full object-cover object-[60%_center] md:object-center transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={kellerlichtAssets.video}
          muted
          playsInline
          preload="auto"
          poster={kellerlichtAssets.poster}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[rgba(28,20,18,0.75)] via-[rgba(28,20,18,0.25)] to-transparent"
        aria-hidden
      />
      <div className="kl-scrim-bottom" aria-hidden />

      <header
        className={`pointer-events-none absolute inset-x-0 top-0 z-[5] flex items-center justify-between ${
          preview
            ? "h-12 px-3"
            : "h-[4.25rem] px-4 sm:px-8 lg:px-10"
        }`}
      >
        <a
          href="#"
          className={`kl-display kl-hero-copy pointer-events-auto font-semibold tracking-wide no-underline [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] ${
            preview ? "text-[0.95rem]" : "text-[1.35rem]"
          }`}
        >
          {kellerlichtCopy.brand}
        </a>
        <ul
          className={`pointer-events-auto hidden gap-6 md:flex ${
            preview ? "text-[0.75rem]" : "text-[0.92rem]"
          }`}
        >
          {kellerlichtCopy.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="kl-hero-copy no-underline opacity-80 hover:opacity-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#reservieren"
          className={`kl-btn-wine pointer-events-auto shadow-[0_8px_24px_rgba(122,46,58,0.28)] transition hover:-translate-y-px ${
            preview ? "px-3 py-1.5 text-[0.72rem]" : "px-4 py-2 text-[0.88rem]"
          }`}
        >
          {kellerlichtCopy.navCta}
        </a>
      </header>

      {!preview && !hintGone && !reduceMotion ? (
        <p className="kl-mono kl-hero-copy absolute bottom-14 left-1/2 z-[4] -translate-x-1/2 text-[0.68rem] tracking-[0.16em] uppercase opacity-70 md:bottom-6">
          Scrollen
        </p>
      ) : null}

      <div
        className={`kl-hero-copy absolute inset-0 z-[3] flex flex-col justify-end px-5 sm:px-8 lg:px-16 ${
          preview
            ? "pb-6 pt-14"
            : "pt-24 pb-[max(3rem,env(safe-area-inset-bottom),12vh)] md:pb-[16vh]"
        }`}
      >
        <div key={bandIndex} className="max-w-[20ch]">
          <p className="kl-mono mb-2 text-[0.7rem] tracking-[0.16em] uppercase opacity-80">
            {band.kicker}
          </p>
          <p
            className={`kl-display m-0 leading-[1.05] font-semibold [text-shadow:0_12px_40px_rgba(0,0,0,0.5)] ${
              preview
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {band.title}
          </p>
          {band.sub && !preview ? (
            <p className="mt-3 max-w-[28ch] text-base opacity-90 sm:text-lg lg:text-xl">
              {band.sub}
            </p>
          ) : null}
          {band.cta && !preview ? (
            <a href="#reservieren" className="kl-btn-amber mt-5">
              Tisch sichern
            </a>
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={trackRef}
      className={
        preview
          ? "relative h-[min(320vh,2400px)] w-full"
          : "relative h-[min(180vh,1400px)] w-full md:h-[min(320vh,2400px)]"
      }
      id="kellerlicht-hero"
    >
      <div
        className={
          preview
            ? "sticky top-0 isolate w-full overflow-hidden bg-[#1c1412]"
            : "sticky top-0 isolate h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#1c1412] supports-[height:100dvh]:h-dvh"
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

export { PREVIEW_READY as KELLERLICHT_PREVIEW_READY_MSG };
