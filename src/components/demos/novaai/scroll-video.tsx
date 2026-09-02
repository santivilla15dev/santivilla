"use client";

import { novaaiAssets } from "@/lib/demos/novaai";
import { useEffect, useRef, useState } from "react";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sw: number,
  sh: number,
  dw: number,
  dh: number,
) {
  const scale = Math.max(dw / sw, dh / sh);
  const w = sw * scale;
  const h = sh * scale;
  ctx.drawImage(source, (dw - w) / 2, (dh - h) / 2, w, h);
}

function waitSeek(video: HTMLVideoElement, time: number) {
  return new Promise<void>((resolve, reject) => {
    const onSeeked = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("seek failed"));
    };
    function cleanup() {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    }
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    try {
      video.currentTime = time;
    } catch (err) {
      cleanup();
      reject(err);
    }
  });
}

async function loadVideo(url: string, crossOrigin?: string) {
  const el = document.createElement("video");
  el.muted = true;
  el.playsInline = true;
  el.preload = "auto";
  if (crossOrigin) el.crossOrigin = crossOrigin;
  el.src = url;
  await new Promise<void>((resolve, reject) => {
    el.onloadeddata = () => resolve();
    el.onerror = () => reject(new Error(`load failed: ${url}`));
  });
  return el;
}

async function extractFrames(url: string, crossOrigin?: string) {
  const off = await loadVideo(url, crossOrigin);
  const duration = off.duration || 10;
  const count = Math.min(90, Math.max(24, Math.floor(duration * 12)));
  const bitmaps: ImageBitmap[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / (count - 1)) * Math.max(0, duration - 0.05);
    await waitSeek(off, t);
    const scale = Math.min(1, 960 / (off.videoWidth || 960));
    const w = Math.round((off.videoWidth || 960) * scale);
    const h = Math.round((off.videoHeight || 540) * scale);
    const tmp = document.createElement("canvas");
    tmp.width = w;
    tmp.height = h;
    const ctx = tmp.getContext("2d");
    if (!ctx) continue;
    ctx.drawImage(off, 0, 0, w, h);
    bitmaps.push(await createImageBitmap(tmp));
  }
  off.removeAttribute("src");
  off.load();
  return bitmaps;
}

export function NovaScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const targetRef = useRef(0);
  const smoothedRef = useRef(0);
  const lastSeekRef = useRef(-1);
  const seekingRef = useRef(false);
  const [posterGone, setPosterGone] = useState(false);
  const [videoHasFrame, setVideoHasFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);
  // Preferimos CloudFront; si falla, espejo local same-origin (caché de frames fiable).
  const [src, setSrc] = useState<string>(novaaiAssets.video);

  useEffect(() => {
    function onScroll() {
      // Scrub solo en el tramo cinematográfico (hasta fin de Section Two).
      const endEl = document.getElementById("nova-scrub-end");
      const end =
        endEl != null
          ? endEl.offsetTop + endEl.offsetHeight - window.innerHeight
          : document.documentElement.scrollHeight - window.innerHeight;
      const range = Math.max(1, end);
      targetRef.current = clamp01(window.scrollY / range);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const v = video;
    const c = canvas;
    let raf = 0;
    let alive = true;

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    function paint() {
      const frames = framesRef.current;
      if (frames.length === 0) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const w = c.width;
      const h = c.height;
      const i = Math.min(
        frames.length - 1,
        Math.round(smoothedRef.current * (frames.length - 1)),
      );
      const bmp = frames[i];
      drawCover(ctx, bmp, bmp.width, bmp.height, w, h);
    }

    function tick() {
      if (!alive) return;
      // Spec: smoothed += (target - smoothed) * 0.12
      smoothedRef.current += (targetRef.current - smoothedRef.current) * 0.12;
      const frames = framesRef.current;
      // Reserva: seek del <video> visible mientras el caché no está listo.
      if (frames.length === 0 && v.duration && !seekingRef.current) {
        const t = smoothedRef.current * Math.max(0, v.duration - 0.05);
        if (Math.abs(t - lastSeekRef.current) > 0.04) {
          lastSeekRef.current = t;
          seekingRef.current = true;
          const onSeeked = () => {
            seekingRef.current = false;
            v.removeEventListener("seeked", onSeeked);
          };
          v.addEventListener("seeked", onSeeked);
          try {
            v.currentTime = t;
          } catch {
            seekingRef.current = false;
          }
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [src]);

  useEffect(() => {
    const visible = videoRef.current;
    if (!visible) return;
    let cancelled = false;

    async function buildCache() {
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;

      // Caché desde el espejo local (same-origin): CloudFront suele contaminar
      // el canvas por CORS y el scrub se vuelve a seek janky. El <video> visible
      // sigue preferiendo CloudFront; el contenido es el mismo archivo.
      const attempts: { url: string; crossOrigin?: string }[] = [
        { url: novaaiAssets.videoLocal },
        { url: novaaiAssets.video, crossOrigin: "anonymous" },
      ];

      for (const attempt of attempts) {
        if (cancelled) return;
        try {
          const bitmaps = await extractFrames(attempt.url, attempt.crossOrigin);
          if (!cancelled && bitmaps.length) {
            // Libera bitmaps anteriores si los hubiera.
            for (const prev of framesRef.current) prev.close();
            framesRef.current = bitmaps;
            setCacheReady(true);
            setPosterGone(true);
            return;
          }
        } catch {
          // siguiente intento
        }
      }
    }

    function onLoaded() {
      setVideoHasFrame(true);
      setPosterGone(true);
      void buildCache();
    }
    if (visible.readyState >= 2) onLoaded();
    else visible.addEventListener("loadeddata", onLoaded, { once: true });
    return () => {
      cancelled = true;
      visible.removeEventListener("loadeddata", onLoaded);
      for (const bmp of framesRef.current) bmp.close();
      framesRef.current = [];
    };
  }, [src]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={novaaiAssets.poster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          posterGone ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoHasFrame && !cacheReady ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        muted
        playsInline
        preload="auto"
        onError={() => {
          if (src !== novaaiAssets.videoLocal) setSrc(novaaiAssets.videoLocal);
        }}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          cacheReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
