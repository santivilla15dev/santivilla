"use client";

import { useState } from "react";
import type { BriefPayload } from "@/lib/brief/schema";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type Labels = Pick<
  SiteMessages["briefAgent"],
  | "reviseLabel"
  | "revisePlaceholder"
  | "reviseSubmit"
  | "revising"
  | "reviseError"
  | "reviseHint"
>;

export function BriefRevisePanel({
  briefId,
  locale,
  labels,
  onRevised,
}: {
  briefId: string;
  locale: Locale;
  labels: Labels;
  onRevised: (payload: BriefPayload) => void;
}) {
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed.length < 3 || phase === "loading") return;

    setError(null);
    setPhase("loading");

    try {
      const res = await fetch(`/api/brief/${encodeURIComponent(briefId)}/revise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, locale }),
      });
      const data = (await res.json()) as {
        payload?: BriefPayload;
        message?: string;
      };

      if (!res.ok || !data.payload) {
        setPhase("error");
        setError(data.message ?? labels.reviseError);
        return;
      }

      onRevised(data.payload);
      setMessage("");
      setPhase("idle");
    } catch {
      setPhase("error");
      setError(labels.reviseError);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-line bg-surface/80 px-4 py-5 sm:px-6"
    >
      <label className="block">
        <span className="text-sm font-medium text-ink">{labels.reviseLabel}</span>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            placeholder={labels.revisePlaceholder}
            disabled={phase === "loading"}
            className="min-w-0 flex-1 rounded-sm border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={phase === "loading" || message.trim().length < 3}
            className="inline-flex shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phase === "loading" ? labels.revising : labels.reviseSubmit}
          </button>
        </div>
      </label>
      <p className="mt-2 text-xs text-muted">{labels.reviseHint}</p>
      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
