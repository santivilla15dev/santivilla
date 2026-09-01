"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { readConsentFromDocument, writeConsent } from "@/lib/consent/storage";
import {
  consentAll,
  defaultConsentDenied,
  type ConsentState,
} from "@/lib/consent/types";
import type { Locale } from "@/lib/i18n/locales";

export type ConsentLabels = {
  title: string;
  body: string;
  acceptAll: string;
  rejectNonEssential: string;
  customize: string;
  save: string;
  necessaryLabel: string;
  necessaryHint: string;
  analyticsLabel: string;
  analyticsHint: string;
  marketingLabel: string;
  marketingHint: string;
  privacyLink: string;
  closeCustomize: string;
};

type ConsentContextValue = {
  locale: Locale;
  labels: ConsentLabels;
  privacyHref: string;
  ready: boolean;
  decided: boolean;
  preferencesOpen: boolean;
  consent: ConsentState;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustom: (next: Pick<ConsentState, "analytics" | "marketing">) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

// La cookie solo se lee al montar; persist() actualiza vía `override`, así que
// no hace falta suscripción real.
const noopSubscribe = () => () => {};

export function ConsentProvider({
  locale,
  labels,
  privacyHref,
  children,
}: {
  locale: Locale;
  labels: ConsentLabels;
  privacyHref: string;
  children: ReactNode;
}) {
  // Hidratación desde cookie sin setState en efectos: el snapshot de servidor
  // (false / null) hace que el primer render cliente coincida con el HTML.
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const stored = useSyncExternalStore(
    noopSubscribe,
    readConsentFromDocument,
    () => null,
  );
  const [override, setOverride] = useState<ConsentState | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const fallback = useMemo(() => defaultConsentDenied(), []);

  const consent = override ?? stored ?? fallback;
  const decided = override !== null || stored !== null;

  const persist = useCallback((next: ConsentState) => {
    writeConsent(next);
    setOverride(next);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist(consentAll());
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(defaultConsentDenied());
  }, [persist]);

  const saveCustom = useCallback(
    (next: Pick<ConsentState, "analytics" | "marketing">) => {
      persist({
        ...defaultConsentDenied(),
        analytics: next.analytics,
        marketing: next.marketing,
        ts: new Date().toISOString(),
      });
    },
    [persist],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      locale,
      labels,
      privacyHref,
      ready,
      decided,
      preferencesOpen,
      consent,
      acceptAll,
      rejectNonEssential,
      saveCustom,
      openSettings: () => setPreferencesOpen(true),
      closeSettings: () => setPreferencesOpen(false),
    }),
    [
      locale,
      labels,
      privacyHref,
      ready,
      decided,
      preferencesOpen,
      consent,
      acceptAll,
      rejectNonEssential,
      saveCustom,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
