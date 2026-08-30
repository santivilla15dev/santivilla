import { getArtDirection, type BusinessKind } from "@/lib/design-system/art-direction";
import {
  generateConceptImages,
  unsplashPackForKind,
} from "@/lib/design-system/images";
import type { BriefImages } from "./schema";

/** Unsplash curado: calzado / zapatería (solo si el brief habla de zapatos). */
export const FOOTWEAR_UNSPLASH: [string, string, string] = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1460353581641-bfcb94562454?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80",
];

/** Unsplash curado: panadería (no café genérico). */
export const BAKERY_UNSPLASH: [string, string, string] = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80",
];

/** Unsplash curado: náutica / barcos (no buceo). */
export const NAUTICAL_UNSPLASH: [string, string, string] = [
  "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1000&q=80",
];

/** Unsplash curado: gym / fitness. */
export const FITNESS_UNSPLASH: [string, string, string] = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
];

/** Unsplash curado: taller / automoción. */
export const AUTOMOTIVE_UNSPLASH: [string, string, string] = [
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
];

export type BriefImageNiche =
  | "footwear"
  | "bakery"
  | "nautical"
  | "fitness"
  | "automotive"
  | null;

export function isFootwearBrief(text: string): boolean {
  return /zapato|zapatilla|calzado|zapater[ií]a|shoe|sneaker|footwear|boot\b|botas?\b/i.test(
    text,
  );
}

export function isBakeryBrief(text: string): boolean {
  // "horno" solo no basta (pizzerías de leña también lo dicen).
  if (/pizz|pizzer/i.test(text)) return false;
  return /panader|bakery|boulangerie|b[aä]ckerei|masa madre|sourdough|pan fresco|pastel(es|ería)?|boll(ería|os)|baguette|croissant|pan artesanal/i.test(
    text,
  );
}

export function isNauticalBrief(text: string): boolean {
  return /barco|barcos|yate|yates|n[aá]utic|marina|astillero|embarcaci[oó]n|velero|boat|boats|yacht|sail\b|sailing|ferry|shipyard|charter.*boat|boat.*charter/i.test(
    text,
  );
}

export function isFitnessBrief(text: string): boolean {
  return /gym|fitness|entrenamiento|entrenador|crossfit|pesas|turnhalle|sportstudio|workout|personal trainer|sala de musculaci[oó]n/i.test(
    text,
  );
}

export function isAutomotiveBrief(text: string): boolean {
  return /taller mec[aá]nico|autowerkstatt|KFZ|mec[aá]nico de auto|car repair|auto repair|concesionario|dealership|taller de coches|autohaus|neum[aá]tico|oil change|cambio de aceite/i.test(
    text,
  ) || (/\b(auto|coche|coches|car|cars|vehicle)\b/i.test(text) &&
    /taller|repar|service|mec[aá]nic|werkstatt/i.test(text));
}

export function detectBriefImageNiche(text: string): BriefImageNiche {
  if (isFootwearBrief(text)) return "footwear";
  if (isBakeryBrief(text)) return "bakery";
  if (isNauticalBrief(text)) return "nautical";
  if (isFitnessBrief(text)) return "fitness";
  if (isAutomotiveBrief(text)) return "automotive";
  return null;
}

function nicheUnsplashPack(niche: BriefImageNiche): [string, string, string] | null {
  if (niche === "footwear") return FOOTWEAR_UNSPLASH;
  if (niche === "bakery") return BAKERY_UNSPLASH;
  if (niche === "nautical") return NAUTICAL_UNSPLASH;
  if (niche === "fitness") return FITNESS_UNSPLASH;
  if (niche === "automotive") return AUTOMOTIVE_UNSPLASH;
  return null;
}

