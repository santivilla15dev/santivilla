import type { BusinessTemplate } from "@/lib/audit/types";
import { getArtDirection, type BusinessKind } from "./art-direction";

export type SiteTheme = {
  kind: BusinessKind;
  specialty: string;
  template: BusinessTemplate;
};

const CIVIC_URL_RE =
  /(?:^|\.)wien\.at|\.gv\.at|\.gov(?:\.|$)|gemeinde|magistrat|stadt\.|portal\.(?:stadt|city)/i;

const CIVIC_CONTENT_RE =
  /stadt\s+wien|landeshauptstadt|internetportal|behörde|verwaltung|bürgerservice|magistrat|rathaus|portal der stadt|amt der stadt|municipal|city of vienna|stadtverwaltung/i;

const RETAIL_RE =
  /boutique|online\s+shop|onlineshop|produkte|handel|storefront|einzelhandel|fashion|bekleidung|retail/i;

const SHOP_WEAK_RE = /\bshop\b|\bstore\b/i;

/** Shared civic detection for audit + design pipelines. */
export function hasCivicSignals(url: string, blob: string): boolean {
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch {
    // ignore invalid URL
  }
  if (CIVIC_URL_RE.test(url) || CIVIC_URL_RE.test(hostname)) return true;
  if (CIVIC_CONTENT_RE.test(blob.toLowerCase())) return true;
  return false;
}

/** Deterministic theme detection with civic priority before retail. */
export function detectSiteTheme(input: {
  blob: string;
  url: string;
}): SiteTheme {
  const b = input.blob.toLowerCase();

  if (hasCivicSignals(input.url, input.blob)) {
    const specialty = /stadt\s+wien|wien\.at/i.test(input.blob)
      ? "Stadtportal"
      : "Verwaltung";
    return { kind: "civic", specialty, template: "civic" };
  }

  if (
    /ärztezentrum|arztpraxis|klinik|clinic|healthcare|apotheke|pharmacy|medizin|hospital|praxis/i.test(
      b,
    )
  ) {
    return { kind: "healthcare", specialty: "Gesundheit", template: "shop" };
  }

  if (
    /hotel|gasthof|pension|zimmer|übernacht|accommodation|hostel/i.test(b) &&
    !/restaurant|gastro/.test(b)
  ) {
    return { kind: "hotel", specialty: "Hotel", template: "shop" };
  }

  if (
    /anwalt|rechtsanwalt|kanzlei|steuerberater|consulting|beratung|architekt|ingenieur|notar/i.test(
      b,
    )
  ) {
    return { kind: "professional", specialty: "Beratung", template: "shop" };
  }

  if (/pizza|pizzeria|pizzería/.test(b))
    return { kind: "pizzeria", specialty: "Pizza", template: "restaurant" };
  if (/café|cafe|kaffee|coffee|bäckerei|bakery/.test(b))
    return { kind: "cafe", specialty: "Café", template: "restaurant" };
  if (/gasthaus|wirtshaus|schnitzel|tafelspitz|restaurant|gastro/.test(b))
    return { kind: "gasthaus", specialty: "Gastwirtschaft", template: "restaurant" };
  if (/friseur|barber|coiffeur|haar/.test(b))
    return { kind: "friseur", specialty: "Friseur", template: "shop" };
  if (
    /shopping|einkaufszentrum|mall|lugner|kino|plaza|shopping\s+center/i.test(
      b,
    ) &&
    !/verwaltung|behörde|bürgerservice/.test(b)
  ) {
    return { kind: "center", specialty: "Center", template: "center" };
  }

  if (RETAIL_RE.test(b)) {
    return { kind: "shop", specialty: "Shop", template: "shop" };
  }

  if (SHOP_WEAK_RE.test(b) && !hasCivicSignals(input.url, input.blob)) {
    return { kind: "shop", specialty: "Shop", template: "shop" };
  }

  return { kind: "other", specialty: "Business", template: "shop" };
}

const VALID_TEMPLATES: BusinessTemplate[] = [
  "restaurant",
  "shop",
  "center",
  "civic",
];

export function parseBusinessTemplate(
  value: string | undefined,
  fallback: BusinessTemplate,
): BusinessTemplate {
  if (value && VALID_TEMPLATES.includes(value as BusinessTemplate)) {
    return value as BusinessTemplate;
  }
  return fallback;
}

/** Post-process Claude/heuristic output — override retail misclassification. */
export function reconcileTheme(input: {
  kind: BusinessKind;
  specialty: string;
  template: BusinessTemplate;
  name: string;
  city: string;
  summary: string;
  url: string;
  blob: string;
}): SiteTheme & {
  artDirection: ReturnType<typeof getArtDirection>;
  imagePrompts: [string, string, string];
} {
  let { kind, specialty, template } = input;

  const civic =
    hasCivicSignals(input.url, input.blob) ||
    /stadt|portal|verwaltung|behörde|magistrat|bürgerservice/i.test(
      `${input.specialty} ${input.summary} ${input.name}`,
    );

  if (
    civic &&
    (kind === "shop" || kind === "other" || kind === "center")
  ) {
    kind = "civic";
    specialty = /stadt|portal/i.test(specialty) ? specialty : "Stadtportal";
    template = "civic";
  }

  if (kind === "civic") {
    template = "civic";
  }

  const artDirection = getArtDirection(kind, input.name, input.city);
  return {
    kind,
    specialty,
    template,
    artDirection,
    imagePrompts: artDirection.imagePrompts,
  };
}
