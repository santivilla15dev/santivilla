import { getArtDirection, type BusinessKind } from "./art-direction";

export type ConceptImages = {
  heroUrl: string;
  secondaryUrl: string;
  detailUrl: string;
  source: "nano-banana" | "unsplash";
};

const UNSPLASH: Record<BusinessKind, [string, string, string]> = {
  pizzeria: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80",
  ],
  gasthaus: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
  ],
  cafe: [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=80",
  ],
  friseur: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaaae1f0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1585747860715-2ba37e645b06?auto=format&fit=crop&w=1000&q=80",
  ],
  shop: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
  ],
  center: [
    "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
  ],
  civic: [
    "https://images.unsplash.com/photo-1605647540924-5fcce6528ad0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deab673a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516550893753-66c8c0a8f4a4?auto=format&fit=crop&w=1000&q=80",
  ],
  healthcare: [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
  ],
  hotel: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
  ],
  professional: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",
  ],
  other: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
  ],
};

/** Pack Unsplash curado por tipo de negocio (Brief Agent + fallbacks). */
export function unsplashPackForKind(
  kind: BusinessKind,
): [string, string, string] {
  return UNSPLASH[kind] ?? UNSPLASH.other;
}

const RETAIL_PROMPT_RE =
  /shop|boutique|retail|clothing|storefront|product shelves|fashion|mall atrium|store interior/i;

/** Known Unsplash photo IDs used for retail / boutique fallbacks. */
export const RETAIL_IMAGE_URL_RE =
  /1441986300917|1472851294608|1523275335684|1555529669|1555396273-367ea4eb4db5/i;

const THEMED_KINDS: BusinessKind[] = [
  "civic",
  "healthcare",
  "professional",
];

export function isRetailImageUrl(url: string): boolean {
  return RETAIL_IMAGE_URL_RE.test(url);
}

/** Swap blocklisted retail URLs for curated fallbacks per kind. */
export function validateThematicImages(
  kind: BusinessKind,
  urls: [string, string, string],
): [string, string, string] {
  if (!THEMED_KINDS.includes(kind)) return urls;
  const fallback = UNSPLASH[kind] || UNSPLASH.other;
  return [
    isRetailImageUrl(urls[0]) ? fallback[0] : urls[0],
    isRetailImageUrl(urls[1]) ? fallback[1] : urls[1],
    isRetailImageUrl(urls[2]) ? fallback[2] : urls[2],
  ];
}

/** Replace off-theme retail prompts for civic and other non-retail kinds. */
export function sanitizePromptsForKind(
  kind: BusinessKind,
  prompts: [string, string, string],
  name: string,
  city: string,
): [string, string, string] {
  const fallback = getArtDirection(kind, name, city).imagePrompts;
  if (kind !== "civic" && kind !== "healthcare" && kind !== "professional") {
    return prompts;
  }
  return [
    RETAIL_PROMPT_RE.test(prompts[0]) ? fallback[0] : prompts[0],
    RETAIL_PROMPT_RE.test(prompts[1]) ? fallback[1] : prompts[1],
    RETAIL_PROMPT_RE.test(prompts[2]) ? fallback[2] : prompts[2],
  ];
}

function higgsfieldAuthHeader(): string | null {
  const combined =
    process.env.HF_KEY ||
    process.env.HF_CREDENTIALS ||
    process.env.HIGGSFIELD_KEY;
  if (combined && combined.includes(":")) {
    return `Key ${combined}`;
  }
  const id =
    process.env.HF_API_KEY_ID ||
    process.env.HF_API_KEY ||
    process.env.HIGGSFIELD_API_KEY;
  const secret =
    process.env.HF_API_KEY_SECRET ||
    process.env.HF_API_SECRET ||
    process.env.HIGGSFIELD_API_SECRET;
  if (id && secret) return `Key ${id}:${secret}`;
  return null;
}

type HfSubmit = {
  status: string;
  request_id: string;
  status_url?: string;
};

type HfStatus = {
  status: string;
  error?: string | null;
  images?: { url: string }[];
};

async function pollHiggsfield(
  statusUrl: string,
  auth: string,
  maxMs = 90_000,
): Promise<string | null> {
  const started = Date.now();
  while (Date.now() - started < maxMs) {
    const res = await fetch(statusUrl, {
      headers: { Authorization: auth, Accept: "application/json" },
    });
    if (!res.ok) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }
    const data = (await res.json()) as HfStatus;
    if (data.status === "completed" && data.images?.[0]?.url) {
      return data.images[0].url;
    }
    if (data.status === "failed" || data.error) return null;
    await new Promise((r) => setTimeout(r, 2000));
  }
  return null;
}

/**
 * Nano Banana Pro on Higgsfield — API path `/nano-banana`
 */
async function nanoBananaImage(
  prompt: string,
  aspectRatio: "16:9" | "4:3" | "1:1",
): Promise<string | null> {
  const auth = higgsfieldAuthHeader();
  if (!auth) return null;

  const endpoints = [
    "https://api.higgsfield.ai/nano-banana",
    "https://api.higgsfield.ai/nano-banana-pro",
  ];

  let submit: HfSubmit | null = null;
  for (const url of endpoints) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt.slice(0, 4000),
        num_images: 1,
        aspect_ratio: aspectRatio,
        output_format: "jpeg",
      }),
    });
    if (res.ok) {
      submit = (await res.json()) as HfSubmit;
      break;
    }
  }

  if (!submit?.status_url && !submit?.request_id) return null;

  const statusUrl =
    submit.status_url ||
    `https://api.higgsfield.ai/requests/${submit.request_id}/status`;

  return pollHiggsfield(statusUrl, auth);
}

export function hasHiggsfieldCredentials() {
  return Boolean(higgsfieldAuthHeader());
}

export async function generateConceptImages(input: {
  kind: BusinessKind;
  prompts: [string, string, string];
  name?: string;
  city?: string;
}): Promise<ConceptImages> {
  const prompts = sanitizePromptsForKind(
    input.kind,
    input.prompts,
    input.name || "Business",
    input.city || "Vienna",
  );
  const [p1, p2, p3] = prompts;
  const fallback = UNSPLASH[input.kind] || UNSPLASH.other;

  // Civic portals: curated Unsplash only — HF can drift into retail imagery.
  if (input.kind === "civic") {
    return {
      heroUrl: fallback[0],
      secondaryUrl: fallback[1],
      detailUrl: fallback[2],
      source: "unsplash",
    };
  }

  if (!hasHiggsfieldCredentials()) {
    return {
      heroUrl: fallback[0],
      secondaryUrl: fallback[1],
      detailUrl: fallback[2],
      source: "unsplash",
    };
  }

  try {
    const hero = await nanoBananaImage(p1, "16:9");
    const secondary = await nanoBananaImage(p2, "4:3");
    const detail = await nanoBananaImage(p3, "1:1");
    const any = Boolean(hero || secondary || detail);
    const raw: [string, string, string] = [
      hero || fallback[0],
      secondary || fallback[1],
      detail || fallback[2],
    ];
    const [heroUrl, secondaryUrl, detailUrl] = validateThematicImages(
      input.kind,
      raw,
    );
    return {
      heroUrl,
      secondaryUrl,
      detailUrl,
      source: any ? "nano-banana" : "unsplash",
    };
  } catch {
    const validated = validateThematicImages(input.kind, fallback);
    return {
      heroUrl: validated[0],
      secondaryUrl: validated[1],
      detailUrl: validated[2],
      source: "unsplash",
    };
  }
}
