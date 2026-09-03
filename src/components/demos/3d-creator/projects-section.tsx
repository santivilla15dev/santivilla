"use client";

import { useSyncExternalStore } from "react";
import { FadeIn } from "./fade-in";
import { LiveProjectButton } from "./live-project-button";
import { ProjectLivePreview } from "./project-live-preview";
import type { Creator3dContent, Creator3dProject } from "@/lib/demos/3d-creator";

// Sticky apilado solo en desktop (sin transform/scale: rompe iframes en Safari).
const STACK_QUERY = "(min-width: 768px)";

function subscribeStack(onChange: () => void) {
  const mq = window.matchMedia(STACK_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useStackEnabled(): boolean {
  return useSyncExternalStore(
    subscribeStack,
    () => window.matchMedia(STACK_QUERY).matches,
    () => false,
  );
}

function ProjectCard({
  project,
  index,
  openLabel,
  scrollHint,
}: {
  project: Creator3dProject;
  index: number;
  openLabel: string;
  scrollHint: string;
}) {
  const stack = useStackEnabled();

  return (
    <div className="mb-6 md:mb-8 md:min-h-[70vh]">
      <article
        className="rounded-[28px] border border-white/10 bg-[#141414] p-5 shadow-2xl sm:p-7 md:p-10"
        style={
          stack
            ? { position: "sticky", top: `calc(6rem + ${index * 20}px)` }
            : undefined
        }
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

        <div className="mt-6 md:mt-8">
          <ProjectLivePreview
            href={project.href}
            fallbackSrc={project.images.col2}
            alt={`${project.name} — preview`}
            scrollHint={scrollHint}
          />
        </div>

        <footer className="mt-6 flex justify-end md:mt-8">
          <LiveProjectButton href={project.href} label={openLabel} />
        </footer>
      </article>
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
              openLabel={content.projects.openLabel}
              scrollHint={content.projects.scrollHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
