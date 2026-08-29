import { artDirectionPromptBlock } from "./art-direction";
import { siteFactsSummary } from "./extract-site";
import type { DesignBrief } from "./tokens";

export const designExamples = [
  {
    name: "Stadt Wien",
    template: "civic" as const,
    notes: "Municipal portal — Rathaus hero, Bürgerservice sections, no retail/menu.",
  },
  {
    name: "Lugner City",
    template: "center" as const,
    notes: "Shopping center, gold accents, shops + hours + anfahrt, photo hero.",
  },
  {
    name: "Pizzeria Da Filippo",
    template: "restaurant" as const,
    notes: "Pizzeria Wien — pizza hero photo, Speisekarte/Reservieren, district subtitle.",
  },
  {
    name: "Gasthaus Am Hof",
    template: "restaurant" as const,
    notes: "Traditional gastro, warm food photography, clear hours.",
  },
];

export function systemPromptForDesign() {
  return `You are Santi Design Agent — creative director at a €200k boutique digital studio.
Output a COMPLETE standalone HTML document with embedded <style>. Output ONLY HTML. No markdown fences.

ABSOLUTE BANS (instant fail):
- Emojis, Unicode icons, icon fonts, "🍕", flags, decorative symbols
- Grids of 4–6 specialty cards with icons ("Nuestras Especialidades" style)
- Invented menu items, tapas, services, phone numbers, hours, or addresses not in FACTS
- Purple/indigo AI gradients, cream+#terracotta cliché, multi-layer shadows, pill clusters
- Cards overlapping the hero photo; floating badges on the hero
- system-ui / Arial / Roboto / Inter as primary fonts

HARD REQUIREMENTS:
1) Load Google Fonts in <head>:
   https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;700&family=Manrope:wght@400;500;600;700&display=swap
   display = Fraunces; body = Manrope
2) Sticky gold Konzept banner exactly:
   "Konzept / Redesign-Vorschlag — keine offizielle Website · Santi Design Agent"
3) MUST use provided heroImageUrl, secondaryImageUrl, and detailImageUrl (if any) as real <img src="...">
4) Hero = ONE composition full-bleed: short brand H1, one supporting line, 1–2 CTAs, dominant photo. Nothing else in first viewport.
5) Max 4 sections total: Hero → Story (text + secondary/detail photo) → Hours+Contact (real facts) → Closing CTA
6) Highlights: max 3–4 typographic words/numbers from site facts ONLY — no icons
7) Motion: include @keyframes fadeUp; .hero-inner and .reveal animate; .btn:hover slight lift. Keep subtle.
8) Responsive mobile/tablet/desktop. Language labels match brief.lang (es|de).
9) Apply ART DIRECTION palette via CSS variables.
10) Look expensive: generous whitespace, sharp hierarchy, editorial photography, quiet luxury.

STRUCTURE SKETCH (follow spirit, not verbatim):
<!DOCTYPE html><html lang=".."><head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:...&family=Manrope:..." rel="stylesheet">
<style>
:root { --bg; --ink; --gold; --panel; --muted; --accent; }
body{font-family:Manrope;background:var(--bg);color:var(--ink)}
h1,h2{font-family:Fraunces}
.banner{sticky gold}
.hero{min-height:92vh; position relative; full-bleed img + gradient}
.hero-inner{fadeUp}
.story{grid photo+copy}
.utility{hours + contact with real tel:/mailto:}
.btn{...} .btn:hover{transform}
@keyframes fadeUp{...}
</style></head><body>...sections...</body></html>`;
}

export function userPromptForDesign(brief: DesignBrief) {
  const facts = brief.siteFacts
    ? siteFactsSummary(brief.siteFacts)
    : "No structured facts.";
  const art = brief.artDirection
    ? artDirectionPromptBlock(brief.artDirection)
    : "Use dark editorial premium defaults.";

  const civicBlock =
    brief.template === "civic" || brief.kind === "civic"
      ? `
CIVIC / GOVERNMENT RULES:
- This is a municipal or public institution site — NOT a shop or restaurant.
- Do NOT add menus, product grids, retail sections, or boutique imagery language.
- Hero and story must reflect citizen services, administration, or public information.
- Use nav topics and highlights from FACTS as typographic service labels.
- CTAs: Leistungen/Servicios + Kontakt/Contacto — never Speisekarte or WhatsApp unless in FACTS.
`
      : "";

  return `Build agency-grade concept HTML for this business. Use REAL site facts only.

Name: ${brief.name}
Subtitle / address: ${brief.subtitle || "n/a"}
Kind: ${brief.kind || "n/a"} · Specialty: ${brief.specialty || "n/a"}
Vibe: ${brief.vibe || "n/a"}
Tagline: ${brief.tagline || "n/a"}
Summary: ${brief.summary || "n/a"}
Template: ${brief.template}
Language: ${brief.lang}
URL: ${brief.url}
Score: ${brief.score}/100
Findings: ${brief.findings.join(" | ") || "n/a"}
Phone: ${brief.phoneHint || "omit if none"}
Hours: ${brief.hoursHint || "omit if none"}
Email: ${brief.emailHint || "omit if none"}
WhatsApp: ${brief.whatsappUrl || "omit if none"}
Highlights (use ≤4 typographically): ${(brief.highlights || []).slice(0, 4).join(", ") || "none"}
heroImageUrl: ${brief.heroImageUrl || ""}
secondaryImageUrl: ${brief.secondaryImageUrl || ""}
detailImageUrl: ${brief.detailImageUrl || ""}
${civicBlock}
${art}

EXTRACTED SITE FACTS (source of truth):
${facts}

Deliver the complete HTML document now.`;
}
