/**
 * Case result defs for the home Resultados section.
 * Placeholder ids (`todo-*`) must be replaced when a real client grants permission.
 */

export type CaseResultItemMessages = {
  id: string;
  name: string;
  sector: string;
  metricLabel: string;
  /** Omitted for stadtgalerie-konzept — filled from benchmark at render */
  before?: string;
  after?: string;
  quote: string | null;
  isPlaceholder: boolean;
};

export type ResolvedCaseResult = {
  id: string;
  name: string;
  sector: string;
  metricLabel: string;
  before: string;
  after: string;
  quote: string | null;
  isPlaceholder: boolean;
};

/** Stable ids — keep in sync with home.resultsItems in es/de/en. */
export const CASE_RESULT_IDS = {
  stadtgalerie: "stadtgalerie-konzept",
  /** TODO: replace with real local café / business when permitted */
  cafe: "todo-local-cafe",
  /** TODO: replace with real salon / service business when permitted */
  salon: "todo-salon",
} as const;

export function resolveCaseResults(
  items: CaseResultItemMessages[],
  injected: Partial<Record<string, { before: string; after: string }>>,
): ResolvedCaseResult[] {
  return items.map((item) => {
    const override = injected[item.id];
    const before = override?.before ?? item.before ?? "—";
    const after = override?.after ?? item.after ?? "—";
    return {
      id: item.id,
      name: item.name,
      sector: item.sector,
      metricLabel: item.metricLabel,
      before,
      after,
      quote: item.quote,
      isPlaceholder: item.isPlaceholder,
    };
  });
}
