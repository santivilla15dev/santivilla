export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};

export type ConceptSeoSource = "brief" | "html-sync" | "menu-draft";

export type ConceptSeoPayload = {
  jsonLd: JsonLdGraph;
  generatedAt: string;
  source: ConceptSeoSource;
  types: string[];
};

export type ExtractedMenuSection = {
  title: string;
  items: { name: string; price?: string; description?: string }[];
};

export type HtmlExtractResult = {
  phones: string[];
  emails: string[];
  addresses: string[];
  hoursLines: string[];
  menuSections?: ExtractedMenuSection[];
};
