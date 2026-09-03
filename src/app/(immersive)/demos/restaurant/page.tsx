import type { Metadata } from "next";
import { Suspense } from "react";
import { GasthausLanding } from "@/components/demos/gasthaus-am-hof/landing";
import { GasthausChrome } from "@/components/demos/gasthaus-am-hof/chrome";
import { GasthausShell } from "@/components/demos/gasthaus-am-hof/shell";
import { gasthausCopy } from "@/lib/demos/gasthaus-am-hof";

export const metadata: Metadata = {
  title: gasthausCopy.title,
  description:
    "Konzept-Demo: Gasthaus Am Hof mit scroll-gesteuertem Hero-Video, Speisekarte und Reservierung.",
  robots: { index: false, follow: false },
};

export default function RestaurantDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="relative h-full min-h-[14rem] bg-[#1a120e]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/restaurant/hero-poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      }
    >
      <GasthausShell>
        <GasthausLanding />
        <GasthausChrome />
      </GasthausShell>
    </Suspense>
  );
}
