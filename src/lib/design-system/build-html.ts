import type { ArtDirection } from "./art-direction";
import { designTokens, type DesignBrief } from "./tokens";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function baseStyles(art?: ArtDirection) {
  const p = art?.palette || {
    bg: designTokens.colors.dark,
    ink: "#f4f0ea",
    muted: "rgba(244,240,234,.7)",
    accent: designTokens.colors.accent,
    gold: designTokens.colors.gold,
    panel: designTokens.colors.darkPanel,
  };
  return `
:root {
  --bg: ${p.bg};
  --ink: ${p.ink};
  --muted: ${p.muted};
  --accent: ${p.accent};
  --gold: ${p.gold};
  --panel: ${p.panel};
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: ${designTokens.fonts.body};
  color: var(--ink);
  background: var(--bg);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes revealImg {
  from { opacity: 0; transform: scale(1.04); }
  to { opacity: 1; transform: scale(1); }
}
.banner {
  position: sticky; top: 0; z-index: 50;
  background: var(--gold); color: #1a1408;
  text-align: center; font-size: 11px; font-weight: 700;
  letter-spacing: 0.02em; padding: 10px 12px;
}
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5rem 1.25rem 3rem;
  overflow: hidden;
}
.hero-media { position: absolute; inset: 0; background: #1a2830; }
.hero-media img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  animation: revealImg 1.4s ease both;
}
.hero-shade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 45%, var(--bg) 100%);
}
.hero-inner {
  position: relative; z-index: 1; width: min(980px, 100%); margin: 0 auto;
  animation: fadeUp 0.9s ease both;
}
.eyebrow {
  font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--gold); font-weight: 600; margin: 0;
}
h1 {
  font-family: ${designTokens.fonts.display};
  font-size: clamp(2.8rem, 10vw, 5rem);
  line-height: 0.92; letter-spacing: -0.03em;
  margin: 0.55rem 0 0; max-width: 11ch; font-weight: 700;
}
.sub { margin: 0.7rem 0 0; color: var(--muted); font-size: 0.95rem; }
.lead {
  max-width: 28rem; margin: 0.95rem 0 0;
  color: var(--muted); font-size: 1.08rem; font-weight: 500;
}
.cta-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.55rem; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px; padding: 0.85rem 1.4rem; font-size: 0.9rem; font-weight: 600;
  text-decoration: none; border: 1px solid transparent;
  transition: transform .2s ease, background .2s ease, border-color .2s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--gold); color: #1a1408; }
.btn-ghost { border-color: rgba(255,255,255,.35); color: #fff; }
.shell { width: min(980px, calc(100% - 2rem)); margin: 0 auto; padding: 2rem 0 3.5rem; }
.reveal { animation: fadeUp 0.85s ease both; animation-delay: .12s; }
.story {
  display: grid; gap: 1.25rem; margin-top: 0.5rem;
}
@media (min-width: 860px) {
  .story { grid-template-columns: 1.05fr 0.95fr; align-items: stretch; }
  .hero { padding: 3.5rem 2rem 4rem; }
}
.panel {
  background: var(--panel); border-radius: 1.35rem; padding: 1.6rem 1.55rem;
  border: 1px solid rgba(255,255,255,.06);
}
.panel h2 {
  font-family: ${designTokens.fonts.display};
  font-size: clamp(1.5rem, 3vw, 2rem); margin: 0 0 0.65rem; color: var(--ink);
  letter-spacing: -0.02em;
}
.panel p { margin: 0; color: var(--muted); font-size: 1rem; }
.marks {
  display: flex; flex-wrap: wrap; gap: 0.6rem 1.4rem;
  margin: 1.1rem 0 0; padding: 0; list-style: none;
}
.marks li {
  font-family: ${designTokens.fonts.display};
  font-size: 1.15rem; color: var(--gold); letter-spacing: -0.01em;
}
.photo {
  border-radius: 1.35rem; overflow: hidden; min-height: 260px; background: #1a2830;
}
.photo img {
  width: 100%; height: 100%; object-fit: cover; display: block; min-height: 260px;
  animation: revealImg 1.2s ease both;
}
.utility {
  display: grid; gap: 1rem; margin-top: 1.25rem;
}
@media (min-width: 720px) {
  .utility { grid-template-columns: 1fr 1fr; }
}
.utility a { color: var(--gold); }
.close {
  margin-top: 1.25rem; padding: 2rem 1.55rem; text-align: center;
  border-radius: 1.35rem; background: var(--panel);
  border: 1px solid rgba(255,255,255,.06);
}
.close h2 {
  font-family: ${designTokens.fonts.display};
  font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin: 0 0 0.5rem;
}
.close p { margin: 0 auto 1.1rem; max-width: 28rem; color: var(--muted); }
.footer-note {
  text-align: center; font-size: 12px; color: rgba(244,240,234,.38);
  padding: 0 1rem 2.5rem;
}
`.trim();
}

