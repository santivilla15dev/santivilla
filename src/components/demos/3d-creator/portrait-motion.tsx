"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type PortraitMotionProps = {
  children: ReactNode;
  className?: string;
  /** Retraso de la entrada (scale + blur), alineado con el FadeIn exterior. */
  delay?: number;
  /** Radio extra (px) alrededor del elemento en el que el ratón inclina la cabeza. */
  padding?: number;
  /** Inclinación máxima en grados. */
  maxTilt?: { x: number; y: number };
};

// Tres capas de transform independientes para que no se pisen:
// parallax de scroll (fuera) > flotación + entrada (medio) > inclinación 3D (dentro).
export function PortraitMotion({
  children,
  className,
  delay = 0.6,
  padding = 150,
  maxTilt = { x: 7, y: 9 },
}: PortraitMotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 140]);
  const parallaxOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce) return;

    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const halfW = rect.width / 2 + padding;
      const halfH = rect.height / 2 + padding;
      const nx = (e.clientX - (rect.left + rect.width / 2)) / halfW;
      const ny = (e.clientY - (rect.top + rect.height / 2)) / halfH;

      if (Math.abs(nx) < 1 && Math.abs(ny) < 1) {
        tiltY.set(nx * maxTilt.y);
        tiltX.set(-ny * maxTilt.x);
      } else {
        tiltY.set(0);
        tiltX.set(0);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, maxTilt.x, maxTilt.y, reduce, tiltX, tiltY]);

  // Misma estructura con y sin reduced-motion (evita desajustes de hidratación);
  // solo cambian los valores animados.
  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        reduce
          ? { perspective: 1000 }
          : { y: parallaxY, opacity: parallaxOpacity, perspective: 1000 }
      }
    >
      <motion.div
        initial={reduce ? false : { scale: 0.92, filter: "blur(8px)" }}
        animate={reduce ? undefined : { scale: 1, filter: "blur(0px)", y: [0, -10, 0] }}
        transition={{
          scale: { delay, duration: 0.9, ease: EASE },
          filter: { delay, duration: 0.9, ease: EASE },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={
          reduce
            ? { transformStyle: "preserve-3d", scale: 1, filter: "none" }
            : { transformStyle: "preserve-3d" }
        }
      >
        <motion.div
          style={reduce ? undefined : { rotateX, rotateY, willChange: "transform" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
