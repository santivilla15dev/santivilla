"use client";

import { useEffect, useRef, useState } from "react";
import { answerFaq, whatsappHref } from "@/lib/bot/answer-faq";
import { getBotProfile } from "@/lib/bot/get-profile";
import type { FaqTopic } from "@/lib/bot/types";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type Labels = SiteMessages["microBot"];

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  profileId: string;
  locale: Locale;
  labels: Labels;
};

export function MicroBotWidget({ profileId, locale, labels }: Props) {
  const profile = getBotProfile(profileId);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waMessage, setWaMessage] = useState<string | null>(null);
  const [showWa, setShowWa] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMessages([{ role: "assistant", content: labels.greeting }]);
    }
  }, [open, labels.greeting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  if (!profile) return null;

  function applyHandoff(message?: string, handoff?: boolean) {
    if (message) setWaMessage(message);
    if (handoff) setShowWa(true);
  }

  function handleFaq(topic: FaqTopic, chipLabel: string) {
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: chipLabel }]);
    const result = answerFaq(profile!, topic, locale);
    setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
    applyHandoff(result.whatsappMessage, result.shouldHandoff);
  }

  async function sendFreeText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setPending(true);

    try {
      const res = await fetch("/api/bot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, locale, message: trimmed }),
      });
      const data = (await res.json()) as {
        answer?: string;
        whatsappMessage?: string;
        shouldHandoff?: boolean;
        message?: string;
      };

      if (!res.ok || !data.answer) {
        setError(data.message ?? labels.errorGeneric);
        setPending(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer! },
      ]);
      applyHandoff(data.whatsappMessage, data.shouldHandoff);
    } catch {
      setError(labels.errorGeneric);
    } finally {
      setPending(false);
    }
  }

  const waLink = whatsappHref(
    profile.whatsapp,
    waMessage ?? profile.reservePrompt,
  );

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4b45a] text-sm font-bold text-[#1a1408] shadow-lg transition hover:bg-[#e0c06a] sm:bottom-6 sm:right-6"
          aria-label={labels.openLabel}
        >
          ?
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-0 right-0 z-50 flex w-full max-w-[360px] flex-col border border-white/10 bg-[#0a0c0b] shadow-2xl sm:bottom-6 sm:right-6 sm:rounded-lg"
          style={{ maxHeight: "min(520px, 85svh)" }}
        >
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4b45a]">
                Konzept
              </p>
              <p className="font-display text-lg text-[#f5f1e8]">
                {profile.businessName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#e8e4dc]/70 hover:text-[#e8e4dc]"
              aria-label={labels.closeLabel}
            >
              ✕
            </button>
          </header>

          <div className="flex flex-wrap gap-2 border-b border-white/10 px-3 py-2">
            <button
              type="button"
              onClick={() => handleFaq("availability", labels.chipAvailability)}
              className="rounded-full border border-[#d4b45a]/40 px-3 py-1 text-xs text-[#e8e4dc] hover:bg-white/5"
            >
              {labels.chipAvailability}
            </button>
            <button
              type="button"
              onClick={() => handleFaq("hours", labels.chipHours)}
              className="rounded-full border border-[#d4b45a]/40 px-3 py-1 text-xs text-[#e8e4dc] hover:bg-white/5"
            >
              {labels.chipHours}
            </button>
            <button
              type="button"
              onClick={() => handleFaq("parking", labels.chipParking)}
              className="rounded-full border border-[#d4b45a]/40 px-3 py-1 text-xs text-[#e8e4dc] hover:bg-white/5"
            >
              {labels.chipParking}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={
                    msg.role === "user"
                      ? "ml-8 rounded-lg bg-[#d4b45a]/15 px-3 py-2 text-sm text-[#f5f1e8]"
                      : "mr-4 rounded-lg bg-white/5 px-3 py-2 text-sm text-[#e8e4dc]/90 whitespace-pre-line"
                  }
                >
                  {msg.content}
                </div>
              ))}
              {pending && (
                <p className="text-xs text-[#e8e4dc]/50">{labels.thinking}</p>
              )}
              {error && (
                <p className="text-xs text-red-400/90">{error}</p>
              )}
            </div>
            <div ref={bottomRef} />
          </div>

          {showWa && (
            <div className="border-t border-white/10 px-4 py-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {labels.openWhatsapp}
              </a>
            </div>
          )}

          <form
            className="border-t border-white/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void sendFreeText(input);
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={labels.placeholder}
                className="min-w-0 flex-1 rounded border border-white/15 bg-transparent px-3 py-2 text-sm text-[#e8e4dc] placeholder:text-[#e8e4dc]/40 focus:border-[#d4b45a]/50 focus:outline-none"
                maxLength={500}
                disabled={pending}
              />
              <button
                type="submit"
                disabled={pending || input.trim().length < 2}
                className="shrink-0 rounded bg-[#d4b45a] px-3 py-2 text-sm font-medium text-[#1a1408] disabled:opacity-40"
              >
                {labels.send}
              </button>
            </div>
            <p className="mt-2 text-[10px] leading-snug text-[#e8e4dc]/45">
              {labels.disclaimer}
            </p>
          </form>
        </div>
      )}
    </>
  );
}
