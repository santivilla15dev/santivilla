"use client";

import { useState } from "react";

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
  const [ownerId, setOwnerId] = useState("");
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
          ownerId: ownerId.trim(),
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
      <input
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)}
        placeholder={labels.ownerEmail}
        required
        className="w-full rounded-lg border border-line px-3 py-2 text-sm"
      />
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder={labels.slug}
        required
        className="w-full rounded-lg border border-line px-3 py-2 text-sm"
      />
      <input
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        placeholder={labels.whatsapp}
        className="w-full rounded-lg border border-line px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-4 py-2 text-sm text-surface disabled:opacity-60"
      >
        {pending ? "…" : labels.save}
      </button>
      {result ? <p className="text-sm text-accent">Site: /k/{result}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