function wrapDocument(title: string, body: string, lang: "es" | "de", art?: ArtDirection) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} — Konzept</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${baseStyles(art)}</style>
</head>
<body>
<div class="banner">${escapeHtml(designTokens.banner)}</div>
${body}
<p class="footer-note">Santi Design Agent · santivilla.com · kein offizieller Relaunch</p>
</body>
</html>`;
}

function heroBlock(brief: DesignBrief, primaryCta: string, secondaryCta: string) {
  const img = brief.heroImageUrl
    ? `<img src="${escapeHtml(brief.heroImageUrl)}" alt="" />`
    : "";
  const eyebrow =
    brief.specialty || brief.kind || (brief.lang === "de" ? "Konzept" : "Concepto");
  return `
<header class="hero">
  <div class="hero-media">${img}</div>
  <div class="hero-shade"></div>
  <div class="hero-inner">
    <p class="eyebrow">${escapeHtml(eyebrow.toUpperCase())}</p>
    <h1>${escapeHtml(brief.name)}</h1>
    ${brief.subtitle ? `<p class="sub">${escapeHtml(brief.subtitle)}</p>` : ""}
    <p class="lead">${escapeHtml(brief.tagline || brief.summary || "")}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#info">${escapeHtml(primaryCta)}</a>
      <a class="btn btn-ghost" href="#contact">${escapeHtml(secondaryCta)}</a>
    </div>
  </div>
</header>`;
}

function hoursText(brief: DesignBrief, fallback: string) {
  if (brief.siteFacts?.hoursLines?.length) {
    return brief.siteFacts.hoursLines
      .slice(0, 4)
      .map((h) => escapeHtml(h))
      .join("<br/>");
  }
  if (brief.hoursHint) return escapeHtml(brief.hoursHint);
  return escapeHtml(fallback);
}

function marksList(brief: DesignBrief) {
  const items = (brief.highlights || brief.siteFacts?.highlights || [])
    .filter((x) => x && !/emoji|home -/i.test(x))
    .slice(0, 4);
  if (!items.length) return "";
  return `<ul class="marks">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
}

function storyPhoto(brief: DesignBrief) {
  const url = brief.secondaryImageUrl || brief.detailImageUrl;
  if (!url) return `<div class="photo"></div>`;
  return `<div class="photo"><img src="${escapeHtml(url)}" alt="" /></div>`;
}

function detailAside(brief: DesignBrief) {
  if (!brief.detailImageUrl || brief.detailImageUrl === brief.secondaryImageUrl) {
    return "";
  }
  return `<div class="photo" style="margin-top:1rem;min-height:180px"><img src="${escapeHtml(brief.detailImageUrl)}" alt="" style="min-height:180px" /></div>`;
}

