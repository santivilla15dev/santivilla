import { readConsentFromDocument } from "./storage";
import type { ConsentCategory } from "./types";

/** Client-only: whether a non-essential category may load. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const state = readConsentFromDocument();
  if (!state) return false;
  if (category === "analytics") return state.analytics;
  if (category === "marketing") return state.marketing;
  return false;
}
