import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { cookies, headers } from "next/headers";
import { AboutSection } from "@/components/demos/3d-creator/about-section";
import { HeroSection } from "@/components/demos/3d-creator/hero-section";
import { MarqueeSection } from "@/components/demos/3d-creator/marquee-section";
import { ProjectsSection } from "@/components/demos/3d-creator/projects-section";
import { ServicesSection } from "@/components/demos/3d-creator/services-section";
import { getCreator3dContent } from "@/lib/demos/3d-creator";
import { isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/locales";
import { negotiateLocale } from "@/lib/i18n/negotiate";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santi Villa — 3D Creator",
  description:
    "Landing oscura con mis servicios, precios y demos reales — webs para negocios locales en Wien. Disponible en DE / EN / ES.",
  robots: { index: false, follow: false },
};

// Retrato propio: si existe public/demos/3d-creator/portrait.webp
// (recorte con fondo transparente) sustituye al render 3D de la spec.
const LOCAL_PORTRAIT = "/demos/3d-creator/portrait.webp";

// Prioridad: ?lang= explícito > cookie del portfolio > Accept-Language.
async function resolveLocale(langParam: string | undefined): Promise<Locale> {
  if (langParam && isLocale(langParam)) return langParam;
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;
  return negotiateLocale((await headers()).get("accept-language"));
}

export default async function Creator3dDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = await resolveLocale(lang);
  const content = getCreator3dContent(locale);
  const hasLocalPortrait = existsSync(
    join(process.cwd(), "public", LOCAL_PORTRAIT),
  );

  return (
    <main
      lang={locale}
      className={`demo-3d ${kanit.variable} min-h-screen bg-[#0C0C0C] text-[#D7E2EA] [overflow-x:clip]`}
    >
      <HeroSection
        content={content}
        portraitSrc={hasLocalPortrait ? LOCAL_PORTRAIT : undefined}
      />
      <MarqueeSection />
      <AboutSection content={content} />
      <ServicesSection content={content} />
      <ProjectsSection content={content} />
    </main>
  );
}
