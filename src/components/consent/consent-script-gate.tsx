"use client";

import type { ReactNode } from "react";
import { useConsent } from "@/components/consent/consent-provider";
import type { ConsentCategory } from "@/lib/consent/types";

/**
 * Renders children only after the user opted into the given category.
 * Use for future analytics / marketing scripts — none in v1.
 */
export function ConsentScriptGate({
  category,
  children,
}: {
  category: Exclude<ConsentCategory, "necessary">;
  children: ReactNode;
}) {
  const { ready, decided, consent } = useConsent();
  if (!ready || !decided) return null;
  if (category === "analytics" && !consent.analytics) return null;
  if (category === "marketing" && !consent.marketing) return null;
  return <>{children}</>;
}
