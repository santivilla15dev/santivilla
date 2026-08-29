/**
 * Recolecta datos que YA están en el sitio del cliente
 * (teléfono, horarios, dirección, etc.) para el concepto.
 */

export type SiteFacts = {
  title: string;
  description: string;
  phones: string[];
  emails: string[];
  whatsapp: string | null;
  addresses: string[];
  hoursLines: string[];
  socialLinks: { label: string; href: string }[];
  navLabels: string[];
  ctas: string[];
  highlights: string[];
  rawSnippets: string[];
};

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(items: string[], max = 12) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const v = raw.replace(/\s+/g, " ").trim();
    if (!v || v.length < 3) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
    if (out.length >= max) break;
  }
  return out;
}

function metaContent(html: string, name: string) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  return html.match(re)?.[1] || html.match(re2)?.[1] || "";
}

function extractTitle(html: string) {
  return stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function hrefValues(html: string, scheme: RegExp) {
  const out: string[] = [];
  const re = /href=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const href = m[1].trim();
    if (scheme.test(href)) out.push(href);
  }
  return out;
}

function normalizePhone(raw: string) {
  const cleaned = raw
    .replace(/^tel:/i, "")
    .replace(/[^\d+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 32);
}

function phonesFromText(text: string) {
  const found: string[] = [];
  const patterns = [
    /\+43[\s./-]?\d[\d\s./-]{6,18}\d/g,
    /\b0\d{1,4}[\s./-]?\d{3,}[\s./-]?\d{2,}\b/g,
    /\(\+?\d{1,4}\)[\s./-]?\d[\d\s./-]{5,}\d/g,
  ];
  for (const re of patterns) {
    const matches = text.match(re) || [];
    for (const m of matches) found.push(normalizePhone(m));
  }
  return found;
}

function extractJsonLdFacts(html: string): Partial<SiteFacts> {
  const phones: string[] = [];
  const emails: string[] = [];
  const addresses: string[] = [];
  const hoursLines: string[] = [];
  const descriptions: string[] = [];
  const highlights: string[] = [];

  const blocks = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  if (!blocks) {
    return { phones, emails, addresses, hoursLines, highlights };
  }

  for (const block of blocks) {
    const raw = block.replace(/^[\s\S]*?>/, "").replace(/<\/script>$/i, "");
    try {
      const data = JSON.parse(raw) as unknown;
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        walkJsonLd(node, {
          phones,
          emails,
          addresses,
          hoursLines,
          descriptions,
          highlights,
        });
      }
    } catch {
      // JSON-LD malformado: ignorar
    }
  }

  return {
    phones: uniq(phones),
    emails: uniq(emails),
    addresses: uniq(addresses),
    hoursLines: uniq(hoursLines),
    description: descriptions[0] || "",
    highlights: uniq(highlights, 20),
  };
}

function walkJsonLd(
  node: unknown,
  bag: {
    phones: string[];
    emails: string[];
    addresses: string[];
    hoursLines: string[];
    descriptions: string[];
    highlights: string[];
  },
) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) walkJsonLd(item, bag);
    return;
  }
  const obj = node as Record<string, unknown>;

  if (typeof obj.telephone === "string") bag.phones.push(normalizePhone(obj.telephone));
  if (typeof obj.email === "string") bag.emails.push(obj.email);
  if (typeof obj.description === "string") bag.descriptions.push(obj.description);
  if (typeof obj.name === "string" && obj.name.length < 60) {
    bag.highlights.push(obj.name);
  }

  const hours = obj.openingHours || obj.openingHoursSpecification;
  if (typeof hours === "string") bag.hoursLines.push(hours);
  if (Array.isArray(hours)) {
    for (const h of hours) {
      if (typeof h === "string") bag.hoursLines.push(h);
      else if (h && typeof h === "object") {
        const spec = h as Record<string, unknown>;
        const days = Array.isArray(spec.dayOfWeek)
          ? spec.dayOfWeek.join(", ")
          : String(spec.dayOfWeek || "");
        const open = String(spec.opens || "");
        const close = String(spec.closes || "");
        if (open || close) {
          bag.hoursLines.push(`${days} ${open}${close ? `–${close}` : ""}`.trim());
        }
      }
    }
  }

  const addr = obj.address;
  if (typeof addr === "string") bag.addresses.push(addr);
  if (addr && typeof addr === "object" && !Array.isArray(addr)) {
    const a = addr as Record<string, unknown>;
    const line = [a.streetAddress, a.postalCode, a.addressLocality, a.addressCountry]
      .filter((x) => typeof x === "string" && x)
      .join(", ");
    if (line) bag.addresses.push(line);
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") walkJsonLd(value, bag);
  }
}

