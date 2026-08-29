import type { AuditLang, AuditResult, Finding } from "./types";
import type { LighthouseMetrics } from "./types";
import { formatMs } from "./pagespeed";

function t(lang: AuditLang, es: string, de: string) {
  return lang === "de" ? de : es;
}

export function appendLighthouseFindings(
  result: AuditResult,
  lighthouse: LighthouseMetrics,
  lang: AuditLang,
): AuditResult {
  const extra: Finding[] = [];

  if (lighthouse.performance < 50) {
    extra.push({
      id: "lh-performance",
      severity: "critical",
      title: t(
        lang,
        `Performance Lighthouse baja (${lighthouse.performance}/100)`,
        `Lighthouse Performance niedrig (${lighthouse.performance}/100)`,
      ),
      detail: t(
        lang,
        "Google mide carga real en móvil. Por debajo de 50 suele perder visitantes en 4G.",
        "Google misst echte Mobile-Ladezeit. Unter 50 verlierst du Besucher auf 4G.",
      ),
    });
  } else if (lighthouse.performance < 70) {
    extra.push({
      id: "lh-performance",
      severity: "warn",
      title: t(
        lang,
        `Performance Lighthouse mejorable (${lighthouse.performance}/100)`,
        `Lighthouse Performance verbesserbar (${lighthouse.performance}/100)`,
      ),
      detail: t(
        lang,
        "Hay margen claro para acelerar LCP y bloqueo de JS.",
        "Klares Potenzial bei LCP und JS-Blockierung.",
      ),
    });
  }

  if (lighthouse.lcpMs > 2500) {
    extra.push({
      id: "lh-lcp",
      severity: lighthouse.lcpMs > 4000 ? "critical" : "warn",
      title: t(
        lang,
        `LCP lento (${formatMs(lighthouse.lcpMs)})`,
        `Langsames LCP (${formatMs(lighthouse.lcpMs)})`,
      ),
      detail: t(
        lang,
        "Largest Contentful Paint: el contenido principal tarda en aparecer en móvil.",
        "Largest Contentful Paint: Hauptinhalt erscheint zu spät auf dem Handy.",
      ),
    });
  }

  if (lighthouse.cls > 0.1) {
    extra.push({
      id: "lh-cls",
      severity: lighthouse.cls > 0.25 ? "critical" : "warn",
      title: t(
        lang,
        `Layout inestable (CLS ${lighthouse.cls.toFixed(2)})`,
        `Instabiles Layout (CLS ${lighthouse.cls.toFixed(2)})`,
      ),
      detail: t(
        lang,
        "Elementos que se mueven al cargar — mala experiencia táctil.",
        "Verschiebende Elemente beim Laden — schlechte Touch-Erfahrung.",
      ),
    });
  }

  if (lighthouse.accessibility < 70) {
    extra.push({
      id: "lh-a11y",
      severity: "warn",
      title: t(
        lang,
        `Accesibilidad Lighthouse (${lighthouse.accessibility}/100)`,
        `Lighthouse Barrierefreiheit (${lighthouse.accessibility}/100)`,
      ),
      detail: t(
        lang,
        "Contraste, labels o estructura pueden fallar en lectores de pantalla.",
        "Kontrast, Labels oder Struktur können für Screenreader scheitern.",
      ),
    });
  }

  const merged = [...result.findings, ...extra];
  merged.sort((a, b) => {
    const order = { critical: 0, warn: 1, ok: 2 };
    return order[a.severity] - order[b.severity];
  });

  return {
    ...result,
    findings: merged.slice(0, 9),
    lighthouse,
  };
}
