"use client";

import { CafeScrollHero } from "./cafe-scroll-hero";
import type { Creator3dContent } from "@/lib/demos/3d-creator";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Hero del home: scroll-scrub del vídeo cafetería (desktop + móvil).
 */
export function HeroSection({
  content,
  langHrefs,
}: {
  content: Creator3dContent;
  langHrefs: Record<Locale, string>;
}) {
  return <CafeScrollHero content={content} langHrefs={langHrefs} />;
}
