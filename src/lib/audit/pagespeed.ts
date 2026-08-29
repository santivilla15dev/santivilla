import type { LighthouseMetrics } from "./types";

const PSI_ENDPOINT =
  "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";

const TIMEOUT_MS = 25_000;

type PsiAudit = {
  numericValue?: number;
  score?: number | null;
};

type PsiResponse = {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number | null };
      accessibility?: { score?: number | null };
    };
    audits?: Record<string, PsiAudit>;
  };
  error?: { message?: string };
};

function auditMs(
  audits: Record<string, PsiAudit> | undefined,
  id: string,
): number {
  const value = audits?.[id]?.numericValue;
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function categoryScore(
  raw: number | null | undefined,
): number {
  if (typeof raw !== "number" || !Number.isFinite(raw)) return 0;
  return Math.round(raw * 100);
}

function parsePsiResponse(data: PsiResponse): LighthouseMetrics | null {
  const lr = data.lighthouseResult;
  if (!lr?.categories) return null;

  const audits = lr.audits ?? {};
  const clsAudit = audits["cumulative-layout-shift"];
  const cls =
    typeof clsAudit?.numericValue === "number"
      ? clsAudit.numericValue
      : typeof clsAudit?.score === "number"
        ? clsAudit.score
        : 0;

  return {
    strategy: "mobile",
    performance: categoryScore(lr.categories.performance?.score),
    accessibility: categoryScore(lr.categories.accessibility?.score),
    fcpMs: auditMs(audits, "first-contentful-paint"),
    lcpMs: auditMs(audits, "largest-contentful-paint"),
    tbtMs: auditMs(audits, "total-blocking-time"),
    cls,
    speedIndexMs: auditMs(audits, "speed-index"),
    ttiMs: auditMs(audits, "interactive"),
    fetchedAt: new Date().toISOString(),
  };
}

export function isPageSpeedConfigured(): boolean {
  return Boolean(process.env.PAGESPEED_API_KEY?.trim());
}

export async function fetchPageSpeedInsights(
  url: URL,
  strategy: "mobile" | "desktop" = "mobile",
): Promise<LighthouseMetrics | null> {
  const apiKey = process.env.PAGESPEED_API_KEY?.trim();
  if (!apiKey) return null;

  const params = new URLSearchParams({
    url: url.toString(),
    key: apiKey,
    strategy,
  });
  params.append("category", "performance");
  params.append("category", "accessibility");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("[pagespeed] HTTP", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = (await res.json()) as PsiResponse;
    if (data.error?.message) {
      console.warn("[pagespeed]", data.error.message);
      return null;
    }

    return parsePsiResponse(data);
  } catch (err) {
    console.warn(
      "[pagespeed]",
      err instanceof Error ? err.message : "fetch failed",
    );
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export function formatMs(ms: number): string {
  if (!ms || ms <= 0) return "—";
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

export function formatCls(cls: number): string {
  if (!cls && cls !== 0) return "—";
  return cls.toFixed(2);
}

export type VitalRating = "good" | "needs-improvement" | "poor";

export function rateLcp(ms: number): VitalRating {
  if (ms <= 0) return "needs-improvement";
  if (ms <= 2500) return "good";
  if (ms <= 4000) return "needs-improvement";
  return "poor";
}

export function rateFcp(ms: number): VitalRating {
  if (ms <= 0) return "needs-improvement";
  if (ms <= 1800) return "good";
  if (ms <= 3000) return "needs-improvement";
  return "poor";
}

export function rateCls(cls: number): VitalRating {
  if (cls <= 0.1) return "good";
  if (cls <= 0.25) return "needs-improvement";
  return "poor";
}

export function rateTbt(ms: number): VitalRating {
  if (ms <= 0) return "needs-improvement";
  if (ms <= 200) return "good";
  if (ms <= 600) return "needs-improvement";
  return "poor";
}
