"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  conceptId: string;
  defaultSlug: string;
  defaultName: string;
  labels: {
    convertSite: string;
    ownerEmail: string;
    slug: string;
    whatsapp: string;
    save: string;
  };
};

export function ConvertSiteForm({ conceptId, defaultSlug, defaultName, labels }: Props) {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [slug, setSlug] = useState(defaultSlug);
  const [whatsapp, setWhatsapp] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptId,
          ownerEmail: ownerEmail.trim(),
          slug: slug.trim(),
          businessName: defaultName,
          whatsappE164: whatsapp.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { site?: { slug: string }; error?: string };
      if (!res.ok) throw new Error(data.error || "fail");
      setResult(data.site?.slug ?? "ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "fail");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border border-line p-4">
      <p className="font-medium text-ink">{labels.convertSite}</p>
      <div>
        <Label htmlFor="convert-owner-email" className="sr-only">
          {labels.ownerEmail}
        </Label>
        <Input
          id="convert-owner-email"
          type="email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          placeholder={labels.ownerEmail}
          required
          className="h-auto rounded-lg border-line px-3 py-2 text-sm"
        />
      </div>
      <div>
        <Label htmlFor="convert-slug" className="sr-only">
          {labels.slug}
        </Label>
        <Input
          id="convert-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={labels.slug}
          required
          className="h-auto rounded-lg border-line px-3 py-2 text-sm"
        />
      </div>
      <div>
        <Label htmlFor="convert-whatsapp" className="sr-only">
          {labels.whatsapp}
        </Label>
        <Input
          id="convert-whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder={labels.whatsapp}
          className="h-auto rounded-lg border-line px-3 py-2 text-sm"
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="h-auto rounded-full bg-ink px-4 py-2 text-sm text-surface hover:bg-accent"
      >
        {pending ? "…" : labels.save}
      </Button>
      {result ? (
        <Alert className="border-accent/30 text-accent">
          <AlertDescription>Site: /k/{result}</AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
