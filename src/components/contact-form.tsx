"use client";

import { useState } from "react";

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
      <p className="rounded-[var(--radius)] border border-line bg-surface p-6 text-sm text-ink">
        {labels.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow)]"
    >
      <p className="font-display text-2xl text-ink">{labels.formTitle}</p>
      <p className="mt-2 text-sm text-muted">{labels.formLead}</p>
      <label className="mt-5 block text-sm">
        <span className="text-muted">{labels.formName}</span>
        <input
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="text-muted">Email</span>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="text-muted">{labels.formBusiness}</span>
        <input
          name="business"
          type="text"
          className="mt-1 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="text-muted">{labels.formMessage}</span>
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full resize-y rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        />
      </label>
      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface transition hover:bg-accent disabled:opacity-60"
      >
        {pending ? "…" : labels.formSubmit}
      </button>
    </form>
  );
}
