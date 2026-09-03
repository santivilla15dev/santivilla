"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type ProjectThumbProps = {
  src: string;
  alt: string;
  /** Índice dentro de la tarjeta (0, 1, 2) → delay de entrada. */
  index: number;
  className?: string;
  objectPosition?: "object-top" | "object-center";
};

export function ProjectThumb({
  src,
  alt,
  index,
  className = "",
  objectPosition = "object-top",
}: ProjectThumbProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`group overflow-hidden rounded-2xl border border-white/10 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: EASE,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${objectPosition} ${
          reduce
            ? ""
            : "transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        }`}
      />
    </motion.div>
  );
}
