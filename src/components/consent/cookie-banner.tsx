"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useConsent } from "@/components/consent/consent-provider";

export function CookieBanner() {
  const {
    ready,
    decided,
    preferencesOpen,
    consent,
    labels,
    privacyHref,
    acceptAll,
    rejectNonEssential,
    saveCustom,
    openSettings,
    closeSettings,
  } = useConsent();

  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  // Re-sincroniza los checkboxes cuando cambia el consentimiento o se abre el
  // panel — ajuste durante el render en lugar de setState en useEffect.
  const [prevSync, setPrevSync] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
    open: preferencesOpen,
  });
  if (
    prevSync.analytics !== consent.analytics ||
    prevSync.marketing !== consent.marketing ||
    prevSync.open !== preferencesOpen
  ) {
    setPrevSync({
      analytics: consent.analytics,
      marketing: consent.marketing,
      open: preferencesOpen,
    });
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
  }

  if (!ready) return null;
  if (decided && !preferencesOpen) return null;

  const showPanel = preferencesOpen || !decided;

  if (!showPanel) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-modal="false"
    >
      <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
        {!preferencesOpen ? (
          <>
            <h2
              id="cookie-consent-title"
              className="text-base font-medium text-ink sm:text-lg"
            >
              {labels.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {labels.body}{" "}
              <a
                href={privacyHref}
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {labels.privacyLink}
              </a>
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                onClick={acceptAll}
                className="h-auto rounded-full bg-[var(--accent-hot)] px-5 py-2.5 text-sm text-white hover:brightness-110"
              >
                {labels.acceptAll}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={rejectNonEssential}
                className="h-auto rounded-full border-ink/20 bg-surface px-5 py-2.5 text-sm text-ink hover:border-accent hover:bg-accent-soft hover:text-ink"
              >
                {labels.rejectNonEssential}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={openSettings}
                className="h-auto px-3 py-2.5 text-sm text-muted underline-offset-4 hover:bg-transparent hover:text-ink hover:underline"
              >
                {labels.customize}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2
                id="cookie-consent-title"
                className="text-base font-medium text-ink sm:text-lg"
              >
                {labels.customize}
              </h2>
              {decided ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={closeSettings}
                  className="h-auto px-2 py-1 text-sm text-muted hover:bg-transparent hover:text-ink"
                >
                  {labels.closeCustomize}
                </Button>
              ) : null}
            </div>
            <ul className="mt-5 space-y-4">
              <li className="rounded-xl border border-line bg-surface-2/60 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked
                    disabled
                    className="mt-1"
                    aria-label={labels.necessaryLabel}
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {labels.necessaryLabel}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {labels.necessaryHint}
                    </span>
                  </span>
                </div>
              </li>
              <li className="rounded-xl border border-line p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent-analytics"
                    checked={analytics}
                    onCheckedChange={(checked) => setAnalytics(checked === true)}
                    className="mt-1"
                  />
                  <span>
                    <Label
                      htmlFor="consent-analytics"
                      className="block text-sm font-medium text-ink"
                    >
                      {labels.analyticsLabel}
                    </Label>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {labels.analyticsHint}
                    </span>
                  </span>
                </div>
              </li>
              <li className="rounded-xl border border-line p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent-marketing"
                    checked={marketing}
                    onCheckedChange={(checked) => setMarketing(checked === true)}
                    className="mt-1"
                  />
                  <span>
                    <Label
                      htmlFor="consent-marketing"
                      className="block text-sm font-medium text-ink"
                    >
                      {labels.marketingLabel}
                    </Label>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {labels.marketingHint}
                    </span>
                  </span>
                </div>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => saveCustom({ analytics, marketing })}
                className="h-auto rounded-full bg-[var(--accent-hot)] px-5 py-2.5 text-sm text-white hover:brightness-110"
              >
                {labels.save}
              </Button>
              {!decided ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={closeSettings}
                  className="h-auto px-3 py-2.5 text-sm text-muted underline-offset-4 hover:bg-transparent hover:text-ink hover:underline"
                >
                  {labels.closeCustomize}
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
