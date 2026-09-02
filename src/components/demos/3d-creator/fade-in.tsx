"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: "div" | "p" | "h1" | "h2" | "span" | "li" | "nav";
};

const ELEMENTS = {
  div: motion.create("div"),
  p: motion.create("p"),
  h1: motion.create("h1"),
  h2: motion.create("h2"),
  span: motion.create("span"),
  li: motion.create("li"),
  nav: motion.create("nav"),
};

export function FadeIn({
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
}: FadeInProps) {
  const reduce = useReducedMotion();
  const Element = ELEMENTS[as];

  return (
    <Element
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </Element>
  );
}
