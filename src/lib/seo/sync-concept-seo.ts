import type { DesignBrief } from "@/lib/design-system/tokens";
import type { StoredConcept } from "@/lib/design-system/store";
import { getMenuDraft } from "@/lib/menu/store";
import type { MenuDraft } from "@/lib/menu/types";
import {
  buildJsonLdGraph,
  detectJsonLdTypes,
} from "./build-json-ld";
import {
  extractFactsFromHtml,
  hintsFromSiteFacts,
} from "./extract-from-html";
import { injectJsonLd } from "./inject-json-ld";
import type { ConceptSeoPayload, ConceptSeoSource } from "./types";

export type SyncConceptSeoResult = {
  html: string;
  jsonLd: ConceptSeoPayload;
  siteFacts?: StoredConcept["siteFacts"];
  phoneHint?: string;
  emailHint?: string;
  hoursHint?: string;
};

export async function syncConceptSeo(
  concept: StoredConcept,
  options: {
    html: string;
    mode: "create" | "edit";
    menuDraft?: MenuDraft | null;
  },
): Promise<SyncConceptSeoResult> {
  const { html, mode } = options;
  let workingConcept = { ...concept };
  let source: ConceptSeoSource = mode === "create" ? "brief" : "html-sync";
  let extractedMenuSections =
    undefined as import("./types").ExtractedMenuSection[] | undefined;

  if (mode === "edit") {
    const { extracted, siteFacts } = await extractFactsFromHtml(
      html,
      concept.siteFacts,
    );
    workingConcept = {
      ...workingConcept,
      siteFacts,
      ...hintsFromSiteFacts(siteFacts),
    };
    if (extracted.menuSections?.length) {
      extractedMenuSections = extracted.menuSections;
    }
  }

  let menuDraft = options.menuDraft ?? null;
  if (!menuDraft && workingConcept.menuDraftId) {
    menuDraft = await getMenuDraft(workingConcept.menuDraftId);
    if (menuDraft) source = "menu-draft";
  }

  const graph = buildJsonLdGraph({
    concept: workingConcept,
    menuDraft,
    extractedMenuSections,
  });

  const injectedHtml = injectJsonLd(html, graph);
  const types = detectJsonLdTypes(graph);

  const jsonLd: ConceptSeoPayload = {
    jsonLd: graph,
    generatedAt: new Date().toISOString(),
    source,
    types,
  };

  return {
    html: injectedHtml,
    jsonLd,
    siteFacts: workingConcept.siteFacts,
    phoneHint: workingConcept.phoneHint,
    emailHint: workingConcept.emailHint,
    hoursHint: workingConcept.hoursHint,
  };
}

export async function applySeoToConcept(
  concept: StoredConcept,
  options?: { mode?: "create" | "edit"; menuDraft?: MenuDraft | null },
): Promise<StoredConcept> {
  const synced = await syncConceptSeo(concept, {
    html: concept.html,
    mode: options?.mode ?? "create",
    menuDraft: options?.menuDraft,
  });

  return {
    ...concept,
    html: synced.html,
    jsonLd: synced.jsonLd,
    siteFacts: synced.siteFacts ?? concept.siteFacts,
    phoneHint: synced.phoneHint ?? concept.phoneHint,
    emailHint: synced.emailHint ?? concept.emailHint,
    hoursHint: synced.hoursHint ?? concept.hoursHint,
  };
}

export function stubConceptFromBrief(
  brief: DesignBrief,
  html: string,
  overrides?: Partial<StoredConcept>,
): StoredConcept {
  return {
    id: overrides?.id || "stub",
    html,
    name: brief.name,
    hostname: brief.hostname,
    url: brief.url,
    template: brief.template,
    score: brief.score,
    source: overrides?.source || "template",
    createdAt: overrides?.createdAt || new Date().toISOString(),
    kind: brief.kind,
    specialty: brief.specialty,
    summary: brief.summary,
    imageSource: brief.imageSource,
    heroImageUrl: brief.heroImageUrl,
    secondaryImageUrl: brief.secondaryImageUrl,
    detailImageUrl: brief.detailImageUrl,
    lang: brief.lang,
    tagline: brief.tagline,
    phoneHint: brief.phoneHint,
    hoursHint: brief.hoursHint,
    emailHint: brief.emailHint,
    whatsappUrl: brief.whatsappUrl,
    highlights: brief.highlights,
    siteFacts: brief.siteFacts,
    artDirection: brief.artDirection,
    ...overrides,
  };
}
