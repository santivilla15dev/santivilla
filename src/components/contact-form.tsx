"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  labels: {
    formTitle: string;
    formLead: string;
    formName: string;
    formBusiness: string;
    formMessage: string;
    formSubmit: string;
    success: string;
    error: string;
  };
};

const fieldClass =
  "mt-1 h-auto rounded-xl border-line bg-background px-4 py-3 text-ink";

export function ContactForm({ labels }: Props) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      businessName: String(fd.get("business") || ""),
      message: String(fd.get("message") || ""),
      email: String(fd.get("email") || ""),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("fail");
      setDone(true);
      e.currentTarget.reset();
    } catch {
      setError(labels.error);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm text-ink">
        {labels.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-[var(--shadow)]"
    >
      <p className="font-display text-2xl text-ink">{labels.formTitle}</p>
      <p className="mt-2 text-sm text-muted">{labels.formLead}</p>
      <div className="mt-5">
        <Label htmlFor="contact-name" className="text-muted">
          {labels.formName}
        </Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          required
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="contact-email" className="text-muted">
          Email
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="contact-business" className="text-muted">
          {labels.formBusiness}
        </Label>
        <Input
          id="contact-business"
          name="business"
          type="text"
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="contact-message" className="text-muted">
          {labels.formMessage}
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          className={`${fieldClass} resize-y`}
        />
      </div>
      {error ? (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="mt-5 h-auto rounded-full bg-ink px-5 py-3 text-sm text-surface hover:bg-accent"
      >
        {pending ? "…" : labels.formSubmit}
      </Button>
    </form>
  );
}
