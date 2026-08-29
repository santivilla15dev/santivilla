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

function packToImages(pack: [string, string, string]): BriefImages {
  return {
    heroUrl: pack[0],
    secondaryUrl: pack[1],
    detailUrl: pack[2],
    source: "unsplash",
  };
}

export async function resolveBriefImages(params: {
  kind: BusinessKind;
  businessName: string;
  inputText: string;
  city?: string;
}): Promise<BriefImages> {
  const city = params.city || "local";
  const footwear = isFootwearBrief(params.inputText);
  const bakery = !footwear && isBakeryBrief(params.inputText);

  let kind: BusinessKind = params.kind;
  if (footwear) kind = "shop";
  else if (bakery) kind = "cafe";

  const art = getArtDirection(kind, params.businessName, city);

  let prompts: [string, string, string] = art.imagePrompts;
  if (footwear) {
    prompts = [
      `Photorealistic editorial photography, 35mm, no text no logos: hero wall of sneakers and shoes in a retail store for ${params.businessName}, warm light, ${city}`,
      `Photorealistic: shoe store interior shelves full of footwear soft daylight, ${city}`,
      `Photorealistic close-up of premium sneakers on display, shallow depth of field`,
    ];
  } else if (bakery) {
    prompts = [
      `Photorealistic editorial photography, 35mm, no text no logos: fresh artisan bread loaves on wooden board for ${params.businessName}, warm morning light, flour dust, ${city}`,
      `Photorealistic bakery interior with oven glow and display of bread and pastries, ${city}`,
      `Photorealistic close-up of crusty sourdough loaf, shallow depth of field`,
    ];
  }

  const images = await generateConceptImages({
    kind,
    prompts,
    name: params.businessName,
    city,
  });

  // Keyword overrides primero; si Unsplash (o HF falló), fijar pack por kind.
  if (footwear) return packToImages(FOOTWEAR_UNSPLASH);
  if (bakery) return packToImages(BAKERY_UNSPLASH);

  if (images.source === "unsplash") {
    return packToImages(unsplashPackForKind(kind));
  }

  return images;
}
