"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BusinessKind } from "@/lib/design-system/art-direction";
import type { CopyDraft, CopyTarget } from "@/lib/copy/types";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { DEMO_COPY_ID } from "@/lib/copy/store";
import { localizedPath } from "@/lib/i18n/paths";

type Labels = SiteMessages["copyAdapt"];

type ContentType = CopyDraft["contentType"];

const PRESET_TARGETS: Record<string, CopyTarget[]> = {
  localAt: [
    { locale: "de", audience: "local" },
    { locale: "en", audience: "tourist" },
    { locale: "es", audience: "tourist" },
  ],
  touristPack: [
    { locale: "en", audience: "tourist" },
    { locale: "es", audience: "tourist" },
    { locale: "de", audience: "tourist" },
  ],
  business: [
    { locale: "de", audience: "business" },
    { locale: "en", audience: "business" },
  ],
};

function targetKey(t: CopyTarget): string {
  return `${t.locale}:${t.audience}`;
}

function audienceLabel(labels: Labels, audience: CopyTarget["audience"]): string {
  if (audience === "local") return labels.audienceLocal;
  if (audience === "tourist") return labels.audienceTourist;
  return labels.audienceBusiness;
}

export function CopyAdaptClient({
  locale,
  labels,
  initialSourceText = "",
  initialContentType = "general",
  initialBusinessKind,
  initialCity,
  conceptId,
  compact = false,
}: {
  locale: Locale;
  labels: Labels;
  initialSourceText?: string;
  initialContentType?: ContentType;
  initialBusinessKind?: string;
  initialCity?: string;
  conceptId?: string;
  compact?: boolean;
}) {
  const [sourceText, setSourceText] = useState(initialSourceText);
  const [sourceLocale, setSourceLocale] = useState<Locale>(locale);
  const [contentType, setContentType] = useState<ContentType>(initialContentType);
  const [city, setCity] = useState(initialCity || "");
  const [targets, setTargets] = useState<CopyTarget[]>(PRESET_TARGETS.localAt);
  const [phase, setPhase] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<CopyDraft | null>(null);
  const [sharePath, setSharePath] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const targetSet = useMemo(() => new Set(targets.map(targetKey)), [targets]);

  function toggleTarget(t: CopyTarget) {
    const key = targetKey(t);
    setTargets((prev) => {
      const has = prev.some((p) => targetKey(p) === key);
      if (has) return prev.filter((p) => targetKey(p) !== key);
      if (prev.length >= 4) return prev;
      return [...prev, t];
    });
  }

  function applyPreset(key: keyof typeof PRESET_TARGETS) {
    setTargets(PRESET_TARGETS[key]);
  }

  async function generate() {
    setError(null);
    setDraft(null);
    setSharePath(null);
    setPhase("generating");

    try {
      const res = await fetch("/api/copy/adapt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceText,
          sourceLocale,
          contentType,
          targets,
          city: city.trim() || undefined,
          businessKind: initialBusinessKind || undefined,
          conceptId,
        }),
      });
      const data = (await res.json()) as {
        draft?: CopyDraft;
        path?: string;
        message?: string;
      };

      if (!res.ok || !data.draft) {
        setPhase("error");
        setError(data.message ?? labels.errorGeneric);
        return;
      }

      setDraft(data.draft);
      setSharePath(data.path ?? null);
      setPhase("done");
    } catch {
      setPhase("error");
      setError(labels.errorGeneric);
    }
  }

  async function copyText(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      /* ignore */
    }
  }

  const busy = phase === "generating";
  const demoPath = localizedPath(locale, `/copy/${DEMO_COPY_ID}`);

  const allTargets: CopyTarget[] = [
    { locale: "de", audience: "local" },
    { locale: "de", audience: "tourist" },
    { locale: "de", audience: "business" },
    { locale: "en", audience: "tourist" },
    { locale: "en", audience: "business" },
    { locale: "es", audience: "local" },
    { locale: "es", audience: "tourist" },
  ];

  return (
    <div className={compact ? "space-y-4" : "space-y-8"}>
      <div className="rounded-[var(--radius)] border border-line bg-surface p-4 shadow-[var(--shadow)] sm:p-6">
        <label className="block text-sm font-medium text-ink">
          {labels.sourceLabel}
        </label>
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          rows={compact ? 4 : 5}
          maxLength={2000}
          placeholder={labels.sourcePlaceholder}
          className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              {labels.sourceLocaleLabel}
            </label>
            <select
              value={sourceLocale}
              onChange={(e) => setSourceLocale(e.target.value as Locale)}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              {labels.contentTypeLabel}
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ContentType)}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="dish">{labels.typeDish}</option>
              <option value="service">{labels.typeService}</option>
              <option value="offer">{labels.typeOffer}</option>
              <option value="general">{labels.typeGeneral}</option>
            </select>
          </div>
        </div>

        {!compact ? (
          <div className="mt-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              {labels.cityLabel}
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={labels.cityPlaceholder}
              maxLength={80}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            />
          </div>
        ) : null}

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {labels.presetsLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyPreset("localAt")}
              className="rounded-full border border-line px-3 py-1 text-xs hover:border-accent"
            >
              {labels.presetLocalAt}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("touristPack")}
              className="rounded-full border border-line px-3 py-1 text-xs hover:border-accent"
            >
              {labels.presetTourist}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("business")}
              className="rounded-full border border-line px-3 py-1 text-xs hover:border-accent"
            >
              {labels.presetBusiness}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {labels.targetsLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {allTargets.map((t) => {
              const key = targetKey(t);
              const active = targetSet.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleTarget(t)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? "border-accent bg-accent-soft text-ink"
                      : "border-line text-muted hover:border-accent/50"
                  }`}
                >
                  {t.locale.toUpperCase()} · {audienceLabel(labels, t.audience)}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => void generate()}
          disabled={busy || sourceText.trim().length < 10 || targets.length === 0}
          className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white disabled:opacity-50 sm:w-auto"
        >
          {busy ? labels.generating : labels.generate}
        </button>

        {error ? <p className="mt-3 text-sm text-accent-hot">{error}</p> : null}
        <p className="mt-3 text-xs text-muted">{labels.disclaimer}</p>
      </div>

      {!compact ? (
        <p className="text-sm text-muted">
          <Link href={demoPath} className="text-ink underline underline-offset-4">
            {labels.demoLinkLabel}
          </Link>
        </p>
      ) : null}

      {draft && phase === "done" ? (
        <div className="space-y-4">
          {sharePath ? (
            <p className="text-sm text-accent">
              {labels.shareLabel}:{" "}
              <Link href={sharePath} className="underline underline-offset-4">
                {sharePath}
              </Link>
            </p>
          ) : null}
          {draft.variants.map((v) => {
            const key = targetKey(v);
            return (
              <div
                key={key}
                className="rounded-[var(--radius)] border border-line bg-surface p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-accent">
                    {v.locale.toUpperCase()} · {audienceLabel(labels, v.audience)}
                  </p>
                  <button
                    type="button"
                    onClick={() => void copyText(key, v.text)}
                    className="text-xs font-medium text-ink underline underline-offset-2"
                  >
                    {copiedKey === key ? labels.copied : labels.copy}
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">{v.text}</p>
                <p className="mt-2 text-xs text-muted">{v.toneNote}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
