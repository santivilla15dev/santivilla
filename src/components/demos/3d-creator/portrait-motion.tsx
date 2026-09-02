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
  /** Giro máximo de la cabeza en grados (x = arriba/abajo, y = izquierda/derecha). */
  maxTilt?: { x: number; y: number };
  /** Desplazamiento máximo (px) de la cabeza hacia el cursor. */
  maxShift?: number;
};

const SPRING = { stiffness: 90, damping: 20, mass: 0.6 };

// Tres capas de transform independientes para que no se pisen:
// parallax de scroll (fuera) > flotación + entrada (medio) > mirada al cursor (dentro).
export function PortraitMotion({
  children,
  className,
  delay = 0.6,
  maxTilt = { x: 8, y: 12 },
  maxShift = 14,
}: PortraitMotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 140]);
  const parallaxOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Posición del cursor normalizada a [-1, 1] respecto al centro de la cabeza,
  // escalada al tamaño de la ventana: la cabeza "mira" al cursor esté donde esté.
  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const smoothX = useSpring(lookX, SPRING);
  const smoothY = useSpring(lookY, SPRING);
  const rotateY = useTransform(smoothX, (v) => v * maxTilt.y);
  const rotateX = useTransform(smoothY, (v) => -v * maxTilt.x);
  const shiftX = useTransform(smoothX, (v) => v * maxShift);
  const shiftY = useTransform(smoothY, (v) => v * maxShift * 0.6);

  useEffect(() => {
    if (reduce) return;

    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Distancia máxima posible desde el centro hasta el borde de la ventana.
      const reachX = Math.max(cx, window.innerWidth - cx) || 1;
      const reachY = Math.max(cy, window.innerHeight - cy) || 1;
      lookX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / reachX)));
      lookY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / reachY)));
    }

    function onLeave() {
      lookX.set(0);
      lookY.set(0);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, lookX, lookY]);

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
        animate={reduce ? undefined : { scale: 1, filter: "blur(0px)", y: [0, -6, 0] }}
        transition={{
          scale: { delay, duration: 0.9, ease: EASE },
          filter: { delay, duration: 0.9, ease: EASE },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={
          reduce
            ? { transformStyle: "preserve-3d", scale: 1, filter: "none" }
            : { transformStyle: "preserve-3d" }
        }
      >
        <motion.div
          style={
            reduce
              ? undefined
              : { rotateX, rotateY, x: shiftX, y: shiftY, willChange: "transform" }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
