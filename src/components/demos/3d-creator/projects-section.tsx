"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "./fade-in";
import { LiveProjectButton } from "./live-project-button";
import type { Creator3dContent, Creator3dProject } from "@/lib/demos/3d-creator";

function ProjectCard({
  project,
  index,
  total,
  openLabel,
}: {
  project: Creator3dProject;
  index: number;
  total: number;
  openLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.article
        className="sticky origin-top rounded-[28px] border border-white/10 bg-[#141414] p-5 shadow-2xl sm:p-7 md:p-10"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span
              className="font-black leading-none text-[#D7E2EA]/40"
              style={{ fontSize: "clamp(2rem, 5vw, 64px)" }}
            >
              {project.number}
            </span>
            <h3
              className="font-semibold uppercase leading-none tracking-tight text-[#D7E2EA]"
              style={{ fontSize: "clamp(1.4rem, 3.4vw, 44px)" }}
            >
              {project.name}
            </h3>
          </div>
          <span className="rounded-full border border-[#D7E2EA]/40 px-4 py-1 text-xs uppercase tracking-widest text-[#D7E2EA]/80">
            {project.category}
          </span>
        </header>

        <p
          className="mt-4 max-w-[70ch] font-light leading-relaxed text-[#D7E2EA]/70"
          style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.2rem)" }}
        >
          {project.blurb}
        </p>

        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-[2fr_3fr] md:gap-4">
          <div className="grid gap-3 md:gap-4">
            <img
              src={project.images.col1Top}
              alt={`${project.name} — móvil`}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-white/10 object-cover object-top"
              style={{ height: "clamp(120px, 18vw, 240px)" }}
            />
            <img
              src={project.images.col1Bottom}
              alt={`${project.name} — detalle`}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-white/10 object-cover object-top"
              style={{ height: "clamp(120px, 18vw, 240px)" }}
            />
          </div>
          <img
            src={project.images.col2}
            alt={`${project.name} — desktop`}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl border border-white/10 object-cover object-top"
            style={{ height: "clamp(260px, 37vw, 500px)" }}
          />
        </div>

        <footer className="mt-6 flex justify-end md:mt-8">
          <LiveProjectButton href={project.href} label={openLabel} />
        </footer>
      </motion.article>
    </div>
  );
}

export function ProjectsSection({ content }: { content: Creator3dContent }) {
  const items = content.projects.items;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-40 md:pt-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <h2
            className="font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
            style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
          >
            {content.projects.title}
          </h2>
        </FadeIn>

        <div className="mt-12 md:mt-20">
          {items.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={items.length}
              openLabel={content.projects.openLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
