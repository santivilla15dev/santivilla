"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightCircle, Fingerprint, LockKeyhole, Zap } from "lucide-react";
import { vaultshieldTheme, type VaultshieldContent } from "@/lib/demos/vaultshield";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};

const ICON = {
  size: 24,
  color: vaultshieldTheme.text,
  strokeWidth: 2.25,
  "aria-hidden": true as const,
  className: "relative -top-0.5 inline-block align-middle",
};

export function VaultshieldHero({ content }: { content: VaultshieldContent }) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";
  const [part1, part2] = content.heading;

  return (
    <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8" style={{ paddingTop: "clamp(40px, 8vw, 72px)" }}>
      <div style={{ maxWidth: 560 }}>
        <motion.h1
          variants={fadeUp}
          custom={0}
          initial={initial}
          animate="visible"
          className="font-[family-name:var(--font-vs-heading)]"
          style={{
            fontSize: "clamp(1.65rem, 5vw, 3rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: vaultshieldTheme.text,
            marginBottom: 24,
          }}
        >
          <Zap {...ICON} /> {part1} <LockKeyhole {...ICON} /> {part2}{" "}
          <Fingerprint {...ICON} />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={1}
          initial={initial}
          animate="visible"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            lineHeight: 1.65,
            opacity: 0.8,
            maxWidth: 560,
          }}
        >
          {content.subtext}
        </motion.p>

        <motion.a
          href="#plans"
          variants={fadeUp}
          custom={2}
          initial={initial}
          animate="visible"
          whileHover={reduce ? undefined : { scale: 1.04, filter: "brightness(1.1)" }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          className="mt-8 inline-flex items-center justify-between font-semibold text-white"
          style={{
            background: vaultshieldTheme.accent,
            borderRadius: 50,
            padding: "17px 24px",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            boxShadow: "0 4px 24px rgba(115,66,226,0.28)",
            minWidth: 210,
            gap: 32,
          }}
        >
          <span>{content.cta}</span>
          <ArrowRightCircle size={20} aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  );
}
