"use client";

/* eslint-disable @next/next/no-img-element */

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { creator3dMarquee } from "@/lib/demos/3d-creator";

const ROW_1 = creator3dMarquee.slice(0, 11);
const ROW_2 = creator3dMarquee.slice(11);

function tripled<T>(items: readonly T[]): T[] {
  return [...items, ...items, ...items];
}

function Row({
  images,
  transform,
  label,
}: {
  images: readonly string[];
  transform: string;
  label: string;
}) {
  return (
    <div
      className="flex gap-3"
      style={{ transform, willChange: "transform" }}
      aria-label={label}
    >
      {tripled(images).map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          width={420}
          height={270}
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

export function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;

    function update() {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      aria-label="Selección de trabajos en movimiento"
    >
      <Row
        images={ROW_1}
        transform={`translateX(${offset - 200}px)`}
        label="Fila 1"
      />
      <Row
        images={ROW_2}
        transform={`translateX(${-(offset - 200)}px)`}
        label="Fila 2"
      />
    </section>
  );
}
