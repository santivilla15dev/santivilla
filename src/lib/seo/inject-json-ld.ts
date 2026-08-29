import type { JsonLdGraph } from "./types";

const JSON_LD_RE =
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;

export function stripJsonLd(html: string): string {
  return html.replace(JSON_LD_RE, "").trim();
}

export function serializeJsonLd(graph: JsonLdGraph): string {
  return JSON.stringify(graph, null, 0);
}

export function injectJsonLd(html: string, graph: JsonLdGraph): string {
  const cleaned = stripJsonLd(html);
  const script = `<script type="application/ld+json">${serializeJsonLd(graph)}</script>`;

  if (/<\/head>/i.test(cleaned)) {
    return cleaned.replace(/<\/head>/i, `${script}\n</head>`);
  }

  if (/<html[\s>]/i.test(cleaned)) {
    return cleaned.replace(/<html[^>]*>/i, (m) => `${m}\n<head>${script}</head>`);
  }

  return `${script}\n${cleaned}`;
}