function nichePrompts(
  niche: Exclude<BriefImageNiche, null>,
  businessName: string,
  city: string,
): [string, string, string] {
  if (niche === "footwear") {
    return [
      `Photorealistic editorial photography, 35mm, no text no logos: hero wall of sneakers and shoes in a retail store for ${businessName}, warm light, ${city}`,
      `Photorealistic: shoe store interior shelves full of footwear soft daylight, ${city}`,
      `Photorealistic close-up of premium sneakers on display, shallow depth of field`,
    ];
  }
  if (niche === "bakery") {
    return [
      `Photorealistic editorial photography, 35mm, no text no logos: fresh artisan bread loaves on wooden board for ${businessName}, warm morning light, flour dust, ${city}`,
      `Photorealistic bakery interior with oven glow and display of bread and pastries, ${city}`,
      `Photorealistic close-up of crusty sourdough loaf, shallow depth of field`,
    ];
  }
  if (niche === "nautical") {
    return [
      `Photorealistic editorial photography, 35mm, no text no logos: sailboats and yachts at a sunny marina for ${businessName}, blue sea horizon, ${city}`,
      `Photorealistic wooden deck of a charter boat with coiled ropes and ocean view, ${city}`,
      `Photorealistic close-up of boat hull and water reflections, shallow depth of field`,
    ];
  }
  if (niche === "fitness") {
    return [
      `Photorealistic editorial photography, 35mm, no text no logos: modern gym floor with free weights for ${businessName}, dramatic side light, ${city}`,
      `Photorealistic fitness studio interior empty training space soft daylight, ${city}`,
      `Photorealistic close-up of kettlebell on rubber gym flooring, shallow depth of field`,
    ];
  }
  return [
    `Photorealistic editorial photography, 35mm, no text no logos: car service garage with vehicle on lift for ${businessName}, clean workshop light, ${city}`,
    `Photorealistic automotive workshop interior tools and cars soft daylight, ${city}`,
    `Photorealistic close-up of polished car wheel and brake disc, shallow depth of field`,
  ];
}

function packToImages(pack: [string, string, string]): BriefImages {
  return {
    heroUrl: pack[0],
    secondaryUrl: pack[1],
    detailUrl: pack[2],
    source: "unsplash",
  };
}

function kindForNiche(
  niche: BriefImageNiche,
  fallback: BusinessKind,
): BusinessKind {
  if (niche === "footwear") return "shop";
  if (niche === "bakery") return "cafe";
  if (niche === "fitness") return "center";
  if (niche === "automotive") return "other";
  if (niche === "nautical") return "other";
  return fallback;
}

export async function resolveBriefImages(params: {
  kind: BusinessKind;
  businessName: string;
  inputText: string;
  city?: string;
  imagePrompts?: readonly string[];
}): Promise<BriefImages> {
  const city = params.city || "local";
  const niche = detectBriefImageNiche(params.inputText);
  const kind = kindForNiche(niche, params.kind);
  const art = getArtDirection(kind, params.businessName, city);

  let prompts: [string, string, string] = art.imagePrompts;
  if (niche) {
    prompts = nichePrompts(niche, params.businessName, city);
  } else if (
    params.imagePrompts &&
    params.imagePrompts.length >= 3 &&
    params.imagePrompts[0]!.length >= 20 &&
    params.imagePrompts[1]!.length >= 20 &&
    params.imagePrompts[2]!.length >= 20
  ) {
    prompts = [
      params.imagePrompts[0]!,
      params.imagePrompts[1]!,
      params.imagePrompts[2]!,
    ];
  }

  const images = await generateConceptImages({
    kind,
    prompts,
    name: params.businessName,
    city,
  });

  // Calzado / panadería: Unsplash curado siempre (máxima previsibilidad).
  if (niche === "footwear") return packToImages(FOOTWEAR_UNSPLASH);
  if (niche === "bakery") return packToImages(BAKERY_UNSPLASH);

  // HF OK → prompts ya son temáticos (nicho o LLM).
  if (images.source === "nano-banana") {
    return images;
  }

  // Fallback Unsplash: pack de nicho antes que oficina/professional genérico.
  const nichePack = nicheUnsplashPack(niche);
  if (nichePack) return packToImages(nichePack);

  return packToImages(unsplashPackForKind(kind));
}
