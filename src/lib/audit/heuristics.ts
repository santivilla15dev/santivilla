import type {
  AuditHtmlSnippets,
  AuditLang,
  AuditResult,
  BusinessTemplate,
  Finding,
} from "./types";
import { hasCivicSignals } from "@/lib/design-system/classify-site";

const PRIVATE_HOST =
  /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|0\.0\.0\.0|\[::1\]|metadata\.google|169\.254\.)/i;

export function normalizeAuditUrl(raw: string): URL {
  const trimmed = raw.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  const url = new URL(withProtocol);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("INVALID_PROTOCOL");
  }
  if (PRIVATE_HOST.test(url.hostname) || url.hostname === "0") {
    throw new Error("PRIVATE_HOST");
  }
  return url;
}

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]).slice(0, 120) : "";
}

function hasViewport(html: string) {
  return /name=["']viewport["']/i.test(html);
}

function hasResponsiveCss(html: string) {
  return (
    /@media\s*\(/i.test(html) ||
    /max-width\s*:\s*100%/i.test(html) ||
    /srcset=/i.test(html) ||
    /sizes=["']/i.test(html) ||
    /clamp\(/i.test(html)
  );
}

function hasFixedDesktopLayout(html: string) {
  return (
    /width\s*=\s*["']?\d{3,4}/i.test(html) ||
    /style=["'][^"']*width\s*:\s*\d{3,4}px/i.test(html) ||
    /<table[^>]*width\s*=\s*["']?(7|8|9|10)\d{2}/i.test(html)
  );
}

function countAnchors(html: string) {
  return (html.match(/<a\s/gi) ?? []).length;
}

function detectTemplate(html: string, text: string, url: URL): BusinessTemplate {
  const blob = `${html} ${text}`;
  if (hasCivicSignals(url.toString(), blob)) {
    return "civic";
  }
  const lower = blob.toLowerCase();
  if (
    /restaurant|gasthaus|speisekarte|menu|gastro|küche|kitchen|reserv/.test(
      lower,
    )
  ) {
    return "restaurant";
  }
  if (
    /shopping|einkauf|mall|center|shops|kino|ärztezentrum|lugner|plaza/.test(
      lower,
    )
  ) {
    return "center";
  }
  return "shop";
}

function t(
  lang: AuditLang,
  es: string,
  de: string,
) {
  return lang === "de" ? de : es;
}

function gradeFromScore(score: number): AuditResult["grade"] {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

function extractPdfLinks(html: string): string[] {
  const links = new Set<string>();
  const hrefRe = /href=["']([^"']+\.pdf[^"']*)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRe.exec(html))) {
    const href = m[1].trim();
    if (href.length < 500) links.add(href);
  }
  if (/application\/pdf/i.test(html)) {
    links.add("(embedded PDF)");
  }
  return [...links].slice(0, 8);
}

export function extractHtmlSnippets(
  html: string,
  fetchMs: number,
): AuditHtmlSnippets {
  const pdfLinks = extractPdfLinks(html);
  const menuInPdf =
    pdfLinks.length > 0 &&
    /menu|speisekarte|carta|karte|menü|menú/i.test(html);
  return {
    pdfLinks,
    menuInPdf,
    hasWhatsApp: /wa\.me|api\.whatsapp|whatsapp/i.test(html),
    fetchMs,
  };
}

export function analyzeHtml(
  url: URL,
  html: string,
  lang: AuditLang,
  fetchMs: number,
): AuditResult {
  const text = stripTags(html).slice(0, 20_000);
  const title = extractTitle(html) || url.hostname;
  const lower = html.toLowerCase();

  const findings: Finding[] = [];
  let score = 100;

  const viewport = hasViewport(html);
  if (!viewport) {
    score -= 25;
    findings.push({
      id: "viewport",
      severity: "critical",
      title: t(lang, "Sin viewport responsive", "Kein responsives Viewport"),
      detail: t(
        lang,
        "Sin meta viewport el layout no se adapta: mal en móvil y tablet.",
        "Ohne Meta-Viewport bricht das Layout auf Handy und Tablet.",
      ),
    });
  } else {
    findings.push({
      id: "viewport",
      severity: "ok",
      title: t(lang, "Viewport OK", "Viewport OK"),
      detail: t(
        lang,
        "Hay meta viewport — base para adaptarse a cada pantalla.",
        "Meta-Viewport vorhanden — Basis für alle Bildschirmgrößen.",
      ),
    });
  }

  const responsive = hasResponsiveCss(html);
  const fixedLayout = hasFixedDesktopLayout(html);
  if (!responsive && fixedLayout) {
    score -= 16;
    findings.push({
      id: "responsive",
      severity: "critical",
      title: t(lang, "Layout fijo (no responsive)", "Fixes Layout (nicht responsive)"),
      detail: t(
        lang,
        "Anchos fijos tipo desktop antiguo: se ve mal en móvil, tablet y ventanas pequeñas.",
        "Feste Desktop-Breiten — schlecht auf Handy, Tablet und schmalen Fenstern.",
      ),
    });
  } else if (!responsive) {
    score -= 10;
    findings.push({
      id: "responsive",
      severity: "warn",
      title: t(lang, "Pocas señales responsive", "Wenig Responsive-Signale"),
      detail: t(
        lang,
        "No detecto media queries / fluid width claros para todos los dispositivos.",
        "Kaum Media Queries / fluide Breiten für alle Geräte erkannt.",
      ),
    });
  } else {
    findings.push({
      id: "responsive",
      severity: "ok",
      title: t(lang, "Señales responsive", "Responsive-Signale"),
      detail: t(
        lang,
        "Hay pistas de diseño adaptable (media queries, fluid width o srcset).",
        "Anpassbares Design erkennbar (Media Queries, fluide Breite oder srcset).",
      ),
    });
  }

  const hasTel = /href=["']tel:/i.test(html);
  const hasWhatsApp = /wa\.me|api\.whatsapp|whatsapp/i.test(html);
  if (!hasTel && !hasWhatsApp) {
    score -= 18;
    findings.push({
      id: "cta-contact",
      severity: "critical",
      title: t(lang, "Sin llamada / WhatsApp", "Kein Anruf / WhatsApp"),
      detail: t(
        lang,
        "No hay CTA claro para llamar o escribir. En local eso pierde clientes.",
        "Kein klarer Call-to-Action zum Anrufen oder Schreiben.",
      ),
    });
  } else {
    findings.push({
      id: "cta-contact",
      severity: "ok",
      title: t(lang, "Contacto táctil", "Direkter Kontakt"),
      detail: t(
        lang,
        hasWhatsApp
          ? "Hay rastro de WhatsApp — bien para cerrar."
          : "Hay enlace tel: — el cliente puede llamar en 1 tap.",
        hasWhatsApp
          ? "WhatsApp erkennbar — gut zum Abschließen."
          : "tel:-Link vorhanden — Anruf in einem Tap.",
      ),
    });
  }

  const hasHours =
    /öffnung|oeffnung|öffnungszeiten|horario|hours|mo\s*[-–]\s*fr|montag|dienstag|abierto/i.test(
      `${html} ${text}`,
    );
  if (!hasHours) {
    score -= 12;
    findings.push({
      id: "hours",
      severity: "warn",
      title: t(lang, "Horarios poco visibles", "Zeiten schwer findbar"),
      detail: t(
        lang,
        "No detecto Öffnungszeiten claros cerca del contenido principal.",
        "Keine klaren Öffnungszeiten im sichtbaren Content erkannt.",
      ),
    });
  } else {
    findings.push({
      id: "hours",
      severity: "ok",
      title: t(lang, "Horarios presentes", "Öffnungszeiten vorhanden"),
      detail: t(
        lang,
        "Hay señales de horarios en el HTML.",
        "Öffnungszeiten im HTML erkennbar.",
      ),
    });
  }

  const hasMap =
    /maps\.google|google\.com\/maps|openstreetmap|anfahrt|cómo llegar|directions/i.test(
      lower,
    );
  if (!hasMap) {
    score -= 8;
    findings.push({
      id: "map",
      severity: "warn",
      title: t(lang, "Anfahrt / mapa débil", "Anfahrt / Karte schwach"),
      detail: t(
        lang,
        "No veo mapa o bloque de cómo llegar fácil de encontrar.",
        "Keine klare Karte oder Anfahrt erkannt.",
      ),
    });
  }

  const tables = (html.match(/<table/gi) ?? []).length;
  if (tables >= 3) {
    score -= 10;
    findings.push({
      id: "tables",
      severity: "warn",
      title: t(lang, "Layout de tablas", "Tabellen-Layout"),
      detail: t(
        lang,
        "Muchas tablas suelen romper el layout en pantallas chicas y medianas.",
        "Viele Tabellen brechen Layouts auf kleinen und mittleren Screens.",
      ),
    });
  }

  if (/<frameset|<frame\s/i.test(html)) {
    score -= 20;
    findings.push({
      id: "frames",
      severity: "critical",
      title: t(lang, "Frames antiguos", "Alte Frames"),
      detail: t(
        lang,
        "Frameset/frame: legacy — malo en cualquier dispositivo moderno.",
        "Frameset/Frame: Legacy — schlecht auf jedem modernen Gerät.",
      ),
    });
  }

  const anchors = countAnchors(html);
  if (anchors > 80) {
    score -= 8;
    findings.push({
      id: "nav-heavy",
      severity: "warn",
      title: t(lang, "Navegación pesada", "Schwere Navigation"),
      detail: t(
        lang,
        `Detecté ~${anchors} enlaces. En móvil/tablet es un laberinto; en desktop también abruma.`,
        `Ca. ${anchors} Links — auf Handy/Tablet Labyrinth, am Desktop oft überladen.`,
      ),
    });
  }

  if (fetchMs > 2500) {
    score -= 10;
    findings.push({
      id: "slow",
      severity: "warn",
      title: t(lang, "Respuesta lenta", "Langsame Antwort"),
      detail: t(
        lang,
        `El HTML tardó ~${Math.round(fetchMs)} ms. Duele en 4G y también en Wi‑Fi de oficina.`,
        `HTML brauchte ~${Math.round(fetchMs)} ms — nervig auf 4G und Büro-WLAN.`,
      ),
    });
  }

  const pdfLinks = extractPdfLinks(html);
  if (pdfLinks.length > 0) {
    const menuPdf = /menu|speisekarte|carta|karte|menü|menú/i.test(
      `${html} ${pdfLinks.join(" ")}`,
    );
    score -= menuPdf ? 14 : 8;
    findings.push({
      id: "pdf-menu",
      severity: menuPdf ? "critical" : "warn",
      title: t(
        lang,
        menuPdf ? "Menú en PDF" : "Enlaces a PDF",
        menuPdf ? "Speisekarte als PDF" : "PDF-Links",
      ),
      detail: t(
        lang,
        menuPdf
          ? `Carta/menú en PDF (${pdfLinks.length} enlace(s)) — en 4G puede tardar 5–10 s antes de ver platos.`
          : `Detecté ${pdfLinks.length} PDF(s). En móvil son lentos y difíciles de leer.`,
        menuPdf
          ? `Menü als PDF (${pdfLinks.length} Link(s)) — auf 4G oft 5–10 s bis Gäste Gerichte sehen.`
          : `${pdfLinks.length} PDF-Link(s) — auf dem Handy langsam und unhandlich.`,
      ),
    });
  }

  // Señales legacy markup-aware: el patrón debe aparecer en etiquetas/atributos,
  // no en el texto visible (una web moderna que *menciona* Typo3 en su copy no
  // es legacy). paths tipo /typo3conf/ o /wp-content/ solo salen en src/href.
  const generatorMeta =
    html.match(/<meta[^>]+name=["']generator["'][^>]*>/i)?.[0] ?? "";
  const looksLegacy =
    /typo3|wordpress|joomla|drupal/i.test(generatorMeta) ||
    /\/typo3conf\/|\/typo3temp\/|\/fileadmin\/|\/wp-content\/|\/wp-includes\//i.test(
      html,
    ) ||
    /<script[^>]+src=["'][^"']*jquery/i.test(html) ||
    /document\.write\s*\(/i.test(html) ||
    /spacer\.gif/i.test(html) ||
    /<font\s/i.test(html) ||
    tables >= 4;
  if (looksLegacy && viewport === false) {
    // already penalized viewport
  } else if (looksLegacy) {
    score -= 6;
    findings.push({
      id: "legacy",
      severity: "warn",
      title: t(lang, "Señales de web legacy", "Legacy-Signale"),
      detail: t(
        lang,
        "Patrones viejos (CMS/clásicos). Suele verse bien solo en un monitor grande.",
        "Alte Muster (CMS/klassisch) — oft nur auf großem Monitor ok.",
      ),
    });
  }

  // Keep top findings ordered: critical → warn → ok
  findings.sort((a, b) => {
    const order = { critical: 0, warn: 1, ok: 2 };
    return order[a.severity] - order[b.severity];
  });

  score = Math.max(5, Math.min(100, score));
  const grade = gradeFromScore(score);
  const template = detectTemplate(html, text, url);

  const packageId =
    score < 45 ? "negocio" : score < 70 ? "negocio" : "landing";
  const packageLabel =
    packageId === "landing"
      ? t(lang, "Landing responsive", "Responsive Landing")
      : t(lang, "Sitio negocio completo", "Komplette Business-Website");

  const verdict =
    score < 40
      ? t(
          lang,
          "En un monitor grande puede “pasar”… en móvil, tablet y ventanas chicas se cae.",
          "Am großen Monitor ok — auf Handy, Tablet und schmalen Fenstern fällt sie durch.",
        )
      : score < 70
        ? t(
            lang,
            "A medias en varios dispositivos: demasiados taps y poco layout fluido.",
            "Teilweise ok — zu viele Taps, wenig flüssiges Layout auf allen Geräten.",
          )
        : t(
            lang,
            "Base decente en varios tamaños. Aún se puede ganar claridad y conversión.",
            "Solide Basis auf mehreren Größen — Klarheit und Conversion gehen noch besser.",
          );

  const previewName =
    title.replace(/\s*[-|].*$/, "").trim().slice(0, 40) || url.hostname;

  const agentLines =
    lang === "de"
      ? [
          score < 50
            ? "Responsive: Handy/Tablet/Desktop nicht durchgängig klar."
            : "Struktur ok — Layout auf allen Breakpoints noch härten.",
          hasWhatsApp || hasTel
            ? "Kontakt: da — muss auf jedem Gerät 1 Klick sein."
            : "CTA: fehlt. Ohne WhatsApp/Anruf verlierst du Gäste.",
          `Fix in 1 Sprint: ${packageLabel}.`,
        ]
      : [
          score < 50
            ? "Responsive: móvil/tablet/desktop no está claro de punta a punta."
            : "Estructura ok — endurecer el layout en todos los breakpoints.",
          hasWhatsApp || hasTel
            ? "Contacto: existe — debe ser 1 clic en cualquier dispositivo."
            : "CTA: falta. Sin WhatsApp/llamada pierdes clientes.",
          `Fix en 1 sprint: ${packageLabel}.`,
        ];

  const id = `${url.hostname.replace(/\W+/g, "-").slice(0, 40)}-${Date.now().toString(36)}`;

  return {
    id,
    url: url.toString(),
    hostname: url.hostname,
    title,
    uxScore: score,
    score,
    grade,
    verdict,
    findings: findings.slice(0, 7),
    packageId,
    packageLabel,
    template,
    previewName,
    agentLines,
    scannedAt: new Date().toISOString(),
    lighthouse: null,
  };
}

export async function fetchPageHtml(url: URL): Promise<{
  html: string;
  fetchMs: number;
}> {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "SantiVilla-MobileErst/1.0 (+https://santivilla.com/auditoria)",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`FETCH_${res.status}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!/text\/html|application\/xhtml/i.test(contentType) && contentType) {
      // some servers omit content-type; still try
      if (contentType && !contentType.includes("text") && !contentType.includes("html")) {
        throw new Error("NOT_HTML");
      }
    }

    const html = (await res.text()).slice(0, 500_000);
    return { html, fetchMs: Date.now() - started };
  } finally {
    clearTimeout(timeout);
  }
}
