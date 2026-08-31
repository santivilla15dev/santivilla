"use client";

import Link from "next/link";
import { useState } from "react";
import { saveEditToken } from "@/lib/design-system/edit-token";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type Labels = SiteMessages["mapsKonzept"];

type Result = {
  slug: string;
  conceptId: string;
  editToken?: string;
  path: string;
  previewUrl: string;
  name: string;
};

export function MapsKonzeptClient({ labels }: { labels: Labels }) {
  const [mapsUrl, setMapsUrl] = useState("");
  const [phase, setPhase] = useState<"idle" | "generating" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function generate() {
    setError(null);
    setResult(null);
    setPhase("generating");

    try {
      const res = await fetch("/api/maps/konzept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mapsUrl: mapsUrl.trim(), lang: "de" }),
      });
      const data = (await res.json()) as Result & {
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        setError(data.message || labels.errorGeneric);
        setPhase("error");
        return;
      }
      if (data.editToken) saveEditToken("concept", data.conceptId, data.editToken);
      setResult(data);
      setPhase("done");
    } catch {
      setError(labels.errorGeneric);
      setPhase("error");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <label
          htmlFor="maps-url"
          className="block text-sm font-medium text-ink"
        >
          {labels.urlLabel}
        </label>
        <input
          id="maps-url"
          type="url"
          value={mapsUrl}
          onChange={(e) => setMapsUrl(e.target.value)}
          placeholder={labels.urlPlaceholder}
          className="mt-2 w-full rounded-[var(--radius)] border border-line bg-surface px-4 py-3 text-ink outline-none ring-accent/30 focus:ring-2"
        />
        <p className="mt-2 text-xs text-muted">{labels.urlHint}</p>
      </div>

      <button
        type="button"
        onClick={() => void generate()}
        disabled={phase === "generating" || !mapsUrl.trim()}
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-ink/90 disabled:opacity-50"
      >
        {phase === "generating" ? labels.generating : labels.generate}
      </button>

      {error ? <p className="text-sm text-accent-hot">{error}</p> : null}

      {result ? (
        <div className="rounded-[var(--radius)] border border-line bg-surface-2 p-5">
          <p className="text-sm font-medium text-ink">{result.name}</p>
          <p className="mt-1 text-xs text-muted">{labels.shareLabel}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href={result.path}
              target="_blank"
              className="text-sm font-medium text-accent hover:underline"
            >
              {result.path}
            </Link>
            <Link
              href={`/de/concepto/${result.conceptId}`}
              className="text-sm text-muted hover:text-ink"
            >
              {labels.editLink}
            </Link>
          </div>
        </div>
      ) : null}

      <p className="text-xs text-muted">{labels.disclaimer}</p>
    </div>
  );
}
