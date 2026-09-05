"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  kellerlichtBody,
  kellerlichtDisplay,
  kellerlichtMono,
} from "./font";
import "./kellerlicht.css";

const CREAM =
  "radial-gradient(1200px 600px at 10% -10%, rgba(212, 160, 90, 0.12), transparent 55%), radial-gradient(900px 500px at 100% 0%, rgba(122, 46, 58, 0.08), transparent 50%), linear-gradient(180deg, #e6dbcf 0%, #f2e8dc 28%, #e4d9cc 100%)";

/** Shell de página: crema siempre (hero oscuro va en su sticky). */
export function KellerlichtShell({ children }: { children: ReactNode }) {
  const preview = useSearchParams().get("preview") === "1";

  useEffect(() => {
    if (!preview) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.cssText;
    const prevBody = body.style.cssText;
    html.style.background = "#e6dbcf";
    body.style.margin = "0";
    body.style.background = "#e6dbcf";
    return () => {
      html.style.cssText = prevHtml;
      body.style.cssText = prevBody;
    };
  }, [preview]);

  return (
    <div
      className={`${kellerlichtDisplay.variable} ${kellerlichtBody.variable} ${kellerlichtMono.variable} relative min-h-svh leading-relaxed antialiased`}
      style={{
        fontFamily: "var(--font-kellerlicht-body), system-ui, sans-serif",
        color: "#2a211c",
        background: CREAM,
      }}
    >
      {children}
    </div>
  );
}
