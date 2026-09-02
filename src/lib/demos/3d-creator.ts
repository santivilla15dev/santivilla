import type { Locale } from "@/lib/i18n/locales";

const FIGMA =
  "https://shrug-person-78902957.figma.site/_components/v2";

/** Assets decorativos (render 3D de la spec como fallback del retrato). */
export const creator3dAssets = {
  portrait: `${FIGMA}/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png`,
  moon: `${FIGMA}/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png`,
  object: `${FIGMA}/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png`,
  lego: `${FIGMA}/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png`,
  group: `${FIGMA}/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png`,
} as const;

const SHOTS = "/demos/3d-creator/shots";

/** Marquee: capturas reales de las demos (fila 1 heroes, fila 2 scroll). */
export const creator3dMarquee = {
  row1: [
    `${SHOTS}/stadtgalerie-desktop.webp`,
    `${SHOTS}/restaurant-desktop.webp`,
    `${SHOTS}/villa-italia-desktop.webp`,
    `${SHOTS}/solo-modas-desktop.webp`,
    `${SHOTS}/universo-del-calzado-desktop.webp`,
    `${SHOTS}/auditoria-desktop.webp`,
  ],
  row2: [
    `${SHOTS}/auditoria-desktop-2.webp`,
    `${SHOTS}/universo-del-calzado-desktop-2.webp`,
    `${SHOTS}/solo-modas-desktop-2.webp`,
    `${SHOTS}/villa-italia-desktop-2.webp`,
    `${SHOTS}/restaurant-desktop-2.webp`,
    `${SHOTS}/stadtgalerie-desktop-2.webp`,
  ],
} as const;

export type Creator3dService = {
  number: string;
  name: string;
  price: string;
  description: string;
};

export type Creator3dProject = {
  number: string;
  slug: string;
  name: string;
  category: string;
  blurb: string;
  href: string;
  images: { col1Top: string; col1Bottom: string; col2: string };
};

export type Creator3dContent = {
  locale: Locale;
  nav: { about: string; services: string; projects: string; contact: string };
  hero: { heading: string; tagline: string };
  about: { title: string; body: string };
  services: { title: string; items: Creator3dService[] };
  projects: { title: string; openLabel: string; items: Creator3dProject[] };
  contact: { label: string; whatsapp: string };
  langLabel: string;
};

type Shots = { desktop: string; mobile: string; secondary: string };

function shots(slug: string, secondary: "mobile-2" | "desktop-2"): Shots {
  return {
    desktop: `${SHOTS}/${slug}-desktop.webp`,
    mobile: `${SHOTS}/${slug}-mobile.webp`,
    secondary: `${SHOTS}/${slug}-${secondary}.webp`,
  };
}

const PROJECT_BASE = [
  { slug: "stadtgalerie", href: "/demos/stadtgalerie", shots: shots("stadtgalerie", "mobile-2") },
  { slug: "restaurant", href: "/demos/restaurant", shots: shots("restaurant", "mobile-2") },
  { slug: "villa-italia", href: "/demos/villa-italia", shots: shots("villa-italia", "mobile-2") },
  { slug: "solo-modas", href: "/demos/solo-modas", shots: shots("solo-modas", "desktop-2") },
  {
    slug: "universo-del-calzado",
    href: "/demos/universo-del-calzado",
    shots: shots("universo-del-calzado", "desktop-2"),
  },
  { slug: "vaultshield", href: "/demos/vaultshield", shots: shots("vaultshield", "desktop-2") },
] as const;

type ProjectCopy = { name: string; category: string; blurb: string };

function buildProjects(copy: ProjectCopy[]): Creator3dProject[] {
  return PROJECT_BASE.map((base, i) => ({
    number: String(i + 1).padStart(2, "0"),
    slug: base.slug,
    href: base.href,
    ...copy[i],
    images: {
      col1Top: base.shots.mobile,
      col1Bottom: base.shots.secondary,
      col2: base.shots.desktop,
    },
  }));
}

const NUMBERS = ["01", "02", "03", "04", "05", "06"];

function buildServices(
  items: Omit<Creator3dService, "number">[],
): Creator3dService[] {
  return items.map((item, i) => ({ number: NUMBERS[i], ...item }));
}

