"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { DEMO_MENU_ID } from "@/lib/menu/store";
import type { MenuDraft } from "@/lib/menu/types";
import { menuDigitizerPath, localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type Labels = SiteMessages["menuDigitizer"];

type Phase = "idle" | "compressing" | "uploading" | "done" | "error";

async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("compress"))),
      "image/jpeg",
      0.85,
    );
  });
}

export function MenuDigitizerClient({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [previewPath, setPreviewPath] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setPreviewPath(null);
    setPhase("compressing");

    try {
      const compressed = await compressImage(file);
      setPhase("uploading");

      const form = new FormData();
      form.append("file", compressed, "menu.jpg");
      form.append("locale", locale);

      const res = await fetch("/api/menu/digitize", {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as {
        path?: string;
        message?: string;
        draft?: MenuDraft;
      };

      if (!res.ok || !data.path) {
        setPhase("error");
        setError(data.message ?? "Upload failed");
        return;
      }

      setPreviewPath(data.path);
      setPhase("done");
    } catch {
      setPhase("error");
      setError(
        locale === "de"
          ? "Netzwerkfehler — bitte erneut versuchen."
          : locale === "en"
            ? "Network error — please try again."
            : "Error de red — inténtalo de nuevo.",
      );
    }
  }

  const busy = phase === "compressing" || phase === "uploading";
  const demoPath = localizedPath(locale, `/menu/${DEMO_MENU_ID}`);

  return (
    <div className="space-y-8">
      <div className="rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = "";
          }}
        />

        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="cta-pulse w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
        >
          {busy
            ? phase === "compressing"
              ? labels.processing
              : labels.extracting
            : labels.uploadLabel}
        </button>
        <p className="mt-3 text-sm text-muted">{labels.uploadHint}</p>

        {error ? (
          <p className="mt-4 text-sm text-accent-hot" role="alert">
            {error}
          </p>
        ) : null}

        {phase === "done" && previewPath ? (
          <div className="mt-8 border-t border-line pt-6">
            <p className="font-display text-2xl text-ink">{labels.successTitle}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={previewPath}
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface"
              >
                {labels.openPreview}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setPhase("idle");
                  setPreviewPath(null);
                }}
                className="rounded-full border border-line px-5 py-3 text-sm font-medium text-ink"
              >
                {labels.tryAgain}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="max-w-2xl space-y-3 text-sm text-muted">
        <p>{labels.disclaimer}</p>
        <p>{labels.ocrNote}</p>
        <p>{labels.allergenNote}</p>
      </div>

      <p className="text-sm">
        <Link href={demoPath} className="text-accent underline-offset-4 hover:underline">
          {labels.demoLinkLabel}
        </Link>
      </p>
    </div>
  );
}

export function menuDigitizerPagePath(locale: Locale) {
  return menuDigitizerPath(locale);
}
