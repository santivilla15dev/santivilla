"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-0" aria-hidden>
        {char}
      </span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const total = text.length;
  const starts = words.reduce<number[]>((acc, word, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + words[i - 1].length + 1);
    return acc;
  }, []);

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => {
        const start = starts[wi];
        return (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {[...word].map((char, ci) => {
              const index = start + ci;
              return (
                <Char
                  key={`${index}-${char}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[index / total, Math.min(1, (index + 1) / total)]}
                />
              );
            })}
            {wi < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        );
      })}
    </p>
  );
}
