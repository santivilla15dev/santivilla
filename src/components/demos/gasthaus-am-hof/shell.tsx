"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  gasthausBody,
  gasthausDisplay,
  gasthausMono,
} from "./font";

const CREAM =
  "radial-gradient(1200px 600px at 10% -10%, rgba(196, 137, 58, 0.12), transparent 55%), radial-gradient(900px 500px at 100% 0%, rgba(107, 44, 44, 0.08), transparent 50%), linear-gradient(180deg, #e8dfd0 0%, #f3ebe0 28%, #e6dccb 100%)";

/** Shell de página: crema siempre (hero oscuro va en su sticky). */
export function GasthausShell({ children }: { children: ReactNode }) {
  const preview = useSearchParams().get("preview") === "1";

  useEffect(() => {
    if (!preview) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.cssText;
    const prevBody = body.style.cssText;
    html.style.background = "#e8dfd0";
    body.style.margin = "0";
    body.style.background = "#e8dfd0";
    return () => {
      html.style.cssText = prevHtml;
      body.style.cssText = prevBody;
    };
  }, [preview]);

  return (
    <div
      className={`${gasthausDisplay.variable} ${gasthausBody.variable} ${gasthausMono.variable} relative min-h-svh antialiased`}
      style={{
        fontFamily: "var(--font-gasthaus-body), system-ui, sans-serif",
        color: "#2a211c",
        background: CREAM,
      }}
    >
      {children}
    </div>
  );
}
