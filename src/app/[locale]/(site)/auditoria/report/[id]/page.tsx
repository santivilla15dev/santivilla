import Link from "next/link";
import { AuditReportActions } from "@/components/audit-report-actions";
import { LighthouseReport } from "@/components/lighthouse-report";
import { getAuditReport } from "@/lib/audit/store";
import { formatMs } from "@/lib/audit/pagespeed";
import { getMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const report = await getAuditReport(id);
  return {
    title: report
      ? `Mobile Erst — ${report.hostname}`
      : "Mobile Erst Report",
    robots: { index: false, follow: false },
  };
}

export default async function AuditReportPage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const report = await getAuditReport(id);
  if (!report) notFound();

  const labels = getMessages(locale).audit;
  const lang = report.lang === "de" ? "de" : "es";
  const diagnosis = report.diagnosis;

  return (
    <div className="audit-report-print site-shell py-10 sm:py-14">
      <AuditReportActions
        labels={labels}
        lang={lang}
        audioScript={diagnosis?.audioScript}
      />

      <header className="border-b border-line pb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Mobile Erst · Report
        </p>
        <h1 className="font-display mt-2 text-4xl text-ink">{report.hostname}</h1>
        <p className="mt-1 text-sm text-muted">{report.url}</p>
        <p className="mt-1 text-xs text-muted">
          {new Date(report.scannedAt).toLocaleString(locale === "de" ? "de-AT" : "es")}
        </p>
      </header>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-line bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {labels.uxScoreLabel}
          </p>
          <p className="font-display mt-2 text-5xl text-ink">
            {report.uxScore}
            <span className="text-lg text-muted"> / 100 · {report.grade}</span>
          </p>
        </div>
        {report.lighthouse ? (
          <div className="rounded-[var(--radius)] border border-line bg-surface p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {labels.lighthouseLabel}
            </p>
            <p className="font-display mt-2 text-5xl text-ink">
              {report.lighthouse.performance}
              <span className="text-lg text-muted"> / 100</span>
            </p>
          </div>
        ) : null}
      </section>

      {diagnosis ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink">{labels.diagnosisTitle}</h2>
          <p className="mt-3 text-lg text-ink">{diagnosis.headline}</p>
          <p className="mt-2 text-muted">{diagnosis.executiveSummary}</p>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            {labels.criticalPointsTitle}
          </h3>
          <ol className="mt-4 space-y-4">
            {diagnosis.criticalPoints.map((point) => (
              <li
                key={point.title}
                className="rounded-[var(--radius)] border border-line bg-surface-2 p-4"
              >
                <p className="font-medium text-ink">{point.title}</p>
                <p className="mt-1 text-sm text-muted">{point.impact}</p>
                <p className="mt-2 text-sm text-ink">
                  <span className="font-medium">{labels.reportRecommendation}:</span>{" "}
                  {point.recommendation}
                </p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {report.lighthouse ? (
        <section className="mt-10 rounded-[var(--radius)] border border-line bg-ink p-6 text-surface">
          <LighthouseReport
            lighthouse={report.lighthouse}
            labels={labels}
            loading={false}
            failed={false}
            unavailable={false}
          />
          <p className="mt-4 text-xs text-surface/50">
            LCP {formatMs(report.lighthouse.lcpMs)} · FCP{" "}
            {formatMs(report.lighthouse.fcpMs)} · CLS {report.lighthouse.cls.toFixed(3)}
          </p>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Findings</h2>
        <ul className="mt-4 space-y-3">
          {report.findings
            .filter((f) => f.severity !== "ok")
            .map((f) => (
              <li key={f.id} className="border-t border-line pt-3">
                <p className="text-xs font-semibold uppercase text-accent-hot">
                  {f.severity} · {f.title}
                </p>
                <p className="text-sm text-muted">{f.detail}</p>
              </li>
            ))}
        </ul>
      </section>

      {report.conceptId ? (
        <p className="mt-10 text-sm">
          <Link
            href={localizedPath(locale, `/concepto/${report.conceptId}`)}
            className="text-accent hover:underline"
          >
            → Konzept ansehen
          </Link>
        </p>
      ) : null}

      <footer className="mt-12 border-t border-line pt-6 text-xs text-muted">
        Santi Villa · santivilla.com · Konzept-Report — keine offizielle Bewertung des Betriebs
      </footer>
    </div>
  );
}
