"use client";

import { useState } from "react";
import type { LeadStatus } from "@/lib/crm/types";

type Props = {
  leadId: string;
  initialStatus: LeadStatus;
  initialNotes: string;
  labels: { status: string; notes: string; save: string };
};

export function LeadDetailForm({ leadId, initialStatus, initialNotes, labels }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status, notes }),
      });
      if (!res.ok) throw new Error("fail");
      setSaved(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-4 rounded-xl border border-line bg-surface p-6">
      <label className="block text-sm">
        <span className="text-muted">{labels.status}</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="mt-1 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink"
        >
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="proposal">proposal</option>
          <option value="won">won</option>
          <option value="lost">lost</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-muted">{labels.notes}</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="mt-1 w-full resize-y rounded-xl border border-line bg-background px-4 py-3 text-ink"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-5 py-2 text-sm text-surface hover:bg-accent disabled:opacity-60"
      >
        {pending ? "…" : labels.save}
      </button>
      {saved ? <p className="text-sm text-accent">OK</p> : null}
    </form>
  );
}
