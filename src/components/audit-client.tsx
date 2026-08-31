"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type {
  AiDiagnosis,
  AuditHtmlSnippets,
  AuditLang,
  AuditResult,
} from "@/lib/audit/types";
import { formatMs } from "@/lib/audit/pagespeed";
import { AuditAudioPlayer } from "@/components/audit-audio-player";
import { LighthouseReport } from "@/components/lighthouse-report";
import { localizedPath } from "@/lib/i18n/paths";
import { saveEditToken } from "@/lib/design-system/edit-token";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { whatsappHref } from "@/lib/site";

const examples = ["lugner.at", "www.wien.gv.at"];

function severityClass(severity: AuditResult["findings"][number]["severity"]) {
  if (severity === "critical") return "text-accent-hot";
  if (severity === "warn") return "text-[#a15c12]";
  return "text-accent";
}

function PreviewDevices({ result }: { result: AuditResult }) {
  const templateLabel =
    result.template === "restaurant"
      ? "Gasthaus-Konzept"
      : result.template === "center"
        ? "Center-Konzept"
        : result.template === "civic"
          ? "Portal-Konzept"
          : "Shop-Konzept";

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-ink/15 bg-ink text-surface shadow-[var(--shadow)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-surface/40">
            Desktop · {templateLabel}
          </span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a227]">
              Konzept — nicht offiziell
            </p>
            <p className="font-display mt-2 text-2xl leading-tight">
              {result.previewName}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-surface/65">
              Horarios · contacto · mapa — klar auf jedem Screen.
            </p>
          </div>
          <div className="min-h-24 rounded-xl bg-[linear-gradient(135deg,#0b5f63_0%,#1a3344_50%,#c45c26_100%)]" />
        </div>
      </div>

      <div className="flex items-end justify-center gap-3">
        <div className="w-[42%] overflow-hidden rounded-xl border border-ink/15 bg-ink text-surface">
          <div className="border-b border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-surface/40">
            Tablet
          </div>
          <div className="space-y-2 p-3">
            <p className="font-display text-sm leading-tight">
              {result.previewName}
            </p>
            <div className="flex gap-1 text-[9px]">
              <span className="rounded-full bg-accent px-2 py-0.5">Offen</span>
              <span className="rounded-full border border-white/20 px-2 py-0.5">
                Map
              </span>
            </div>
            <div className="h-10 rounded-lg bg-white/10" />
          </div>
        </div>

        <div className="w-[34%] overflow-hidden rounded-[1.1rem] border border-ink/15 bg-ink text-surface">
          <div className="border-b border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-surface/40">
            Handy
          </div>
          <div className="space-y-2 p-3">
            <p className="font-display text-xs leading-tight">
              {result.previewName}
            </p>
            <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-[9px]">
              WhatsApp
            </span>
            <div className="h-12 rounded-lg bg-[linear-gradient(135deg,#0b5f63,#c45c26)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuditClient({
  locale = "de",
  initialLang = "de",
  labels,
}: {
  locale?: Locale;
  initialLang?: AuditLang;
  labels: SiteMessages["audit"];
}) {
  const [url, setUrl] = useState("");
  const [lang, setLang] = useState<AuditLang>(initialLang);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [psiAvailable, setPsiAvailable] = useState(false);
  const [lighthousePending, setLighthousePending] = useState(false);
  const [lighthouseFailed, setLighthouseFailed] = useState(false);
  const [pending, startTransition] = useTransition();
  const [designPending, setDesignPending] = useState(false);
  const [designStage, setDesignStage] = useState<string | null>(null);
  const [designError, setDesignError] = useState<string | null>(null);
  const [conceptPath, setConceptPath] = useState<string | null>(null);
  const [conceptMeta, setConceptMeta] = useState<{
    kind?: string;
    specialty?: string;
    imageSource?: string;
    source?: string;
    art?: string;
    collected?: {
      phones: number;
      emails: number;
      addresses: number;
      hours: number;
      highlights: number;
      nav: number;
    };
  } | null>(null);
  const [htmlSnippets, setHtmlSnippets] = useState<AuditHtmlSnippets | null>(
    null,
  );
  const [diagnosis, setDiagnosis] = useState<AiDiagnosis | null>(null);
  const [diagnosisPending, setDiagnosisPending] = useState(false);
  const [reportPath, setReportPath] = useState<string | null>(null);

  async function runDiagnose(
    auditResult: AuditResult,
    snippets: AuditHtmlSnippets | null,
    conceptId?: string,
  ) {
    setDiagnosisPending(true);
    try {
      const res = await fetch("/api/audit/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          result: auditResult,
          lang,
          htmlSnippets: snippets ?? undefined,
          conceptId,
        }),
      });
      const data = (await res.json()) as {
        diagnosis?: AiDiagnosis;
        reportPath?: string;
        message?: string;
      };
      if (res.ok && data.diagnosis) {
        setDiagnosis(data.diagnosis);
        setReportPath(
          localizedPath(locale, `/auditoria/report/${auditResult.id}`),
        );
      }
    } catch {
      /* diagnosis optional */
    } finally {
      setDiagnosisPending(false);
    }
  }

  function runAudit(nextUrl?: string) {
    const target = (nextUrl ?? url).trim();
    if (!target) {
      setError(lang === "de" ? "URL einfügen." : "Pega una URL.");
      return;
    }

    setError(null);
    setConceptPath(null);
    setConceptMeta(null);
    setDesignError(null);
    setDesignStage(null);
    setLighthouseFailed(false);
    setLighthousePending(false);
    setPsiAvailable(false);
    setDiagnosis(null);
    setReportPath(null);
    setHtmlSnippets(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: target, lang }),
        });
        const data = (await res.json()) as {
          result?: AuditResult;
          htmlSnippets?: AuditHtmlSnippets;
          psiAvailable?: boolean;
          message?: string;
        };
        if (!res.ok || !data.result) {
          setResult(null);
          setError(
            data.message ||
              (lang === "de" ? "Scan fehlgeschlagen." : "El escaneo falló."),
          );
          return;
        }
        setResult(data.result);
        setHtmlSnippets(data.htmlSnippets ?? null);
        if (data.psiAvailable) {
          setPsiAvailable(true);
          setLighthousePending(true);
          void fetchLighthouse(target, data.result, data.htmlSnippets ?? null);
        } else {
          void runDiagnose(data.result, data.htmlSnippets ?? null);
        }
      } catch {
        setResult(null);
        setError(
          lang === "de"
            ? "Netzwerkfehler. Nochmal versuchen."
            : "Error de red. Inténtalo otra vez.",
        );
      }
    });
  }

  async function fetchLighthouse(
    target: string,
    baseResult: AuditResult,
    snippets: AuditHtmlSnippets | null,
  ) {
    let merged: AuditResult = baseResult;
    try {
      const res = await fetch("/api/audit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: target,
          lang,
          baseResult,
        }),
      });
      const data = (await res.json()) as {
        lighthouse?: AuditResult["lighthouse"];
        findings?: AuditResult["findings"];
        message?: string;
      };
      if (!res.ok) {
        setLighthouseFailed(true);
        void runDiagnose(merged, snippets);
        return;
      }
      if (!data.lighthouse) {
        setLighthouseFailed(true);
        void runDiagnose(merged, snippets);
        return;
      }
      merged = {
        ...baseResult,
        lighthouse: data.lighthouse ?? null,
        findings: data.findings ?? baseResult.findings,
      };
      setResult(merged);
      void runDiagnose(merged, snippets);
    } catch {
      setLighthouseFailed(true);
      void runDiagnose(merged, snippets);
    } finally {
      setLighthousePending(false);
    }
  }

  async function runDesign() {
    if (!result) return;
    setDesignPending(true);
    setDesignError(null);
    setDesignStage(
      lang === "de" ? "Geschäft verstehen…" : "Entendiendo el negocio…",
    );
    const stageTimer = window.setTimeout(() => {
      setDesignStage(
        lang === "de" ? "Bilder erzeugen…" : "Generando imágenes…",
      );
    }, 2500);
    const stageTimer2 = window.setTimeout(() => {
      setDesignStage(
        lang === "de" ? "Layout bauen…" : "Montando el layout…",
      );
    }, 6000);
    try {
      const res = await fetch("/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.previewName,
          url: result.url,
          hostname: result.hostname,
          template: result.template,
          lang,
          score: result.score,
          findings: result.findings
            .filter((f) => f.severity !== "ok")
            .map((f) => f.title),
        }),
      });
      const data = (await res.json()) as {
        id?: string;
        path?: string;
        editToken?: string;
        message?: string;
        kind?: string;
        specialty?: string;
        imageSource?: string;
        source?: string;
        art?: string;
        collected?: {
          phones: number;
          emails: number;
          addresses: number;
          hours: number;
          highlights: number;
          nav: number;
        };
      };
      if (!res.ok || !data.path || !data.id) {
        setDesignError(
          data.message ||
            (lang === "de"
              ? "Konzept fehlgeschlagen."
              : "No se pudo generar el concepto."),
        );
        return;
      }
      setConceptPath(localizedPath(locale, `/concepto/${data.id}`));
      if (data.editToken) saveEditToken("concept", data.id, data.editToken);
      setConceptMeta({
        kind: data.kind,
        specialty: data.specialty,
        imageSource: data.imageSource,
        source: data.source,
        art: data.art,
        collected: data.collected,
      });
      if (result) {
        void runDiagnose(result, htmlSnippets, data.id);
      }
    } catch {
      setDesignError(
        lang === "de" ? "Netzwerkfehler." : "Error de red al generar.",
      );
    } finally {
      window.clearTimeout(stageTimer);
      window.clearTimeout(stageTimer2);
      setDesignStage(null);
      setDesignPending(false);
    }
  }

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://santivilla.com";

  const waMessage = result
    ? (() => {
        const lh = result.lighthouse
          ? ` LCP ${formatMs(result.lighthouse.lcpMs)} · Lighthouse ${result.lighthouse.performance}/100.`
          : "";
        const headline = diagnosis?.headline || result.verdict;
        const firstPoint = diagnosis?.criticalPoints[0]?.title;
        const pointBit = firstPoint ? ` ${firstPoint}.` : "";
        return lang === "de"
          ? `Hallo Santi — Mobile Erst UX ${result.uxScore}/100 für ${result.hostname}.${lh} ${headline}${pointBit}${conceptPath ? ` Konzept: ${origin}${conceptPath}` : ""}${reportPath ? ` Report: ${origin}${reportPath}` : ""} Kannst du mir den Relaunch machen?`
          : `Hola Santi — Mobile Erst UX ${result.uxScore}/100 para ${result.hostname}.${lh} ${headline}${pointBit}${conceptPath ? ` Concepto: ${origin}${conceptPath}` : ""}${reportPath ? ` Informe: ${origin}${reportPath}` : ""} ¿Lo convertimos en web real?`;
      })()
    : undefined;

  return (
    <div className="space-y-10">
      <form
        className="rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow)] sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          runAudit();
        }}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted">
            {lang === "de" ? "Sprache" : "Idioma"}
          </span>
          <button
            type="button"
            onClick={() => setLang("es")}
            className={`rounded-full px-3 py-1 ${lang === "es" ? "bg-accent text-white" : "bg-surface-2 text-ink"}`}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLang("de")}
            className={`rounded-full px-3 py-1 ${lang === "de" ? "bg-accent text-white" : "bg-surface-2 text-ink"}`}
          >
            DE
          </button>
        </div>

        <label className="mt-6 block">
          <span className="text-sm text-muted">
            {lang === "de"
              ? "Website deines Geschäfts"
              : "Web de tu negocio"}
          </span>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://tu-negocio.at"
              className="w-full flex-1 rounded-full border border-line bg-background px-5 py-3 text-ink outline-none ring-accent focus:ring-2"
              inputMode="url"
              autoComplete="url"
            />
            <button
              type="submit"
              disabled={pending}
              className="cta-pulse rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {pending
                ? lang === "de"
                  ? "Scan…"
                  : "Escaneando…"
                : lang === "de"
                  ? "Alle Geräte prüfen"
                  : "Probar en todos"}
            </button>
          </div>
        </label>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
          <span>{lang === "de" ? "Beispiel:" : "Ejemplo:"}</span>
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              className="rounded-full border border-line px-3 py-1 hover:border-accent hover:text-ink"
              onClick={() => {
                setUrl(ex);
                runAudit(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm text-accent-hot" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {result ? (
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[var(--radius)] border border-line bg-ink p-7 text-surface">
              <p className="text-xs uppercase tracking-[0.2em] text-surface/50">
                Mobile Erst · responsive · {result.hostname}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-surface/40">
                {lang === "de"
                  ? "Handy · Tablet · Desktop"
                  : "Móvil · Tablet · Desktop"}
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-surface/45">
                    {labels.uxScoreLabel}
                  </p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="font-display text-6xl leading-none text-[#c9a227]">
                      {result.uxScore}
                    </p>
                    <p className="pb-1 text-sm text-surface/55">/ 100 · {result.grade}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-surface/45">
                    {labels.lighthouseLabel}
                  </p>
                  <div className="mt-2 flex items-end gap-3">
                    {result.lighthouse ? (
                      <p className="font-display text-6xl leading-none text-[#c9a227]">
                        {result.lighthouse.performance}
                      </p>
                    ) : (
                      <p className="font-display text-3xl leading-none text-surface/40">…</p>
                    )}
                    <p className="pb-1 text-sm text-surface/55">/ 100</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 max-w-md text-lg leading-snug">
                {diagnosis?.headline || result.verdict}
              </p>
              {diagnosis?.executiveSummary ? (
                <p className="mt-2 max-w-md text-sm text-surface/65">
                  {diagnosis.executiveSummary}
                </p>
              ) : null}

              <div className="mt-8 border-t border-white/10 pt-6">
                <LighthouseReport
                  lighthouse={result.lighthouse}
                  labels={labels}
                  loading={lighthousePending}
                  failed={lighthouseFailed}
                  unavailable={!psiAvailable && !lighthousePending}
                />
              </div>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-surface/45">
                  {labels.diagnosisTitle}
                </p>
                {diagnosisPending ? (
                  <p className="text-sm text-surface/60 animate-pulse">
                    {labels.diagnosisPending}
                  </p>
                ) : diagnosis ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#c9a227]">
                      {labels.criticalPointsTitle}
                    </p>
                    <div className="space-y-3">
                      {diagnosis.criticalPoints.map((point, i) => (
                        <div
                          key={point.title}
                          className="rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                          <p className="text-xs font-semibold text-[#e8a598]">
                            {i + 1}. {point.title}
                          </p>
                          <p className="mt-1 text-sm text-surface/85">
                            {point.impact}
                          </p>
                          <p className="mt-1 text-xs text-surface/55">
                            {labels.reportRecommendation}: {point.recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <p className="mb-2 text-xs text-surface/50">
                        {labels.listenDiagnosis}
                      </p>
                      <AuditAudioPlayer
                        script={diagnosis.audioScript}
                        lang={lang}
                        playLabel={labels.audioPlay}
                        pauseLabel={labels.audioPause}
                        stopLabel={labels.audioStop}
                        unsupportedLabel={labels.audioUnsupported}
                      />
                    </div>
                    {reportPath ? (
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Link
                          href={reportPath}
                          target="_blank"
                          className="rounded-full bg-[#c9a227] px-4 py-2 text-xs font-medium text-[#1a1408]"
                        >
                          {labels.downloadReport}
                        </Link>
                      </div>
                    ) : null}
                  </>
                ) : (
                  result.agentLines.map((line) => (
                    <p key={line} className="text-sm text-surface/80">
                      — {line}
                    </p>
                  ))
                )}
              </div>
            </div>

            <ul className="space-y-4">
              {result.findings.map((f) => (
                <li
                  key={f.id}
                  className="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0"
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.14em] ${severityClass(f.severity)}`}
                  >
                    {f.severity}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{f.detail}</p>
                </li>
              ))}
            </ul>

            <div className="rounded-[var(--radius)] border border-accent/30 bg-accent-soft/60 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">
                Santi Design Agent
              </p>
              <p className="mt-2 font-display text-2xl text-ink">
                {lang === "de"
                  ? "Konzept automatisch erzeugen"
                  : "Generar concepto automático"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {lang === "de"
                  ? "HTML-Preview responsive in Minuten. Kein Claude Design Embed — dein Agent mit Design System."
                  : "Preview HTML responsive en minutos. No es Claude Design embebido — tu agente con design system."}
              </p>
              <p className="mt-2 text-sm text-muted">
                {lang === "de" ? "Empfohlen:" : "Recomendado:"}{" "}
                <strong className="text-ink">{result.packageLabel}</strong>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={runDesign}
                  disabled={designPending}
                  className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {designPending
                    ? designStage ||
                      (lang === "de" ? "Generiere…" : "Generando…")
                    : lang === "de"
                      ? "Konzept + Bilder"
                      : "Concepto + imágenes"}
                </button>
                {conceptPath ? (
                  <Link
                    href={conceptPath}
                    className="rounded-full border border-ink/20 bg-surface px-5 py-3 text-sm font-medium text-ink"
                  >
                    {lang === "de" ? "Konzept öffnen" : "Abrir concepto"}
                  </Link>
                ) : null}
                <a
                  href={whatsappHref(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink/20 bg-surface px-5 py-3 text-sm font-medium text-ink"
                >
                  WhatsApp
                </a>
              </div>
              {designError ? (
                <p className="mt-3 text-sm text-accent-hot">{designError}</p>
              ) : null}
              {conceptPath ? (
                <p className="mt-3 text-sm text-accent">
                  {lang === "de" ? "Fertig:" : "Listo:"}{" "}
                  <Link href={conceptPath} className="underline">
                    {conceptPath}
                  </Link>
                  {conceptMeta?.specialty ? (
                    <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">
                      {conceptMeta.specialty}
                    </span>
                  ) : null}
                  {conceptMeta?.imageSource ? (
                    <span className="ml-2 text-xs text-muted">
                      art: {conceptMeta.art || "premium"} · fotos:{" "}
                      {conceptMeta.imageSource}
                      {conceptMeta.source ? ` · html: ${conceptMeta.source}` : ""}
                    </span>
                  ) : null}
                  {conceptMeta?.collected ? (
                    <span className="mt-2 block text-xs text-muted">
                      {lang === "de" ? "Aus Website gelesen:" : "Leído del sitio:"}{" "}
                      {conceptMeta.collected.phones} tel ·{" "}
                      {conceptMeta.collected.hours} horarios ·{" "}
                      {conceptMeta.collected.addresses} dirección ·{" "}
                      {conceptMeta.collected.highlights} temas ·{" "}
                      {conceptMeta.collected.nav} menú
                    </span>
                  ) : null}
                </p>
              ) : null}
              <p className="mt-4 text-xs text-muted">
                {lang === "de"
                  ? "Beste Qualität: ANTHROPIC_API_KEY + HF_KEY (Nano Banana Pro). Ohne HF: Unsplash."
                  : "Mejor calidad: ANTHROPIC_API_KEY + HF_KEY (Nano Banana Pro). Sin HF: Unsplash."}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-center text-xs uppercase tracking-[0.18em] text-muted">
              {lang === "de"
                ? "So auf jedem Gerät (Konzept)"
                : "Así en cada dispositivo (concepto)"}
            </p>
            <PreviewDevices result={result} />
            <p className="mt-4 text-center text-xs text-muted">
              {lang === "de"
                ? "Kein offizieller Relaunch — Pitch-Vorschau."
                : "No es un relanzamiento oficial — preview de pitch."}
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
