import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { AboutSection } from "@/components/demos/3d-creator/about-section";
import { HeroSection } from "@/components/demos/3d-creator/hero-section";
import { MarqueeSection } from "@/components/demos/3d-creator/marquee-section";
import { ProjectsSection } from "@/components/demos/3d-creator/projects-section";
import { ServicesSection } from "@/components/demos/3d-creator/services-section";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santi Villa — 3D Creator",
  description:
    "Demo de landing para portfolio creativo 3D: hero con gradiente, marquee por scroll, texto animado y proyectos apilados. Concepto, no un sitio oficial.",
  robots: { index: false, follow: false },
};

// Retrato propio opcional: si existe public/demos/3d-creator/portrait.png
// (PNG con fondo transparente) sustituye al render 3D de la spec.
const LOCAL_PORTRAIT = "/demos/3d-creator/portrait.png";

export default function Creator3dDemoPage() {
  const hasLocalPortrait = existsSync(
    join(process.cwd(), "public", LOCAL_PORTRAIT),
  );

  return (
    <main
      className={`demo-3d ${kanit.variable} min-h-screen bg-[#0C0C0C] text-[#D7E2EA] [overflow-x:clip]`}
    >
      <HeroSection portraitSrc={hasLocalPortrait ? LOCAL_PORTRAIT : undefined} />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
