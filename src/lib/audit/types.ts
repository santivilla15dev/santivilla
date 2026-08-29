export type AuditLang = "es" | "de";

export type FindingSeverity = "critical" | "warn" | "ok";

export type Finding = {
  id: string;
  severity: FindingSeverity;
  title: string;
  detail: string;
};

export type BusinessTemplate = "restaurant" | "shop" | "center" | "civic";

export type LighthouseMetrics = {
  strategy: "mobile";
  performance: number;
  accessibility: number;
  fcpMs: number;
  lcpMs: number;
  tbtMs: number;
  cls: number;
  speedIndexMs: number;
  ttiMs: number;
  fetchedAt: string;
};

export type AuditResult = {
  id: string;
  url: string;
  hostname: string;
  title: string;
  /** Heuristic UX score (HTML signals). */
  uxScore: number;
  /** Alias of uxScore for backward compatibility. */
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  verdict: string;
  findings: Finding[];
  packageId: "landing" | "negocio" | "mensual";
  packageLabel: string;
  template: BusinessTemplate;
  previewName: string;
  agentLines: string[];
  scannedAt: string;
  lighthouse: LighthouseMetrics | null;
};

export type CriticalPoint = {
  title: string;
  impact: string;
  recommendation: string;
};

export type AiDiagnosis = {
  headline: string;
  executiveSummary: string;
  criticalPoints: CriticalPoint[];
  audioScript: string;
  generatedAt: string;
  source: "anthropic" | "fallback";
};

export type AuditHtmlSnippets = {
  pdfLinks: string[];
  menuInPdf: boolean;
  hasWhatsApp: boolean;
  fetchMs: number;
};

export type AuditReport = AuditResult & {
  lang?: AuditLang;
  diagnosis?: AiDiagnosis;
  conceptId?: string;
  htmlSnippets?: AuditHtmlSnippets;
};

export type AuditRequestBody = {
  url: string;
  lang?: AuditLang;
};
