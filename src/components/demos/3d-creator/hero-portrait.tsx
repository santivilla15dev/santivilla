"use client";

/* eslint-disable @next/next/no-img-element */

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore, useState } from "react";

export type PortraitVideo = { webm: string; mp4: string };

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

// Los bordes del vídeo son fondo liso; al desvanecerlos, la diferencia de
// 1-2 niveles entre el negro del códec y el #0C0C0C de la página no forma rectángulo.
const EDGE_MASK =
  "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent), linear-gradient(to bottom, transparent, #000 8%)";

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
      {/* El <img> queda como fallback accesible; el vídeo es decorativo. */}
      <img src={src} alt={alt} className="block w-full select-none" draggable={false} />
      <video
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{
          WebkitMaskImage: EDGE_MASK,
          maskImage: EDGE_MASK,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={src}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onError={() => setFailed(true)}
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  );
}
