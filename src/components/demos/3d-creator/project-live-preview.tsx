"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

/** Auto-scroll solo de introducción; se corta al interactuar. */
const INTRO_HOLD_MS = 2800;
const INTRO_TOUR_MS = 9000;
const INTRO_DURATION_MS = INTRO_HOLD_MS + INTRO_TOUR_MS;
const INTRO_MAX_FRAC = 0.42;
const PREVIEW_READY = "demo-preview-ready";
/** Si el iframe no avisa, no dejar el hueco vacío para siempre. */
const READY_FALLBACK_MS = 2500;

type ProjectLivePreviewProps = {
  href: string;
  fallbackSrc: string;
  alt: string;
  scrollHint: string;
  className?: string;
};

export function ProjectLivePreview({
  href,
  fallbackSrc,
  alt,
  scrollHint,
  className = "",
}: ProjectLivePreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  /** Tras la primera interacción del usuario, nunca más auto-scroll. */
  const userDrivingRef = useRef(false);
  const [active, setActive] = useState(false);
  /** iframe montado (onLoad). */
  const [frameLoaded, setFrameLoaded] = useState(false);
  /** Contenido listo para enseñar (postMessage o timeout). */
  const [contentReady, setContentReady] = useState(false);
  const src = `${href}${href.includes("?") ? "&" : "?"}preview=1`;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { rootMargin: "240px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function takeOver() {
    userDrivingRef.current = true;
  }

  // Esperar demo-preview-ready del iframe (mismo origen).
  useEffect(() => {
    if (!active) return;

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string } | null;
      if (data?.type === PREVIEW_READY) setContentReady(true);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [active]);

  // Timeout de seguridad tras onLoad del iframe.
  useEffect(() => {
    if (!frameLoaded || contentReady) return;
    const t = window.setTimeout(() => setContentReady(true), READY_FALLBACK_MS);
    return () => window.clearTimeout(t);
  }, [frameLoaded, contentReady]);

  // Escuchar interacción en document + window del iframe (Safari).
  useEffect(() => {
    if (!contentReady || !active) return;
    const win = iframeRef.current?.contentWindow;
    const doc = iframeRef.current?.contentDocument;
    if (!win) return;

    const onUser = () => takeOver();
    win.addEventListener("wheel", onUser, { passive: true });
    win.addEventListener("touchstart", onUser, { passive: true });
    win.addEventListener("pointerdown", onUser, { passive: true });
    doc?.addEventListener("wheel", onUser, { passive: true });
    doc?.addEventListener("touchstart", onUser, { passive: true });
    doc?.addEventListener("pointerdown", onUser, { passive: true });

    return () => {
      win.removeEventListener("wheel", onUser);
      win.removeEventListener("touchstart", onUser);
      win.removeEventListener("pointerdown", onUser);
      doc?.removeEventListener("wheel", onUser);
      doc?.removeEventListener("touchstart", onUser);
      doc?.removeEventListener("pointerdown", onUser);
    };
  }, [contentReady, active]);

  // Wheel sobre la tarjeta → iframe (Safari no scrollea el iframe solo).
  useEffect(() => {
    if (!contentReady || !active) return;
    const el = rootRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      e.preventDefault();
      takeOver();
      try {
        win.postMessage(
          { type: "demo-preview-wheel", deltaY: e.deltaY },
          window.location.origin,
        );
        win.scrollBy(0, e.deltaY);
      } catch {
        // ignore
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [contentReady, active]);

  // Intro: hold en hero (vídeo) → tour suave por la web → vuelta.
  useEffect(() => {
    if (!contentReady || !active) return;
    let raf = 0;
    const start = performance.now();

    try {
      iframeRef.current?.contentWindow?.scrollTo(0, 0);
    } catch {
      // ignore
    }

    function tick(now: number) {
      if (userDrivingRef.current) return;
      const elapsed = now - start;
      if (elapsed >= INTRO_DURATION_MS) {
        userDrivingRef.current = true;
        return;
      }
      try {
        const win = iframeRef.current?.contentWindow;
        if (win) {
          if (elapsed < INTRO_HOLD_MS) {
            win.scrollTo(0, 0);
          } else {
            const html = win.document.documentElement;
            const max = Math.max(0, html.scrollHeight - win.innerHeight);
            if (max > 8) {
              const t = (elapsed - INTRO_HOLD_MS) / INTRO_TOUR_MS;
              const wave = t < 0.5 ? t * 2 : (1 - t) * 2;
              win.scrollTo(0, wave * max * INTRO_MAX_FRAC);
            }
          }
        }
      } catch {
        // ignore
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [contentReady, active]);

  function focusIframe() {
    try {
      iframeRef.current?.contentWindow?.focus();
    } catch {
      // ignore
    }
  }

  function onFrameLoad() {
    setFrameLoaded(true);
  }

  return (
    <div className={className}>
      <div
        ref={rootRef}
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
        style={{ aspectRatio: "16 / 10", minHeight: "14rem" }}
        aria-label="Vista previa interactiva — puedes hacer scroll"
        onMouseEnter={focusIframe}
      >
        <img
          src={fallbackSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          className={`absolute inset-0 z-20 h-full w-full object-cover object-top transition-opacity duration-500 ${
            contentReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />

        {active ? (
          <iframe
            ref={iframeRef}
            src={src}
            title={`${alt} — vista previa interactiva, puedes hacer scroll`}
            tabIndex={0}
            scrolling="yes"
            onLoad={onFrameLoad}
            onMouseEnter={focusIframe}
            className="absolute inset-0 z-10 h-full w-full border-0 bg-[#1a120e]"
          />
        ) : null}
      </div>
      <p className="mt-2 text-xs text-[#D7E2EA]/50">{scrollHint}</p>
    </div>
  );
}
