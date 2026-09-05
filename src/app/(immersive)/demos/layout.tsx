import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/locales";
import { DemoBanner } from "./demo-banner";

export const metadata: Metadata = {
  title: "Demos",
};

const BANNER: Record<
  Locale,
  { badge: string; notice: string; back: string }
> = {
  de: {
    badge: "Konzept",
    notice: "Portfolio-Demo · Santi Villa · keine offizielle Seite",
    back: "Projekte",
  },
  en: {
    badge: "Concept",
    notice: "Portfolio demo · Santi Villa · not an official site",
    back: "Projects",
  },
  es: {
    badge: "Konzept",
    notice: "Demo de portfolio · Santi Villa · no es una página oficial",
    back: "Proyectos",
  },
};

export default async function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = fromCookie && isLocale(fromCookie) ? fromCookie : defaultLocale;
  const { badge, notice, back } = BANNER[locale];

  return (
    <div className="demo-immersive flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <DemoBanner
          locale={locale}
          badge={badge}
          notice={notice}
          back={back}
        />
      </Suspense>
      {children}
    </div>
  );
}
