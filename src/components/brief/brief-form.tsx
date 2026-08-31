"use client";

import Link from "next/link";
import { useState } from "react";
import { briefSalesWhatsAppMessage } from "@/lib/brief/whatsapp-message";
import type { BriefPayload } from "@/lib/brief/schema";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { localizedPath } from "@/lib/i18n/paths";
import { saveEditToken } from "@/lib/design-system/edit-token";
import { BriefPreview } from "./brief-preview";
import { BriefRevisePanel } from "./brief-revise-panel";

type Labels = SiteMessages["briefAgent"];

export function BriefForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<BriefPayload | null>(null);
  const [briefId, setBriefId] = useState<string | null>(null);
  const [sharePath, setSharePath] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPayload(null);
    setBriefId(null);
    setSharePath(null);
    setPhase("loading");

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });
      const data = (await res.json()) as {
        id?: string;
        payload?: BriefPayload;
        path?: string;
        editToken?: string;
        message?: string;
      };

      if (!res.ok || !data.payload || !data.id) {
        setPhase("error");
        setError(data.message ?? labels.errorGeneric);
        return;
      }

      if (data.editToken) saveEditToken("brief", data.id, data.editToken);
      setPayload(data.payload);
      setBriefId(data.id);
      setSharePath(data.path ?? localizedPath(locale, `/brief/${data.id}`));
      setPhase("done");
    } catch {
      setPhase("error");
      setError(labels.errorGeneric);
    }
  }

  async function copyShare() {
    if (!sharePath) return;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${sharePath}`
        : sharePath;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const whatsappMessage = sharePath
    ? briefSalesWhatsAppMessage(
        labels.salesWhatsapp,
        typeof window !== "undefined"
          ? `${window.location.origin}${sharePath}`
          : sharePath,
      )
    : labels.salesWhatsapp;

  const reviseLabels = {
    reviseLabel: labels.reviseLabel,
    revisePlaceholder: labels.revisePlaceholder,
    reviseSubmit: labels.reviseSubmit,
    revising: labels.revising,
    reviseError: labels.reviseError,
    reviseHint: labels.reviseHint,
  };

  return (
    <div className="space-y-12">
      <form onSubmit={onSubmit} className="space-y-6">
        <label className="block">
          <span className="text-sm font-medium text-ink">{labels.textareaLabel}</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            maxLength={2000}
            required
            minLength={20}
            placeholder={labels.textareaPlaceholder}
            className="mt-2 w-full resize-y rounded-sm border border-line bg-surface px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
            disabled={phase === "loading"}
          />
          <span className="mt-1 block text-xs text-muted">
            {text.length}/2000 · {labels.textareaHint}
          </span>
        </label>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={phase === "loading" || text.trim().length < 20}
          className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {phase === "loading" ? labels.generating : labels.generate}
        </button>
        <p className="text-sm text-muted">{labels.disclaimer}</p>
      </form>

      {payload && briefId ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">{labels.resultTitle}</h2>
            {sharePath ? (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href={sharePath}
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  {labels.openShare}
                </Link>
                <button
                  type="button"
                  onClick={copyShare}
                  className="text-muted underline-offset-4 hover:underline"
                >
                  {copied ? labels.copied : labels.copyLink}
                </button>
              </div>
            ) : null}
          </div>
          <div className="overflow-hidden rounded-sm border border-line">
            <BriefPreview
              payload={payload}
              labels={{
                banner: labels.previewBanner,
                featuresTitle: labels.featuresTitle,
                contactTitle: labels.contactTitle,
                contactBody: labels.contactBody,
                whatsappLabel: labels.whatsappLabel,
                whatsappMessage,
              }}
            />
            <BriefRevisePanel
              briefId={briefId}
              locale={locale}
              labels={reviseLabels}
              onRevised={setPayload}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
