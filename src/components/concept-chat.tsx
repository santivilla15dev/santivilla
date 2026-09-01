"use client";

import { useEffect, useRef, useState } from "react";
import { loadEditToken } from "@/lib/design-system/edit-token";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  at?: string;
};

const CHIPS_ES_DEFAULT = [
  "Más información del negocio",
  "Añadir menú / carta de platos",
  "Horarios más claros y visibles",
  "Pon todo en alemán",
];

const CHIPS_ES_CIVIC = [
  "Más servicios ciudadanos",
  "Horarios de atención más claros",
  "Pon todo en alemán",
  "Simplifica la navegación",
];

const CHIPS_DE_DEFAULT = [
  "Mehr Infos zum Betrieb",
  "Speisekarte hinzufügen",
  "Öffnungszeiten klarer zeigen",
  "Alles auf Spanisch",
];

const CHIPS_DE_CIVIC = [
  "Mehr Bürgerservice-Infos",
  "Öffnungszeiten klarer zeigen",
  "Alles auf Spanisch",
  "Navigation vereinfachen",
];

function chipsForKind(kind: string | undefined, lang: "es" | "de"): string[] {
  if (kind === "civic") {
    return lang === "de" ? CHIPS_DE_CIVIC : CHIPS_ES_CIVIC;
  }
  return lang === "de" ? CHIPS_DE_DEFAULT : CHIPS_ES_DEFAULT;
}

type Props = {
  conceptId: string;
  lang?: "es" | "de";
  kind?: string;
  initialMessages?: ChatMessage[];
  onHtmlUpdated: (html: string, seoTypes?: string[]) => void;
};

export function ConceptChat({
  conceptId,
  lang = "es",
  kind,
  initialMessages = [],
  onHtmlUpdated,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chips = chipsForKind(kind, lang);
  const isCivic = kind === "civic";

  // Re-sincroniza si llegan nuevos mensajes iniciales — ajuste durante el
  // render en lugar de setState en useEffect.
  const [prevInitial, setPrevInitial] = useState(initialMessages);
  if (prevInitial !== initialMessages) {
    setPrevInitial(initialMessages);
    setMessages(initialMessages);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || pending) return;
    setError(null);
    setInput("");
    setMessages((m) => [...m, { role: "user", content: message }]);
    setPending(true);
    try {
      const res = await fetch(`/api/concepto/${conceptId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          lang,
          editToken: loadEditToken("concept", conceptId),
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        html?: string;
        messages?: ChatMessage[];
        message?: string;
        seoTypes?: string[];
      };
      if (!res.ok) {
        setError(
          data.message ||
            (lang === "de" ? "Nachricht fehlgeschlagen." : "No se pudo enviar."),
        );
        return;
      }
      if (data.messages?.length) {
        setMessages(data.messages);
      } else if (data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
      }
      if (data.html) onHtmlUpdated(data.html, data.seoTypes);
    } catch {
      setError(lang === "de" ? "Netzwerkfehler." : "Error de red.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[var(--radius)] border border-line bg-surface shadow-[var(--shadow)]">
      <div className="border-b border-line px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Santi Design Agent
        </p>
        <p className="mt-1 text-sm text-muted">
          {lang === "de"
            ? "Sag was du ändern willst — ich baue das Konzept um."
            : "Dime qué quieres cambiar — yo rediseño el concepto."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line px-3 py-3">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={pending}
            onClick={() => void send(chip)}
            className="rounded-full border border-ink/15 bg-surface-2 px-3 py-1.5 text-xs text-ink disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">
            {lang === "de"
              ? "Noch keine Nachrichten."
              : "Aún no hay mensajes."}
          </p>
        ) : (
          messages.map((m, i) => (
            <div
              key={`${m.role}-${i}-${m.content.slice(0, 12)}`}
              className={`max-w-[95%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-accent text-white"
                  : "mr-auto bg-surface-2 text-ink"
              }`}
            >
              {m.content}
            </div>
          ))
        )}
        {pending ? (
          <p className="text-sm text-muted">
            {lang === "de" ? "Agent arbeitet…" : "El agente está trabajando…"}
          </p>
        ) : null}
        <div ref={bottomRef} />
      </div>

      {error ? (
        <p className="px-4 pb-2 text-sm text-accent-hot">{error}</p>
      ) : null}

      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={pending}
          placeholder={
            isCivic
              ? lang === "de"
                ? "z. B. mehr Leistungen hervorheben…"
                : "Ej. destaca más servicios ciudadanos…"
              : lang === "de"
                ? "z. B. Speisekarte mit 4 Gerichten…"
                : "Ej. pon el menú con 4 platos…"
          }
          className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none ring-accent focus:ring-2 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={pending || input.trim().length < 2}
          className="rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {lang === "de" ? "Senden" : "Enviar"}
        </button>
      </form>
    </div>
  );
}