const CONTENT: Record<Locale, Creator3dContent> = {
  es: {
    locale: "es",
    langLabel: "Idioma",
    nav: {
      about: "Sobre mí",
      services: "Precios",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      heading: "Hola, soy Santi",
      tagline:
        "Webs para negocios locales en Wien — claras en el móvil, con WhatsApp a un toque",
    },
    about: {
      title: "Sobre mí",
      body: "Trabajo solo: hablas con quien diseña, programa y publica. Sin capas de cuenta ni markup de agencia — plazos y precio claros desde el día uno. Estoy en Wien y también remoto, para negocios locales que quieren una web que se entiende en el móvil.",
    },
    services: {
      title: "Servicios",
      items: buildServices([
        {
          name: "Auditoría gratis",
          price: "€0",
          description:
            "Pega la URL de tu web: score responsive 0–100 y un concepto HTML automático para ver el antes / después.",
        },
        {
          name: "Konzept antes de pagar",
          price: "€0",
          description:
            "Propuesta visual de cómo podría verse tu negocio online. Sin costo ni compromiso; pides cambios hasta que encaje.",
        },
        {
          name: "Landing",
          price: "€400–800",
          description:
            "Una página clara en móvil, tablet y desktop, con botón de WhatsApp y setup de dominio + hosting en Vercel.",
        },
        {
          name: "Sitio negocio",
          price: "€900–2.000",
          description:
            "Sitio completo (4–6 páginas) para restaurante, tienda o local: menú o servicios, horarios, mapa, contacto y SEO básico.",
        },
        {
          name: "Mantenimiento",
          price: "€50–150/mes",
          description:
            "Cambios de texto y fotos, monitoreo básico, soporte por WhatsApp y prioridad en nuevas funciones.",
        },
      ]),
    },
    projects: {
      title: "Proyectos",
      openLabel: "Abrir demo",
      items: buildProjects([
        {
          name: "Stadtgalerie West",
          category: "Centro comercial · Wien",
          blurb:
            "Konzept mobile-first para un centro comercial: horarios, tiendas, cómo llegar y contacto en un solo flujo táctil.",
        },
        {
          name: "Gasthaus Am Hof",
          category: "Restaurante · Plantilla",
          blurb:
            "Plantilla reutilizable para gastronomía: carta, horarios, mapa y reserva por WhatsApp.",
        },
        {
          name: "Villa Italia",
          category: "Pizzería · Colombia",
          blurb:
            "Carta, horarios, domicilios y WhatsApp para una pizzería — pensado primero para el móvil.",
        },
        {
          name: "Solo Modas",
          category: "Moda · Retail",
          blurb:
            "Tienda de ropa con categorías, varias sedes, horarios y contacto directo.",
        },
        {
          name: "Universo del Calzado",
          category: "Deportes · Retail",
          blurb:
            "Zapatos, camisetas de club y dos tiendas en Santa Rosa de Osos, con WhatsApp a un toque.",
        },
        {
          name: "VaultShield",
          category: "SaaS · Concepto",
          blurb:
            "Hero de gestor de contraseñas: vídeo a pantalla completa, menú lateral en móvil y animaciones de entrada.",
        },
      ]),
    },
    contact: {
      label: "Escríbeme",
      whatsapp:
        "Hola Santi, vi tu landing 3D y me interesa una web para mi negocio.",
    },
  },

  de: {
    locale: "de",
    langLabel: "Sprache",
    nav: {
      about: "Über mich",
      services: "Preise",
      projects: "Projekte",
      contact: "Kontakt",
    },
    hero: {
      heading: "Hi, ich bin Santi",
      tagline:
        "Websites für lokale Betriebe in Wien — klar am Handy, WhatsApp mit einem Tipp",
    },
    about: {
      title: "Über mich",
      body: "Ich arbeite allein: Sie sprechen direkt mit dem, der gestaltet, programmiert und veröffentlicht. Keine Agentur-Zwischenschichten, kein Aufschlag — klare Termine und Preise ab Tag eins. Ich bin in Wien und arbeite auch remote, für lokale Betriebe, die eine Website wollen, die man am Handy sofort versteht.",
    },
    services: {
      title: "Leistungen",
      items: buildServices([
        {
          name: "Gratis-Audit",
          price: "€0",
          description:
            "URL einfügen: Responsive-Score 0–100 und ein automatisches HTML-Konzept für den Vorher / Nachher-Vergleich.",
        },
        {
          name: "Konzept vor der Zahlung",
          price: "€0",
          description:
            "Visueller Vorschlag, wie Ihr Betrieb online aussehen könnte. Kostenlos und unverbindlich; Änderungen bis es passt.",
        },
        {
          name: "Landing",
          price: "€400–800",
          description:
            "Eine klare Seite auf Handy, Tablet und Desktop, mit WhatsApp-Button, Domain-Setup und Hosting auf Vercel.",
        },
        {
          name: "Business-Website",
          price: "€900–2.000",
          description:
            "Komplette Website (4–6 Seiten) für Restaurant, Geschäft oder Lokal: Speisekarte oder Leistungen, Öffnungszeiten, Karte, Kontakt und Basis-SEO.",
        },
        {
          name: "Wartung",
          price: "€50–150/Monat",
          description:
            "Text- und Fotoänderungen, Basis-Monitoring, Support per WhatsApp und Priorität bei neuen Funktionen.",
        },
      ]),
    },
    projects: {
      title: "Projekte",
      openLabel: "Demo öffnen",
      items: buildProjects([
        {
          name: "Stadtgalerie West",
          category: "Einkaufszentrum · Wien",
          blurb:
            "Mobile-first-Konzept für ein Einkaufszentrum: Öffnungszeiten, Shops, Anfahrt und Kontakt in einem Ablauf.",
        },
        {
          name: "Gasthaus Am Hof",
          category: "Restaurant · Vorlage",
          blurb:
            "Wiederverwendbare Vorlage für Gastronomie: Speisekarte, Öffnungszeiten, Karte und Reservierung per WhatsApp.",
        },
        {
          name: "Villa Italia",
          category: "Pizzeria · Kolumbien",
          blurb:
            "Speisekarte, Öffnungszeiten, Lieferung und WhatsApp für eine Pizzeria — zuerst fürs Handy gedacht.",
        },
        {
          name: "Solo Modas",
          category: "Mode · Retail",
          blurb:
            "Bekleidungsgeschäft mit Kategorien, mehreren Standorten, Öffnungszeiten und Direktkontakt.",
        },
        {
          name: "Universo del Calzado",
          category: "Sport · Retail",
          blurb:
            "Schuhe, Vereinstrikots und zwei Filialen in Santa Rosa de Osos, mit WhatsApp per Tipp.",
        },
        {
          name: "VaultShield",
          category: "SaaS · Konzept",
          blurb:
            "Hero für einen Passwort-Manager: Vollbild-Video, seitliches Menü am Handy und Einblend-Animationen.",
        },
      ]),
    },
    contact: {
      label: "Schreiben Sie mir",
      whatsapp:
        "Hallo Santi, ich habe Ihre 3D-Landingpage gesehen und interessiere mich für eine Website für meinen Betrieb.",
    },
  },

  en: {
    locale: "en",
    langLabel: "Language",
    nav: {
      about: "About",
      services: "Pricing",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      heading: "Hi, i'm Santi",
      tagline:
        "Websites for local businesses in Vienna — clear on mobile, WhatsApp in one tap",
    },
    about: {
      title: "About me",
      body: "I work solo: you talk to the person who designs, builds and ships. No account layers, no agency markup — clear timelines and prices from day one. I'm based in Vienna and also work remotely, for local businesses that want a website people understand on their phone.",
    },
    services: {
      title: "Services",
      items: buildServices([
        {
          name: "Free audit",
          price: "€0",
          description:
            "Paste your URL: a responsive score from 0 to 100 plus an automatic HTML concept to see the before / after.",
        },
        {
          name: "Concept before you pay",
          price: "€0",
          description:
            "A visual proposal of how your business could look online. Free, no commitment; request changes until it fits.",
        },
        {
          name: "Landing",
          price: "€400–800",
          description:
            "One clear page on mobile, tablet and desktop, with a WhatsApp button, domain setup and hosting on Vercel.",
        },
        {
          name: "Business site",
          price: "€900–2,000",
          description:
            "Full website (4–6 pages) for a restaurant, shop or venue: menu or services, hours, map, contact and basic SEO.",
        },
        {
          name: "Maintenance",
          price: "€50–150/month",
          description:
            "Text and photo changes, basic monitoring, WhatsApp support and priority on new features.",
        },
      ]),
    },
    projects: {
      title: "Projects",
      openLabel: "Open demo",
      items: buildProjects([
        {
          name: "Stadtgalerie West",
          category: "Shopping centre · Vienna",
          blurb:
            "Mobile-first concept for a shopping centre: hours, shops, directions and contact in a single tap-friendly flow.",
        },
        {
          name: "Gasthaus Am Hof",
          category: "Restaurant · Template",
          blurb:
            "Reusable template for restaurants: menu, hours, map and WhatsApp reservations.",
        },
        {
          name: "Villa Italia",
          category: "Pizzeria · Colombia",
          blurb:
            "Menu, hours, delivery and WhatsApp for a pizzeria — designed for the phone first.",
        },
        {
          name: "Solo Modas",
          category: "Fashion · Retail",
          blurb:
            "Clothing store with categories, several locations, hours and direct contact.",
        },
        {
          name: "Universo del Calzado",
          category: "Sports · Retail",
          blurb:
            "Shoes, club shirts and two stores in Santa Rosa de Osos, with WhatsApp in one tap.",
        },
        {
          name: "VaultShield",
          category: "SaaS · Concept",
          blurb:
            "Password-manager hero: fullscreen video, mobile slide-in menu and entrance animations.",
        },
      ]),
    },
    contact: {
      label: "Contact me",
      whatsapp:
        "Hi Santi, I saw your 3D landing page and I'm interested in a website for my business.",
    },
  },
};

export function getCreator3dContent(locale: Locale): Creator3dContent {
  return CONTENT[locale];
}
