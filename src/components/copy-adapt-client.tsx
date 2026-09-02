"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DEMO_COPY_ID, type CopyDraft, type CopyTarget } from "@/lib/copy/types";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
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

function audienceLabel(
  labels: Labels,
  audience: CopyTarget["audience"],
): string {
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
  const [contentType, setContentType] =
    useState<ContentType>(initialContentType);
  const [city, setCity] = useState(initialCity || "");
  const [targets, setTargets] = useState<CopyTarget[]>(PRESET_TARGETS.localAt);
  const [phase, setPhase] = useState<"idle" | "generating" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<CopyDraft | null>(null);
  const [sharePath, setSharePath] = useState<string | null>(null);

  const targetKeys = useMemo(() => targets.map(targetKey), [targets]);

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

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(labels.copied);
    } catch {
      /* portapapeles no disponible */
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
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-[var(--shadow)] sm:p-6">
        <Label htmlFor="copy-source" className="text-sm font-medium text-ink">
          {labels.sourceLabel}
        </Label>
        <Textarea
          id="copy-source"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          rows={compact ? 4 : 5}
          maxLength={2000}
          placeholder={labels.sourcePlaceholder}
          className="mt-2 rounded-lg border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label
              htmlFor="copy-source-locale"
              className="text-xs font-medium uppercase tracking-wide text-muted"
            >
              {labels.sourceLocaleLabel}
            </Label>
            <Select
              value={sourceLocale}
              onValueChange={(v) => setSourceLocale(v as Locale)}
            >
              <SelectTrigger
                id="copy-source-locale"
                className="mt-1 h-auto w-full rounded-lg border-line bg-surface px-3 py-2 text-sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="copy-content-type"
              className="text-xs font-medium uppercase tracking-wide text-muted"
            >
              {labels.contentTypeLabel}
            </Label>
            <Select
              value={contentType}
              onValueChange={(v) => setContentType(v as ContentType)}
            >
              <SelectTrigger
                id="copy-content-type"
                className="mt-1 h-auto w-full rounded-lg border-line bg-surface px-3 py-2 text-sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dish">{labels.typeDish}</SelectItem>
                <SelectItem value="service">{labels.typeService}</SelectItem>
                <SelectItem value="offer">{labels.typeOffer}</SelectItem>
                <SelectItem value="general">{labels.typeGeneral}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!compact ? (
          <div className="mt-4">
            <Label
              htmlFor="copy-city"
              className="text-xs font-medium uppercase tracking-wide text-muted"
            >
              {labels.cityLabel}
            </Label>
            <Input
              id="copy-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={labels.cityPlaceholder}
              maxLength={80}
              className="mt-1 h-auto rounded-lg border-line bg-surface px-3 py-2 text-sm"
            />
          </div>
        ) : null}

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {labels.presetsLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyPreset("localAt")}
              className="h-auto rounded-full border-line bg-transparent px-3 py-1 text-xs hover:border-accent hover:bg-transparent"
            >
              {labels.presetLocalAt}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyPreset("touristPack")}
              className="h-auto rounded-full border-line bg-transparent px-3 py-1 text-xs hover:border-accent hover:bg-transparent"
            >
              {labels.presetTourist}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyPreset("business")}
              className="h-auto rounded-full border-line bg-transparent px-3 py-1 text-xs hover:border-accent hover:bg-transparent"
            >
              {labels.presetBusiness}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {labels.targetsLabel}
          </p>
          <ToggleGroup
            type="multiple"
            value={targetKeys}
            onValueChange={(keys) => {
              if (keys.length > 4) return;
              setTargets(
                allTargets.filter((t) => keys.includes(targetKey(t))),
              );
            }}
            className="mt-2 flex-wrap justify-start"
          >
            {allTargets.map((t) => {
              const key = targetKey(t);
              return (
                <ToggleGroupItem
                  key={key}
                  value={key}
                  className="h-auto rounded-full border border-line px-3 py-1 text-xs text-muted data-[state=on]:border-accent data-[state=on]:bg-accent-soft data-[state=on]:text-ink"
                >
                  {t.locale.toUpperCase()} ·{" "}
                  {audienceLabel(labels, t.audience)}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>

        <Button
          type="button"
          onClick={() => void generate()}
          disabled={busy || sourceText.trim().length < 10 || targets.length === 0}
          className="mt-6 h-auto w-full rounded-full px-6 py-3 text-sm sm:w-auto"
        >
          {busy ? labels.generating : labels.generate}
        </Button>

        {error ? (
          <Alert variant="destructive" className="mt-3">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <p className="mt-3 text-xs text-muted">{labels.disclaimer}</p>
      </div>

      {!compact ? (
        <p className="text-sm text-muted">
          <Link
            href={demoPath}
            className="text-ink underline underline-offset-4"
          >
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
                className="rounded-[var(--radius-card)] border border-line bg-surface p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-accent">
                    {v.locale.toUpperCase()} ·{" "}
                    {audienceLabel(labels, v.audience)}
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => void copyText(v.text)}
                    className="h-auto p-0 text-xs font-medium text-ink"
                  >
                    {labels.copy}
                  </Button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  {v.text}
                </p>
                <p className="mt-2 text-xs text-muted">{v.toneNote}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