function extractHoursFromText(text: string) {
  const lines: string[] = [];
  // Frases típicas DE/ES cerca de Öffnungszeiten / Horarios
  const windowRe =
    /(?:öffnungszeiten|oeffnungszeiten|opening hours|horarios|heute geöffnet|abierto)[:\s]{0,20}(.{10,160})/gi;
  let m: RegExpExecArray | null;
  while ((m = windowRe.exec(text))) {
    lines.push(m[1].replace(/\s+/g, " ").trim());
  }

  const dayRe =
    /\b(?:Mo|Di|Mi|Do|Fr|Sa|So|Mon|Tue|Wed|Thu|Fri|Sat|Sun|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Lun|Mar|Mié|Jue|Vie|Sáb|Dom)[a-zäöüß.]*\s*[-–bisàto]*\s*(?:Mo|Di|Mi|Do|Fr|Sa|So|Mon|Tue|Wed|Thu|Fri|Sat|Sun|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Lun|Mar|Mié|Jue|Vie|Sáb|Dom)?[a-zäöüß.]*\s*[:.]?\s*\d{1,2}[:.]\d{2}\s*[-–]\s*\d{1,2}[:.]\d{2}/gi;
  const dayMatches = text.match(dayRe) || [];
  for (const d of dayMatches) lines.push(d);

  return uniq(lines, 8);
}

function extractAddresses(text: string) {
  const found: string[] = [];
  const postal = text.match(
    /\b([A-ZÄÖÜ][A-Za-zÄÖÜäöüß\-]+(?:straße|strasse|gasse|platz|weg|ring)?\s+\d+[a-zA-Z]?)\s*,?\s*(\d{4})\s+(Wien|Vienna|Austria|Österreich)\b/gi,
  );
  if (postal) found.push(...postal);

  const simple = text.match(/\b\d{4}\s+Wien(?:[,\s]+[A-Za-zÄÖÜäöüß\-]+\s+\d+)?\b/gi);
  if (simple) found.push(...simple);

  return uniq(found, 6);
}

function extractNavLabels(html: string) {
  const labels: string[] = [];
  const navBlocks = html.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  const headerBlocks = html.match(/<header[\s\S]*?<\/header>/gi) || [];
  const pool = [...navBlocks, ...headerBlocks.slice(0, 1)].join(" ");
  const source = pool || html.slice(0, 80_000);
  const re = /<a\s[^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    const label = stripTags(m[1]);
    if (label.length >= 2 && label.length <= 40 && !/^https?:/i.test(label)) {
      labels.push(label);
    }
  }
  return uniq(labels, 16);
}

function extractSocial(html: string) {
  const out: { label: string; href: string }[] = [];
  const map: [RegExp, string][] = [
    [/facebook\.com/i, "Facebook"],
    [/instagram\.com/i, "Instagram"],
    [/tiktok\.com/i, "TikTok"],
    [/linkedin\.com/i, "LinkedIn"],
    [/youtube\.com|youtu\.be/i, "YouTube"],
    [/maps\.google|google\.com\/maps/i, "Google Maps"],
  ];
  const re = /href=["'](https?:\/\/[^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const href = m[1];
    for (const [pattern, label] of map) {
      if (pattern.test(href)) {
        out.push({ label, href: href.slice(0, 200) });
        break;
      }
    }
  }
  const seen = new Set<string>();
  return out.filter((x) => {
    if (seen.has(x.label)) return false;
    seen.add(x.label);
    return true;
  }).slice(0, 8);
}

function extractCtas(html: string, text: string) {
  const words = [
    "Reservieren",
    "Reservar",
    "Speisekarte",
    "Menü",
    "Menu",
    "Kontakt",
    "Contacto",
    "Anfahrt",
    "Öffnungszeiten",
    "Horarios",
    "Termin",
    "WhatsApp",
    "Shops",
    "Geschäfte",
    "Kino",
    "Parken",
  ];
  const hit = words.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(`${html} ${text}`));
  return uniq(hit, 12);
}

