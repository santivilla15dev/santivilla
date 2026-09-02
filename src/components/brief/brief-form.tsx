"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      toast.success(labels.copied);
    } catch {
      /* portapapeles no disponible */
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
        <div>
          <Label htmlFor="brief-text" className="text-sm font-medium text-ink">
            {labels.textareaLabel}
          </Label>
          <Textarea
            id="brief-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            maxLength={2000}
            required
            minLength={20}
            placeholder={labels.textareaPlaceholder}
            className="mt-2 resize-y rounded-sm border-line bg-surface px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted/60"
            disabled={phase === "loading"}
          />
          <span className="mt-1 block text-xs text-muted">
            {text.length}/2000 · {labels.textareaHint}
          </span>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <Button
          type="submit"
          disabled={phase === "loading" || text.trim().length < 20}
          className="h-auto rounded-full px-6 py-3 text-sm hover:brightness-110"
        >
          {phase === "loading" ? labels.generating : labels.generate}
        </Button>
        <p className="text-sm text-muted">{labels.disclaimer}</p>
      </form>

      {payload && briefId ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">
              {labels.resultTitle}
            </h2>
            {sharePath ? (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 font-medium text-accent"
                >
                  <Link href={sharePath}>{labels.openShare}</Link>
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={copyShare}
                  className="h-auto p-0 text-muted"
                >
                  {labels.copyLink}
                </Button>
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
