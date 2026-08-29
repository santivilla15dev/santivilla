export type BusinessKind =
  | "pizzeria"
  | "gasthaus"
  | "cafe"
  | "friseur"
  | "shop"
  | "center"
  | "civic"
  | "healthcare"
  | "hotel"
  | "professional"
  | "other";

export type ArtDirection = {
  kind: BusinessKind;
  mood: string;
  palette: {
    bg: string;
    ink: string;
    muted: string;
    accent: string;
    gold: string;
    panel: string;
  };
  typographyNote: string;
  layoutRules: string;
  copyTone: string;
  imagePrompts: [string, string, string];
};

const CINE =
  "Photorealistic editorial photography, 35mm lens feel, natural color grade, shallow depth of field where appropriate, no text, no logos, no watermarks, no stock-photo smiles, no CGI look";

function loc(city: string) {
  return city || "Vienna, Austria";
}

export function getArtDirection(
  kind: BusinessKind,
  name: string,
  city: string,
): ArtDirection {
  const place = loc(city);

  const packs: Record<BusinessKind, Omit<ArtDirection, "kind" | "imagePrompts"> & {
    imagePrompts: [string, string, string];
  }> = {
    pizzeria: {
      mood: "Warm charcoal night, wood-fired glow, intimate Italian craft",
      palette: {
        bg: "#0c0a09",
        ink: "#f4efe6",
        muted: "rgba(244,239,230,.68)",
        accent: "#c45c26",
        gold: "#c9a227",
        panel: "#161210",
      },
      typographyNote: "Fraunces display huge (max ~10ch), Manrope body. High contrast.",
      layoutRules:
        "Hero full-bleed food or oven glow. Story band with one detail photo. Hours+contact as quiet utility. No specialty emoji grids.",
      copyTone: "Short, sensory, confident. Never invent menu items not in site facts.",
      imagePrompts: [
        `${CINE}, hero: wood-fired Neapolitan pizza just out of oven for ${name}, steam rising, rustic table, evening light, ${place}`,
        `${CINE}, warm pizzeria interior brick oven amber glow, empty intimate dining room evening, ${place}`,
        `${CINE}, extreme close-up of pizza crust blister and melted mozzarella, dark moody background`,
      ],
    },
    gasthaus: {
      mood: "Viennese hospitality, wood, soft lamps, timeless",
      palette: {
        bg: "#0f1210",
        ink: "#f3efe6",
        muted: "rgba(243,239,230,.7)",
        accent: "#8b4513",
        gold: "#b8973a",
        panel: "#171a16",
      },
      typographyNote: "Fraunces for name, restrained Manrope. Classic not kitsch.",
      layoutRules: "Hero dish or stube interior. One story paragraph. Hours + Anfahrt.",
      copyTone: "Warm, local, respectful of Austrian tradition.",
      imagePrompts: [
        `${CINE}, Wiener Schnitzel or classic Austrian plate on wooden table for ${name}, soft lamp light, ${place}`,
        `${CINE}, traditional Viennese Gasthaus interior wood paneling soft lamps empty tables, ${place}`,
        `${CINE}, detail of linen napkin silverware wine glass on dark wood`,
      ],
    },
    cafe: {
      mood: "Morning light, marble, calm craft",
      palette: {
        bg: "#12100e",
        ink: "#f7f2ea",
        muted: "rgba(247,242,234,.7)",
        accent: "#6b4f3a",
        gold: "#c4a574",
        panel: "#1a1714",
      },
      typographyNote: "Airy Fraunces, generous leading on body.",
      layoutRules: "Bright hero coffee/pastry. Soft story. Hours clear.",
      copyTone: "Quiet, inviting, precise.",
      imagePrompts: [
        `${CINE}, artisan coffee and pastry on marble for ${name}, soft morning sidelight, ${place}`,
        `${CINE}, European cafe interior soft daylight empty seats plants, ${place}`,
        `${CINE}, close-up latte art ceramic cup on marble, bokeh`,
      ],
    },
    friseur: {
      mood: "Clean mirrors, precise light, modern craft",
      palette: {
        bg: "#0e1114",
        ink: "#f2f4f6",
        muted: "rgba(242,244,246,.7)",
        accent: "#4a6fa5",
        gold: "#c9a227",
        panel: "#151a20",
      },
      typographyNote: "Sharp Fraunces, ample whitespace.",
      layoutRules: "Salon interior hero. Services as short typographic list max 4. Booking CTA.",
      copyTone: "Modern, clear, appointment-focused.",
      imagePrompts: [
        `${CINE}, modern hair salon interior mirrors warm light for ${name}, ${place}`,
        `${CINE}, premium salon chair and tools clean composition, ${place}`,
        `${CINE}, detail of scissors and comb on marble vanity soft light`,
      ],
    },
    shop: {
      mood: "Local retail clarity, product-forward, honest light",
      palette: {
        bg: "#0d1218",
        ink: "#f4f0ea",
        muted: "rgba(244,240,234,.7)",
        accent: "#0b5f63",
        gold: "#c9a227",
        panel: "#151d26",
      },
      typographyNote: "Strong brand H1, quiet utility below.",
      layoutRules: "Storefront or product hero. Offer summary. Contact.",
      copyTone: "Direct, local, trustworthy.",
      imagePrompts: [
        `${CINE}, inviting local shop storefront for ${name} in ${place}, golden hour`,
        `${CINE}, warm boutique interior product shelves soft daylight, ${place}`,
        `${CINE}, close-up of curated product on linen, editorial still life`,
      ],
    },
    center: {
      mood: "Bright atrium, gold accents, civic clarity, retail energy",
      palette: {
        bg: "#0c1218",
        ink: "#f4f0ea",
        muted: "rgba(244,240,234,.7)",
        accent: "#0b5f63",
        gold: "#c9a227",
        panel: "#151d26",
      },
      typographyNote: "Fraunces for center name, Manrope for hours/nav topics.",
      layoutRules:
        "Atrium hero. Typographic highlights from real nav (Shops, Kino…). Hours + Anfahrt. No fake store grids.",
      copyTone: "Clear, urban, useful. Prefer DE labels for Wien centers when lang=de.",
      imagePrompts: [
        `${CINE}, bright modern shopping mall atrium glass roof people walking softly blurred for ${name}, ${place}`,
        `${CINE}, inviting retail corridor storefronts soft daylight, ${place}`,
        `${CINE}, architectural detail of shopping atrium skylight geometry, ${place}`,
      ],
    },
    civic: {
      mood: "Institutional clarity, civic pride, Rathaus light, public trust",
      palette: {
        bg: "#0a1018",
        ink: "#f4f0ea",
        muted: "rgba(244,240,234,.72)",
        accent: "#9b1c1c",
        gold: "#c9a227",
        panel: "#121820",
      },
      typographyNote: "Fraunces for institution name, Manrope for services. Authoritative not bureaucratic.",
      layoutRules:
        "Hero civic architecture or public plaza. Story band with citizen services from facts. Contact + hours utility. No retail, no menu, no product grids.",
      copyTone: "Clear, accessible, institutional. Use real nav topics and services from site facts only.",
      imagePrompts: [
        `${CINE}, Vienna Rathaus city hall facade at dusk warm lights public square for ${name}, ${place}`,
        `${CINE}, modern civic service hall bright daylight clean architecture empty welcoming, ${place}`,
        `${CINE}, architectural detail of historic civic building stone columns soft evening light, ${place}`,
      ],
    },
    healthcare: {
      mood: "Clean calm care, soft clinical light, trustworthy",
      palette: {
        bg: "#0d1218",
        ink: "#f2f6f8",
        muted: "rgba(242,246,248,.72)",
        accent: "#2a7a8c",
        gold: "#c9a227",
        panel: "#141c24",
      },
      typographyNote: "Fraunces restrained, Manrope for hours and contact.",
      layoutRules: "Bright clinical hero. Services list from facts. Hours + contact prominent.",
      copyTone: "Reassuring, precise, professional.",
      imagePrompts: [
        `${CINE}, modern medical clinic reception bright calm daylight for ${name}, ${place}`,
        `${CINE}, clean healthcare interior waiting area soft natural light, ${place}`,
        `${CINE}, close-up medical equipment stethoscope on white surface soft light`,
      ],
    },
    hotel: {
      mood: "Quiet luxury hospitality, warm lobby, restful",
      palette: {
        bg: "#0e1014",
        ink: "#f4efe8",
        muted: "rgba(244,239,232,.7)",
        accent: "#6b5344",
        gold: "#c9a227",
        panel: "#161820",
      },
      typographyNote: "Fraunces for hotel name, Manrope for amenities.",
      layoutRules: "Lobby or room hero. Story about stay experience from facts. Booking/contact CTA.",
      copyTone: "Welcoming, understated luxury.",
      imagePrompts: [
        `${CINE}, boutique hotel lobby warm evening light elegant for ${name}, ${place}`,
        `${CINE}, hotel room interior soft daylight crisp linens, ${place}`,
        `${CINE}, detail of hotel key card on marble tray soft ambient light`,
      ],
    },
    professional: {
      mood: "Confident advisory, editorial office, sharp clarity",
      palette: {
        bg: "#0c1218",
        ink: "#f4f0ea",
        muted: "rgba(244,240,234,.7)",
        accent: "#3d5a6c",
        gold: "#c9a227",
        panel: "#151d26",
      },
      typographyNote: "Fraunces for firm name, generous whitespace.",
      layoutRules: "Office or meeting room hero. Expertise summary from facts. Contact CTA.",
      copyTone: "Professional, concise, credible.",
      imagePrompts: [
        `${CINE}, modern law office conference room city view for ${name}, ${place}`,
        `${CINE}, professional office interior bookshelves soft daylight, ${place}`,
        `${CINE}, detail of pen on contract document soft desk light`,
      ],
    },
    other: {
      mood: "Calm premium local business, dark editorial",
      palette: {
        bg: "#0c1218",
        ink: "#f4f0ea",
        muted: "rgba(244,240,234,.7)",
        accent: "#0b5f63",
        gold: "#c9a227",
        panel: "#151d26",
      },
      typographyNote: "Fraunces + Manrope, restrained.",
      layoutRules: "Photo hero, short story, contact utility.",
      copyTone: "Clear and human.",
      imagePrompts: [
        `${CINE}, inviting local business atmosphere for ${name} in ${place}`,
        `${CINE}, warm interior of a local business welcoming empty space, ${place}`,
        `${CINE}, editorial detail texture materials soft light`,
      ],
    },
  };

  const pack = packs[kind] || packs.other;
  return { kind, ...pack };
}

export function artDirectionPromptBlock(art: ArtDirection): string {
  return `ART DIRECTION PACK (${art.kind}):
Mood: ${art.mood}
Palette CSS vars: bg ${art.palette.bg}, ink ${art.palette.ink}, muted ${art.palette.muted}, accent ${art.palette.accent}, gold ${art.palette.gold}, panel ${art.palette.panel}
Typography: ${art.typographyNote}
Layout: ${art.layoutRules}
Copy tone: ${art.copyTone}`;
}
