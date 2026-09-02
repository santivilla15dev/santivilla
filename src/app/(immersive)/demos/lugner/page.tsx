import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "NOVA_AI — Today AI Aligns With Bold Dreams",
  robots: { index: false, follow: false },
};

/** La demo Lugner City se sustituye por NovaAI. */
export default function LugnerRedirectPage() {
  redirect("/demos/novaai");
}
