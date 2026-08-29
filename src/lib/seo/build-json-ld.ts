import type { StoredConcept } from "@/lib/design-system/store";
import type { MenuDraft } from "@/lib/menu/types";
import { parseOpeningHoursSpecifications } from "./parse-hours";
import type { ExtractedMenuSection, JsonLdGraph } from "./types";

function schemaTypeForConcept(concept: StoredConcept): string {
  const kind = (concept.kind || "").toLowerCase();
  const template = (concept.template || "").toLowerCase();

  if (
    template === "restaurant" ||
    /restaurant|gasthaus|pizzeria|cafe|food|bar/.test(kind)
  ) {
    return "Restaurant";
  }
  if (template === "center" || kind === "center") return "ShoppingCenter";
  if (template === "civic" || kind === "civic") return "GovernmentOrganization";
  return "LocalBusiness";
}

function parsePostalAddress(raw: string): Record<string, unknown> | null {
  const line = raw.trim();
  if (!line) return null;

  const wien = line.match(
    /^(.+?)\s*,?\s*(\d{4})\s+(Wien|Vienna)(?:[,\s]+(Austria|Österreich))?/i,
  );
  if (wien) {
    return {
      "@type": "PostalAddress",
      streetAddress: wien[1].trim(),
      postalCode: wien[2],
      addressLocality: "Wien",
      addressCountry: "AT",
    };
  }

  return {
    "@type": "PostalAddress",
    streetAddress: line,
  };
}

function collectImages(concept: StoredConcept): string[] {
  const urls = [
    concept.heroImageUrl,
    concept.secondaryImageUrl,
    concept.detailImageUrl,
  ].filter((u): u is string => Boolean(u));
  return [...new Set(urls)].slice(0, 3);
}

function collectSameAs(concept: StoredConcept): string[] {
  const links = new Set<string>();
  for (const s of concept.siteFacts?.socialLinks || []) {
    if (s.href?.startsWith("http")) links.add(s.href);
  }
  if (concept.mapsUrl?.startsWith("http")) links.add(concept.mapsUrl);
  return [...links].slice(0, 8);
}

function buildMenuNode(
  concept: StoredConcept,
  menuDraft: MenuDraft | null,
  extractedSections?: ExtractedMenuSection[],
): Record<string, unknown> | null {
  const sections = menuDraft?.sections?.length
    ? menuDraft.sections
    : extractedSections?.length
      ? extractedSections
      : null;

  if (!sections?.length) return null;

  const menuId = `${concept.url || concept.hostname}#menu`;
  const menuSections = sections.slice(0, 12).map((section, si) => ({
    "@type": "MenuSection",
    "@id": `${menuId}/section-${si}`,
    name: section.title,
    hasMenuItem: section.items.slice(0, 20).map((item, ii) => {
      const node: Record<string, unknown> = {
        "@type": "MenuItem",
        name: item.name,
      };
      if ("description" in item && item.description) {
        node.description = item.description;
      }
      const price = "price" in item ? item.price : undefined;
      if (price) {
        node.offers = {
          "@type": "Offer",
          price,
          priceCurrency: "EUR",
        };
      }
      return node;
    }),
  }));

  return {
    "@type": "Menu",
    "@id": menuId,
    name: menuDraft?.restaurantName || concept.name,
    hasMenuSection: menuSections,
  };
}

export function detectJsonLdTypes(graph: JsonLdGraph): string[] {
  const types = new Set<string>();
  for (const node of graph["@graph"]) {
    const t = node["@type"];
    if (typeof t === "string") types.add(t);
    else if (Array.isArray(t)) {
      for (const item of t) {
        if (typeof item === "string") types.add(item);
      }
    }
  }
  return [...types];
}

export function buildJsonLdGraph(input: {
  concept: StoredConcept;
  menuDraft?: MenuDraft | null;
  extractedMenuSections?: ExtractedMenuSection[];
}): JsonLdGraph {
  const { concept, menuDraft, extractedMenuSections } = input;
  const graph: Record<string, unknown>[] = [];
  const schemaType = schemaTypeForConcept(concept);
  const businessId = `${concept.url || `https://${concept.hostname}`}#business`;

  const business: Record<string, unknown> = {
    "@type": schemaType,
    "@id": businessId,
    name: concept.name,
  };

  const description =
    concept.summary || concept.tagline || concept.siteFacts?.description;
  if (description) business.description = description.slice(0, 500);

  if (concept.url?.startsWith("http")) business.url = concept.url;

  const phone =
    concept.phoneHint || concept.siteFacts?.phones?.[0];
  if (phone) business.telephone = phone;

  const email =
    concept.emailHint || concept.siteFacts?.emails?.[0];
  if (email) business.email = email;

  const addressRaw =
    concept.siteFacts?.addresses?.[0] || concept.tagline;
  if (addressRaw) {
    const parsed = parsePostalAddress(addressRaw);
    if (parsed) business.address = parsed;
  }

  const hoursLines = concept.siteFacts?.hoursLines || [];
  if (hoursLines.length) {
    const specs = parseOpeningHoursSpecifications(hoursLines);
    if (specs.length) business.openingHoursSpecification = specs;
  }

  const images = collectImages(concept);
  if (images.length === 1) business.image = images[0];
  else if (images.length > 1) business.image = images;

  const sameAs = collectSameAs(concept);
  if (sameAs.length) business.sameAs = sameAs;

  if (
    concept.placeRating != null &&
    concept.placeReviewCount != null &&
    concept.placeReviewCount > 0
  ) {
    business.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: concept.placeRating,
      reviewCount: concept.placeReviewCount,
      bestRating: 5,
    };
  }

  const menuNode = buildMenuNode(concept, menuDraft || null, extractedMenuSections);
  if (menuNode) {
    business.hasMenu = { "@id": menuNode["@id"] };
    graph.push(menuNode);
  }

  graph.unshift(business);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
