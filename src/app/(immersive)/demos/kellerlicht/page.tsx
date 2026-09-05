import type { Metadata } from "next";
import { Suspense } from "react";
import { KellerlichtLanding } from "@/components/demos/kellerlicht/landing";
import { KellerlichtChrome } from "@/components/demos/kellerlicht/chrome";
import { KellerlichtShell } from "@/components/demos/kellerlicht/shell";
import { kellerlichtCopy } from "@/lib/demos/kellerlicht";

export const metadata: Metadata = {
  title: kellerlichtCopy.title,
  description:
    "Konzept-Demo: Kellerlicht Weinbar mit scroll-gesteuertem Hero-Video, Am Glas und Tischreservierung.",
  robots: { index: false, follow: false },
};

export default function KellerlichtDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="relative h-full min-h-[14rem] bg-[#1c1412]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/kellerlicht/hero-poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      }
    >
      <KellerlichtShell>
        <KellerlichtLanding />
        <KellerlichtChrome />
      </KellerlichtShell>
    </Suspense>
  );
}
