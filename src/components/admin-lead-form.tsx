"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status, notes }),
      });
      if (!res.ok) throw new Error("fail");
      toast.success("OK");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-4 rounded-xl border border-line bg-surface p-6">
      <div>
        <Label htmlFor="lead-status" className="text-sm text-muted">
          {labels.status}
        </Label>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as LeadStatus)}
        >
          <SelectTrigger
            id="lead-status"
            className="mt-1 h-auto w-full rounded-xl border-line bg-background px-4 py-3 text-ink"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">new</SelectItem>
            <SelectItem value="contacted">contacted</SelectItem>
            <SelectItem value="proposal">proposal</SelectItem>
            <SelectItem value="won">won</SelectItem>
            <SelectItem value="lost">lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="lead-notes" className="text-sm text-muted">
          {labels.notes}
        </Label>
        <Textarea
          id="lead-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="mt-1 resize-y rounded-xl border-line bg-background px-4 py-3 text-ink"
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="h-auto rounded-full bg-ink px-5 py-2 text-sm text-surface hover:bg-accent"
      >
        {pending ? "…" : labels.save}
      </Button>
    </form>
  );
}
