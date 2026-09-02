import type { Metadata } from "next";
import { NovaaiLanding } from "@/components/demos/novaai/landing";
import { novaaiCopy } from "@/lib/demos/novaai";

export const metadata: Metadata = {
  title: novaaiCopy.title,
  description:
    "Concept demo — NovaAI cinematic landing with scroll-scrubbed video. Not a real product.",
  robots: { index: false, follow: false },
};

export default function NovaaiDemoPage() {
  return <NovaaiLanding />;
}
