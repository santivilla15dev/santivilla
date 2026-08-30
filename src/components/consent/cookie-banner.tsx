"use client";

import { useEffect, useState } from "react";
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

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
  }, [consent.analytics, consent.marketing, preferencesOpen]);

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
      <div className="mx-auto max-w-3xl rounded-[var(--radius)] border border-line bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
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
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-hot)] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
              >
                {labels.acceptAll}
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-surface px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent-soft"
              >
                {labels.rejectNonEssential}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                {labels.customize}
              </button>
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
                <button
                  type="button"
                  onClick={closeSettings}
                  className="text-sm text-muted hover:text-ink"
                >
                  {labels.closeCustomize}
                </button>
              ) : null}
            </div>
            <ul className="mt-5 space-y-4">
              <li className="rounded-xl border border-line bg-surface-2/60 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
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
                </label>
              </li>
              <li className="rounded-xl border border-line p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {labels.analyticsLabel}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {labels.analyticsHint}
                    </span>
                  </span>
                </label>
              </li>
              <li className="rounded-xl border border-line p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {labels.marketingLabel}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {labels.marketingHint}
                    </span>
                  </span>
                </label>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => saveCustom({ analytics, marketing })}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-hot)] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
              >
                {labels.save}
              </button>
              {!decided ? (
                <button
                  type="button"
                  onClick={closeSettings}
                  className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {labels.closeCustomize}
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