function extractHighlights(html: string, text: string) {
  const items: string[] = [];
  const lis = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  for (const li of lis.slice(0, 80)) {
    const label = stripTags(li);
    if (label.length >= 3 && label.length <= 50) items.push(label);
  }
  const h2s = html.match(/<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/gi) || [];
  for (const h of h2s.slice(0, 20)) {
    const label = stripTags(h);
    if (label.length >= 3 && label.length <= 60) items.push(label);
  }
  // Palabras útiles del cuerpo (centros / gastronomía)
  const keywordHits =
    text.match(
      /\b(Kino|Shops|Ärztezentrum|Gastronomie|Parkhaus|Fitness|Supermarkt|Pizza|Pasta|Frühstück|Brunch|Delivery|Lieferung)\b/gi,
    ) || [];
  items.push(...keywordHits);
  return uniq(items, 20);
}

function rawUsefulSnippets(text: string) {
  const chunks = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 220)
    .filter((s) =>
      /wien|öffn|horario|pizza|shop|kontakt|telefon|gasse|straße|reserv/i.test(s),
    );
  return uniq(chunks, 8);
}

export function extractSiteFacts(html: string, url: string): SiteFacts {
  const text = stripTags(html).slice(0, 30_000);
  const jsonLd = extractJsonLdFacts(html);

  const telHrefs = hrefValues(html, /^tel:/i).map(normalizePhone);
  const mailHrefs = hrefValues(html, /^mailto:/i).map((h) =>
    h.replace(/^mailto:/i, "").split("?")[0],
  );
  const waHref =
    hrefValues(html, /wa\.me|api\.whatsapp/i)[0]?.replace(/^.*?(?=https?:)/i, "") ||
    html.match(/https?:\/\/(?:wa\.me|api\.whatsapp\.com)\/[^\s"'<>]+/i)?.[0] ||
    null;

  const phones = uniq([
    ...(jsonLd.phones || []),
    ...telHrefs,
    ...phonesFromText(text),
  ]);
  const emails = uniq([...(jsonLd.emails || []), ...mailHrefs]);
  const addresses = uniq([
    ...(jsonLd.addresses || []),
    ...extractAddresses(text),
  ]);
  const hoursLines = uniq([
    ...(jsonLd.hoursLines || []),
    ...extractHoursFromText(text),
  ]);

  const description =
    jsonLd.description ||
    metaContent(html, "description") ||
    metaContent(html, "og:description") ||
    "";

  return {
    title: extractTitle(html) || new URL(url).hostname,
    description: description.slice(0, 400),
    phones,
    emails,
    whatsapp: waHref ? waHref.slice(0, 200) : null,
    addresses,
    hoursLines,
    socialLinks: extractSocial(html),
    navLabels: extractNavLabels(html),
    ctas: extractCtas(html, text),
    highlights: uniq([...(jsonLd.highlights || []), ...extractHighlights(html, text)], 20),
    rawSnippets: rawUsefulSnippets(text),
  };
}

/** Texto compacto para prompts / plantillas */
export function siteFactsSummary(facts: SiteFacts): string {
  const lines = [
    `Title: ${facts.title}`,
    facts.description ? `Description: ${facts.description}` : "",
    facts.phones.length ? `Phones: ${facts.phones.join(" · ")}` : "Phones: (none found)",
    facts.emails.length ? `Emails: ${facts.emails.join(" · ")}` : "",
    facts.whatsapp ? `WhatsApp: ${facts.whatsapp}` : "",
    facts.addresses.length
      ? `Addresses: ${facts.addresses.join(" · ")}`
      : "Addresses: (none found)",
    facts.hoursLines.length
      ? `Hours: ${facts.hoursLines.join(" | ")}`
      : "Hours: (none found)",
    facts.navLabels.length ? `Nav: ${facts.navLabels.join(", ")}` : "",
    facts.ctas.length ? `CTAs seen: ${facts.ctas.join(", ")}` : "",
    facts.highlights.length ? `Highlights: ${facts.highlights.join(", ")}` : "",
    facts.socialLinks.length
      ? `Social: ${facts.socialLinks.map((s) => s.label).join(", ")}`
      : "",
    facts.rawSnippets.length
      ? `Snippets: ${facts.rawSnippets.slice(0, 4).join(" / ")}`
      : "",
  ];
  return lines.filter(Boolean).join("\n");
}
