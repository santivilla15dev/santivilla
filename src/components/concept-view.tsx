"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConceptChat,
  type ChatMessage,
} from "@/components/concept-chat";
import { CopyAdaptClient } from "@/components/copy-adapt-client";
import {
  clearLocalConceptHtml,
  injectLiveEditRuntime,
  isLiveEditMessage,
  LIVE_EDIT_MSG,
  loadLocalConceptHtml,
  saveLocalConceptHtml,
  stripEditorArtifacts,
} from "@/lib/design-system/concept-live-edit";
import { whatsappHref } from "@/lib/site";
import { loadEditToken } from "@/lib/design-system/edit-token";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type ConceptMeta = {
  id: string;
  name: string;
  hostname: string;
  url: string;
  score: number;
  source: "template" | "claude";
  kind?: string;
  specialty?: string;
  summary?: string;
  tagline?: string;
  imageSource?: "openai" | "unsplash" | "nano-banana" | "places";
  html?: string;
  lang?: "es" | "de";
  messages?: ChatMessage[];
  seoTypes?: string[];
  menuDraftId?: string;
};

export type ConceptInitialData = ConceptMeta;

function resolveInitialHtml(
  id: string,
  data: ConceptInitialData,
): { html: string; baseline: string; dirty: boolean } {
  const serverHtml = data.html || "";
  const local = loadLocalConceptHtml(id);
  const chosen =
    local && local.length > 40 && local !== serverHtml ? local : serverHtml;
  return {
    html: chosen,
    baseline: serverHtml || chosen,
    dirty: Boolean(local && local !== serverHtml),
  };
}

