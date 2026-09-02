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
  return new Promise<void>((resolve) => {
    const done = () => {
      video.removeEventListener("seeked", done);
      resolve();
    };
    video.addEventListener("seeked", done);
    video.currentTime = time;
  });
}

export function NovaScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const targetRef = useRef(0);
  const smoothedRef = useRef(0);
  const lastSeekRef = useRef(-1);
  const [posterGone, setPosterGone] = useState(false);
  const [videoHasFrame, setVideoHasFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);
  const [src, setSrc] = useState<string>(novaaiAssets.video);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? clamp01(window.scrollY / max) : 0;
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
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const frames = framesRef.current;
      const w = c.width;
      const h = c.height;
      if (frames.length > 0) {
        const i = Math.min(
          frames.length - 1,
          Math.round(smoothedRef.current * (frames.length - 1)),
        );
        const bmp = frames[i];
        drawCover(ctx, bmp, bmp.width, bmp.height, w, h);
        return;
      }
      if (v.readyState >= 2 && v.videoWidth) {
        drawCover(ctx, v, v.videoWidth, v.videoHeight, w, h);
      }
    }

    function tick() {
      if (!alive) return;
      smoothedRef.current += (targetRef.current - smoothedRef.current) * 0.12;
      const frames = framesRef.current;
      if (frames.length === 0 && v.duration) {
        const t = smoothedRef.current * Math.max(0, v.duration - 0.05);
        if (Math.abs(t - lastSeekRef.current) > 0.04) {
          lastSeekRef.current = t;
          v.currentTime = t;
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

    async function extract() {
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      const off = document.createElement("video");
      off.muted = true;
      off.playsInline = true;
      off.preload = "auto";
      off.src = src;
      off.crossOrigin = "anonymous";
      try {
        await new Promise<void>((resolve, reject) => {
          off.onloadeddata = () => resolve();
          off.onerror = () => reject(new Error("offscreen load"));
        });
        const duration = off.duration || 10;
        const count = Math.min(90, Math.max(24, Math.floor(duration * 12)));
        const bitmaps: ImageBitmap[] = [];
        for (let i = 0; i < count; i++) {
          if (cancelled) return;
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
        if (!cancelled && bitmaps.length) {
          framesRef.current = bitmaps;
          setCacheReady(true);
          setPosterGone(true);
        }
      } catch {
        // El vídeo visible sigue haciendo seek como reserva.
      }
    }

    function onLoaded() {
      setVideoHasFrame(true);
      setPosterGone(true);
      void extract();
    }
    if (visible.readyState >= 2) onLoaded();
    else visible.addEventListener("loadeddata", onLoaded, { once: true });
    return () => {
      cancelled = true;
      visible.removeEventListener("loadeddata", onLoaded);
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