function contactPanel(brief: DesignBrief, de: boolean) {
  const phone = brief.phoneHint || brief.siteFacts?.phones[0];
  const email = brief.emailHint || brief.siteFacts?.emails[0];
  const wa = brief.whatsappUrl || brief.siteFacts?.whatsapp;
  const address =
    brief.subtitle || brief.siteFacts?.addresses[0] || brief.city || "";

  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;
  const bits: string[] = [];
  if (address) bits.push(`<p>${escapeHtml(address)}</p>`);
  if (phone && telHref) {
    bits.push(
      `<p style="margin-top:.7rem"><a href="${escapeHtml(telHref)}">${escapeHtml(phone)}</a></p>`,
    );
  }
  if (email) {
    bits.push(
      `<p style="margin-top:.45rem"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    );
  }
  if (!bits.length) {
    bits.push(
      `<p>${de ? "Kontaktdaten auf der Originalseite prüfen." : "Revisa el contacto en el sitio original."}</p>`,
    );
  }

  const ctas: string[] = [];
  if (wa) {
    ctas.push(
      `<a class="btn btn-primary" href="${escapeHtml(wa)}" target="_blank" rel="noreferrer">WhatsApp</a>`,
    );
  }
  if (telHref) {
    ctas.push(
      `<a class="btn btn-ghost" href="${escapeHtml(telHref)}">${de ? "Anrufen" : "Llamar"}</a>`,
    );
  }

  return `
  <article class="panel" id="contact">
    <h2>${de ? "Kontakt" : "Contacto"}</h2>
    ${bits.join("\n    ")}
    ${ctas.length ? `<div class="cta-row">${ctas.join("")}</div>` : ""}
  </article>`;
}

function closeBand(brief: DesignBrief, de: boolean) {
  const title = de ? "Bereit für den Relaunch?" : "¿Listo para el relaunch?";
  const copy = de
    ? "Dies ist ein Konzept — kein offizieller Auftritt. Klar auf jedem Gerät."
    : "Esto es un concepto — no es el sitio oficial. Claro en cada dispositivo.";
  return `
  <section class="close reveal">
    <h2>${title}</h2>
    <p>${copy}</p>
    <div class="cta-row" style="justify-content:center">
      <a class="btn btn-primary" href="${escapeHtml(brief.url)}" target="_blank" rel="noreferrer">${de ? "Originalseite" : "Sitio original"}</a>
      <a class="btn btn-ghost" href="#contact">${de ? "Kontakt" : "Contacto"}</a>
    </div>
  </section>`;
}

function buildShared(brief: DesignBrief, primary: string, secondary: string, storyTitle: string) {
  const de = brief.lang === "de";
  const hoursFallback = de
    ? "Öffnungszeiten auf der Originalseite prüfen"
    : "Horarios: ver sitio original";
  const hours = hoursText(brief, hoursFallback);
  const marks = marksList(brief);
  const story =
    brief.summary ||
    brief.tagline ||
    brief.siteFacts?.description ||
    (de ? "Ein klarer digitaler Auftritt für Gäste vor Ort." : "Una presencia digital clara para clientes locales.");

  return `
${heroBlock(brief, primary, secondary)}
<main class="shell" id="info">
  <section class="story reveal">
    <article class="panel">
      <h2>${escapeHtml(storyTitle)}</h2>
      <p>${escapeHtml(story.slice(0, 320))}</p>
      ${marks}
      ${detailAside(brief)}
    </article>
    ${storyPhoto(brief)}
  </section>
  <section class="utility reveal">
    <article class="panel" data-santi="daily-menu">
      <h2>${de ? "Tagesmenü" : "Menú del día"}</h2>
      <p>${de ? "Heute kein Tagesmenü hinterlegt." : "No hay menú del día publicado."}</p>
    </article>
    <article class="panel" data-santi="hours">
      <h2>${de ? "Öffnungszeiten" : "Horarios"}</h2>
      <p>${hours}</p>
    </article>
    ${contactPanel(brief, de)}
  </section>
  ${closeBand(brief, de)}
</main>`;
}

export function buildRestaurantHtml(brief: DesignBrief) {
  const de = brief.lang === "de";
  const body = buildShared(
    brief,
    de ? "Speisekarte" : "Menú",
    de ? "Reservieren" : "Reservar",
    de ? "Der Ort" : "El lugar",
  );
  return wrapDocument(brief.name, body, brief.lang, brief.artDirection);
}

export function buildShopHtml(brief: DesignBrief) {
  const de = brief.lang === "de";
  const body = buildShared(
    brief,
    de ? "Leistungen" : "Servicios",
    "WhatsApp",
    de ? "Angebot" : "Oferta",
  );
  return wrapDocument(brief.name, body, brief.lang, brief.artDirection);
}

export function buildCenterHtml(brief: DesignBrief) {
  const de = brief.lang === "de";
  const body = buildShared(
    brief,
    de ? "Öffnungszeiten" : "Horarios",
    "Shops",
    de ? "Das Center" : "El centro",
  );
  return wrapDocument(brief.name, body, brief.lang, brief.artDirection);
}

export function buildCivicHtml(brief: DesignBrief) {
  const de = brief.lang === "de";
  const body = buildShared(
    brief,
    de ? "Leistungen" : "Servicios",
    de ? "Kontakt" : "Contacto",
    de ? "Bürgerservice" : "Servicios ciudadanos",
  );
  return wrapDocument(brief.name, body, brief.lang, brief.artDirection);
}

export function buildConceptHtml(brief: DesignBrief) {
  if (brief.template === "restaurant") return buildRestaurantHtml(brief);
  if (brief.template === "center") return buildCenterHtml(brief);
  if (brief.template === "civic") return buildCivicHtml(brief);
  return buildShopHtml(brief);
}
