"use client";

/* eslint-disable @next/next/no-img-element */

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore, useState } from "react";

// Vídeo con canal alpha: VP9 en WebM (Chrome, Firefox, Edge) y HEVC en MOV (Safari).
export type PortraitVideo = { webm: string; hevc: string };

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

// Lectura estable de navigator.connection.saveData (false en SSR y en la
// primera pintura del cliente, así el HTML coincide con el del servidor).
function subscribeNoop() {
  return () => {};
}
function readSaveData() {
  return (navigator as NavigatorWithConnection).connection?.saveData === true;
}

export function HeroPortrait({
  src,
  video,
  alt,
}: {
  src: string;
  video?: PortraitVideo;
  alt: string;
}) {
  const reduce = useReducedMotion();
  const saveData = useSyncExternalStore(subscribeNoop, readSaveData, () => false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  const showVideo = Boolean(video) && !reduce && !saveData && !failed;

  if (!showVideo || !video) {
    return (
      <img
        src={src}
        alt={alt}
        className="block w-full select-none"
        draggable={false}
      />
    );
  }

  return (
    <div className="relative w-full">
      {/* El <img> reserva el hueco y es el fallback accesible; se oculta cuando el
          vídeo transparente ya se reproduce para que no asome una segunda silueta. */}
      <img
        src={src}
        alt={alt}
        className={`block w-full select-none transition-opacity duration-300 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />
      <video
        className="absolute inset-0 h-full w-full select-none object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        // El autoplay puede arrancar antes de la hidratación y perderse "playing";
        // timeupdate sigue llegando mientras reproduce.
        onTimeUpdate={(e) => {
          if (!playing && e.currentTarget.currentTime > 0) setPlaying(true);
        }}
        onError={() => setFailed(true)}
      >
        <source src={video.hevc} type='video/quicktime; codecs="hvc1"' />
        <source src={video.webm} type='video/webm; codecs="vp9"' />
      </video>
    </div>
  );
}