export function ConceptView({
  id,
  initialData = null,
  auditHref = "/auditoria",
  rawPath,
  uiLocale = "de",
  copyLabels,
  conceptLabels,
}: {
  id: string;
  initialData?: ConceptInitialData | null;
  auditHref?: string;
  rawPath?: string;
  uiLocale?: Locale;
  copyLabels?: SiteMessages["copyAdapt"];
  conceptLabels?: SiteMessages["concept"];
}) {
  const initialResolved = initialData?.html
    ? resolveInitialHtml(id, initialData)
    : null;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [meta, setMeta] = useState<ConceptMeta | null>(initialData);
  const [html, setHtml] = useState<string | null>(initialResolved?.html ?? null);
  const [baselineHtml, setBaselineHtml] = useState<string | null>(
    initialResolved?.baseline ?? null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialData?.messages || [],
  );
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [dirty, setDirty] = useState(initialResolved?.dirty ?? false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState(false);
  const [sideTab, setSideTab] = useState<"agent" | "copy">("agent");
  const [seoTypes, setSeoTypes] = useState<string[]>(initialData?.seoTypes || []);
  const [menuDraftId, setMenuDraftId] = useState(initialData?.menuDraftId || "");
  const [menuLinkMsg, setMenuLinkMsg] = useState<string | null>(null);
  const [menuLinking, setMenuLinking] = useState(false);
  const pendingRequest = useRef<{
    id: string;
    resolve: (html: string) => void;
    reject: (err: Error) => void;
  } | null>(null);

  useEffect(() => {
    if (initialData?.html) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/concepto/${id}`);
        if (!res.ok) {
          const local = loadLocalConceptHtml(id);
          if (local && !cancelled) {
            setHtml(local);
            setBaselineHtml(local);
            setMeta({
              id,
              name: "Concepto (local)",
              hostname: "",
              url: "",
              score: 0,
              source: "template",
              html: local,
              lang: "es",
            });
            setError(null);
            return;
          }
          if (!cancelled) setError("Concepto no encontrado o expirado.");
          return;
        }
        const data = (await res.json()) as ConceptMeta;
        const serverHtml = data.html || "";
        const local = loadLocalConceptHtml(id);
        const chosen =
          local && local.length > 40 && local !== serverHtml ? local : serverHtml;
        if (!cancelled) {
          setMeta(data);
          setHtml(chosen);
          setBaselineHtml(serverHtml || chosen);
          setMessages(data.messages || []);
          setDirty(Boolean(local && local !== serverHtml));
          setSeoTypes(data.seoTypes || []);
          setMenuDraftId(data.menuDraftId || "");
        }
      } catch {
        const local = loadLocalConceptHtml(id);
        if (local && !cancelled) {
          setHtml(local);
          setBaselineHtml(local);
          setMeta({
            id,
            name: "Concepto (local)",
            hostname: "",
            url: "",
            score: 0,
            source: "template",
            html: local,
            lang: "es",
          });
          return;
        }
        if (!cancelled) setError("No se pudo cargar el concepto.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, initialData]);

  const requestIframeHtml = useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) {
        reject(new Error("iframe"));
        return;
      }
      const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      pendingRequest.current = { id: requestId, resolve, reject };
      iframe.contentWindow.postMessage(
        { channel: LIVE_EDIT_MSG, type: "requestHtml", requestId },
        "*",
      );
      window.setTimeout(() => {
        if (pendingRequest.current?.id === requestId) {
          pendingRequest.current.reject(new Error("timeout"));
          pendingRequest.current = null;
        }
      }, 4000);
    });
  }, []);

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      if (!isLiveEditMessage(ev.data)) return;
      if (ev.data.type === "dirty") {
        setDirty(true);
        setSaveOk(false);
      }
      if (ev.data.type === "html") {
        const pending = pendingRequest.current;
        if (!pending) return;
        if (ev.data.requestId && ev.data.requestId !== pending.id) return;
        pendingRequest.current = null;
        pending.resolve(stripEditorArtifacts(ev.data.html));
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function onAgentHtml(nextHtml: string, nextSeoTypes?: string[]) {
    setEditing(false);
    setHtml(nextHtml);
    setBaselineHtml(nextHtml);
    setDirty(false);
    saveLocalConceptHtml(id, nextHtml);
    setSaveOk(true);
    if (Array.isArray(nextSeoTypes)) setSeoTypes(nextSeoTypes);
  }

  async function openFullscreenTab() {
    if (!html) return;
    const rawUrl = rawPath ?? `/concepto/${id}/raw`;
    try {
      const res = await fetch(rawUrl, { method: "GET", cache: "no-store" });
      if (res.ok) {
        window.open(rawUrl, "_blank", "noopener,noreferrer");
        return;
      }
    } catch {
      // fall through to blob
    }
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const win = window.open(blobUrl, "_blank", "noopener,noreferrer");
    if (!win) {
      // popup blocked: navigate current tab as last resort
      window.location.href = blobUrl;
      return;
    }
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
  }

  async function startEditing() {
    setSaveError(null);
    setSaveOk(false);
    setEditing(true);
  }

  async function cancelEditing() {
    setEditing(false);
    setDirty(false);
    setSaveError(null);
    if (baselineHtml) setHtml(baselineHtml);
  }

  async function saveEditing() {
    setSaving(true);
    setSaveError(null);
    setSaveOk(false);
    try {
      const next = editing ? await requestIframeHtml() : html;
      if (!next) throw new Error("empty");
      const clean = stripEditorArtifacts(next);
      const res = await fetch(`/api/concepto/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: clean, editToken: loadEditToken("concept", id) }),
      });
      const data = (await res.json()) as {
        message?: string;
        ok?: boolean;
        seoTypes?: string[];
      };
      if (!res.ok) {
        saveLocalConceptHtml(id, clean);
        if (res.status === 404) {
          setHtml(clean);
          setBaselineHtml(clean);
          setDirty(false);
          setEditing(false);
          setSaveOk(true);
          setSaveError(
            "Guardado en este navegador (el servidor ya no tenía el concepto).",
          );
          return;
        }
        throw new Error(data.message || "No se pudo guardar.");
      }
      saveLocalConceptHtml(id, clean);
      setHtml(clean);
      setBaselineHtml(clean);
      setDirty(false);
      setEditing(false);
      setSaveOk(true);
      if (Array.isArray(data.seoTypes)) setSeoTypes(data.seoTypes);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function linkMenuDraft() {
    if (!conceptLabels) return;
    setMenuLinkMsg(null);
    setMenuLinking(true);
    try {
      const res = await fetch(`/api/concepto/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuDraftId: menuDraftId.trim() || null,
          editToken: loadEditToken("concept", id),
        }),
      });
      const data = (await res.json()) as {
        message?: string;
        seoTypes?: string[];
      };
      if (!res.ok) {
        throw new Error(data.message || conceptLabels.menuLinkError);
      }
      if (Array.isArray(data.seoTypes)) setSeoTypes(data.seoTypes);
      setMenuLinkMsg(conceptLabels.menuLinkSuccess);
    } catch (e) {
      setMenuLinkMsg(
        e instanceof Error ? e.message : conceptLabels?.menuLinkError || "Error",
      );
    } finally {
      setMenuLinking(false);
    }
  }

  if (error && !meta) {
    return (
      <p className="rounded-[var(--radius)] border border-accent-hot/30 bg-surface p-6 text-accent-hot">
        {error}{" "}
        <a href={auditHref} className="underline">
          Generar de nuevo
        </a>
      </p>
    );
  }

  if (!meta || !html) {
    return <p className="text-muted">Cargando concepto…</p>;
  }

  const lang = meta.lang === "de" ? "de" : "es";
  const wa = whatsappHref(
    `Hola Santi — vi el concepto de ${meta.name}${meta.specialty ? ` (${meta.specialty})` : ""} score ${meta.score}. Quiero web real: ${typeof window !== "undefined" ? window.location.href : ""}`,
  );

  const srcDoc = editing ? injectLiveEditRuntime(html) : html;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {meta.kind ? (
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">
                {meta.kind}
                {meta.specialty ? ` · ${meta.specialty}` : ""}
              </span>
            ) : meta.specialty ? (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                {meta.specialty}
              </span>
            ) : null}
            <span className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
              html: {meta.source === "claude" ? "Claude" : "plantilla"}
            </span>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
              fotos: {meta.imageSource || "—"}
            </span>
            {seoTypes.length > 0 && conceptLabels ? (
              <span
                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900"
                title={conceptLabels.seoTooltip}
              >
                {conceptLabels.seoBadge}: {seoTypes.slice(0, 3).join(", ")}
              </span>
            ) : conceptLabels ? (
              <span
                className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted"
                title={conceptLabels.seoTooltip}
              >
                {conceptLabels.seoBadge}
              </span>
            ) : null}
            {editing ? (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                modo edición
              </span>
            ) : null}
            {dirty ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                Sin guardar
              </span>
            ) : null}
          </div>
          <p className="font-display text-2xl text-ink">{meta.name}</p>
          <p className="text-sm text-muted">
            Score {meta.score}/100
            {meta.summary ? ` · ${meta.summary}` : ""}
          </p>
          {conceptLabels ? (
            <div className="mt-3 flex max-w-md flex-wrap items-end gap-2">
              <label className="flex-1 min-w-[12rem]">
                <span className="text-xs text-muted">{conceptLabels.menuLinkLabel}</span>
                <input
                  type="text"
                  value={menuDraftId}
                  onChange={(e) => setMenuDraftId(e.target.value)}
                  placeholder={conceptLabels.menuLinkPlaceholder}
                  className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
                />
              </label>
              <button
                type="button"
                onClick={() => void linkMenuDraft()}
                disabled={menuLinking}
                className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink disabled:opacity-50"
              >
                {menuLinking ? "…" : conceptLabels.menuLinkButton}
              </button>
            </div>
          ) : null}
          {menuLinkMsg ? (
            <p className="mt-2 text-xs text-muted">{menuLinkMsg}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {!editing ? (
            <button
              type="button"
              onClick={() => void startEditing()}
              className="rounded-full border border-ink/20 bg-surface px-5 py-3 text-sm font-medium text-ink"
            >
              Editar textos
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => void cancelEditing()}
                disabled={saving}
                className="rounded-full border border-ink/20 bg-surface px-5 py-3 text-sm font-medium text-ink disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void saveEditing()}
                disabled={saving}
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
              >
                {saving ? "Guardando…" : "Guardar"}
              </button>
            </>
          )}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white"
          >
            WhatsApp — quiero este concepto
          </a>
        </div>
      </div>

      <p className="text-sm text-muted">
        {lang === "de"
          ? "Sprich mit dem Agenten rechts — er baut das Konzept um. Feintuning: „Editar textos“."
          : "Habla con el agente (derecha): él cambia el diseño. Ajuste fino de textos: botón «Editar textos»."}
      </p>

      {editing ? (
        <p className="text-sm text-muted">
          Haz clic en los textos del preview para editarlos. El banner Konzept no
          se puede cambiar.
        </p>
      ) : null}
      {saveError ? (
        <p className="text-sm text-accent-hot">{saveError}</p>
      ) : null}
      {saveOk && !saveError ? (
        <p className="text-sm text-accent">Cambios aplicados.</p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)] lg:items-start">
        <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-surface shadow-[var(--shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted">
            <span>
              {editing
                ? "Edición de textos · clic en textos"
                : "Preview · responsive"}
            </span>
            <div className="flex flex-wrap items-center gap-3 normal-case tracking-normal">
              {baselineHtml && html !== baselineHtml && !editing ? (
                <button
                  type="button"
                  className="text-accent underline"
                  onClick={() => {
                    clearLocalConceptHtml(id);
                    setHtml(baselineHtml);
                    setDirty(false);
                  }}
                >
                  Restaurar
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void openFullscreenTab()}
                className="rounded-full border border-ink/15 bg-surface-2 px-3 py-1 text-xs font-medium text-ink hover:border-ink/30"
              >
                {lang === "de" ? "In neuem Tab" : "Abrir en pestaña"}
              </button>
            </div>
          </div>
          <iframe
            key={editing ? `edit-${id}` : `view-${id}-${html.length}`}
            ref={iframeRef}
            title={`Concepto ${meta.name}`}
            srcDoc={srcDoc}
            className="h-[70vh] w-full bg-white lg:h-[75vh]"
            sandbox={
              editing
                ? "allow-same-origin allow-scripts"
                : "allow-same-origin"
            }
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:max-h-[75vh] lg:overflow-y-auto">
          {copyLabels ? (
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setSideTab("agent")}
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  sideTab === "agent"
                    ? "bg-ink text-white"
                    : "border border-ink/15 text-muted"
                }`}
              >
                {copyLabels.tabAgent}
              </button>
              <button
                type="button"
                onClick={() => setSideTab("copy")}
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  sideTab === "copy"
                    ? "bg-ink text-white"
                    : "border border-ink/15 text-muted"
                }`}
              >
                {copyLabels.tabCopy}
              </button>
            </div>
          ) : null}

          {sideTab === "copy" && copyLabels ? (
            <CopyAdaptClient
              locale={uiLocale}
              labels={copyLabels}
              compact
              conceptId={id}
              initialSourceText={
                meta.summary || meta.tagline || meta.name || ""
              }
              initialContentType={
                meta.kind === "gasthaus" || meta.kind === "pizzeria" || meta.kind === "cafe"
                  ? "dish"
                  : "service"
              }
              initialBusinessKind={meta.kind}
            />
          ) : (
            <ConceptChat
              conceptId={id}
              lang={lang}
              kind={meta.kind}
              initialMessages={messages}
              onHtmlUpdated={onAgentHtml}
            />
          )}
        </div>
      </div>
    </div>
  );
}
