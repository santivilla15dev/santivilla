import type { SiteContent } from "@/lib/crm/types";
import { getSite, getSiteContent } from "@/lib/crm/store";
import { getConcept, saveConcept } from "@/lib/design-system/store";
import { applySeoToConcept } from "@/lib/seo/sync-concept-seo";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDailyMenu(content: SiteContent, de: boolean): string {
  const today = new Date().toISOString().slice(0, 10);
  const entry =
    content.dailyMenu.find((m) => m.date === today) ??
    content.dailyMenu[content.dailyMenu.length - 1];

  if (!entry?.items?.length) {
    return de
      ? "<p>Heute kein Tagesmenü hinterlegt.</p>"
      : "<p>No hay menú del día publicado.</p>";
  }

  const items = entry.items
    .map((item) => {
      const price = item.price ? ` <span>${escapeHtml(item.price)}</span>` : "";
      const note = item.note ? ` <em>${escapeHtml(item.note)}</em>` : "";
      return `<li>${escapeHtml(item.name)}${price}${note}</li>`;
    })
    .join("");

  return `<ul>${items}</ul>`;
}

function renderHours(content: SiteContent, de: boolean): string {
  const today = new Date().toISOString().slice(0, 10);
  const override = content.hoursOverrides.find((o) => o.date === today);

  if (override?.closed) {
    return `<p>${escapeHtml(override.label || (de ? "Heute geschlossen" : "Cerrado hoy"))}</p>`;
  }

  if (override?.open && override?.close) {
    return `<p>${escapeHtml(override.label || (de ? "Heute" : "Hoy"))}: ${escapeHtml(override.open)} – ${escapeHtml(override.close)}</p>`;
  }

  const upcoming = content.hoursOverrides
    .filter((o) => o.date >= today)
    .slice(0, 3)
    .map((o) => {
      if (o.closed) return `${o.date}: ${o.label || (de ? "Geschlossen" : "Cerrado")}`;
      if (o.open && o.close) return `${o.date}: ${o.open}–${o.close}`;
      return o.label || o.date;
    });

  let html = "";
  if (content.hoursRegular && Array.isArray(content.hoursRegular)) {
    html = (content.hoursRegular as string[])
      .slice(0, 6)
      .map((line) => escapeHtml(String(line)))
      .join("<br/>");
  }

  if (upcoming.length) {
    html += `<br/><strong>${de ? "Sonderzeiten" : "Horarios especiales"}</strong><br/>`;
    html += upcoming.map((line) => escapeHtml(line)).join("<br/>");
  }

  if (content.announcements) {
    html += `<br/><em>${escapeHtml(content.announcements)}</em>`;
  }

  return html ? `<p>${html}</p>` : `<p>${de ? "Öffnungszeiten siehe Originalseite." : "Horarios: ver sitio original."}</p>`;
}

function patchSection(html: string, marker: string, innerHtml: string): string {
  const re = new RegExp(
    `(<[^>]+data-santi="${marker}"[^>]*>)([\\s\\S]*?)(</[^>]+>)`,
    "i",
  );
  if (re.test(html)) {
    return html.replace(re, `$1${innerHtml}$3`);
  }
  return html;
}

function patchWhatsAppLinks(html: string, siteSlug: string): string {
  return html.replace(
    /href="(https:\/\/wa\.me\/[^"]+)"/gi,
    `href="/go/wa?site=${encodeURIComponent(siteSlug)}&ctx=cta"`,
  );
}

export async function syncSiteContentToConcept(siteId: string): Promise<void> {
  const site = await getSite(siteId);
  if (!site) return;

  const content = await getSiteContent(siteId);
  if (!content) return;

  const concept = await getConcept(site.conceptId);
  if (!concept) return;

  const de = concept.lang === "de";
  let html = concept.html;

  html = patchSection(html, "daily-menu", renderDailyMenu(content, de));
  html = patchSection(html, "hours", renderHours(content, de));
  html = patchWhatsAppLinks(html, site.slug);

  const updated = await applySeoToConcept({ ...concept, html });
  await saveConcept(updated);
}

export function buildWhatsAppRedirectUrl(siteSlug: string, ctx = "hero"): string {
  return `/go/wa?site=${encodeURIComponent(siteSlug)}&ctx=${encodeURIComponent(ctx)}`;
}
