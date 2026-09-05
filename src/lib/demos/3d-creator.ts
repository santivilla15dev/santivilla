import type { Locale } from "@/lib/i18n/locales";

const SHOTS = "/demos/3d-creator/shots";

/** Marquee: solo piezas que se enseñan en público. */
export const creator3dMarquee = {
  row1: [
    `${SHOTS}/stadtgalerie-desktop.webp`,
    `${SHOTS}/restaurant-desktop.webp`,
    "/demos/kellerlicht/hero-poster.jpg",
    `${SHOTS}/auditoria-desktop.webp`,
    "/demos/novaai/hero-poster.jpg",
    "/demos/vaultshield/hero-poster.webp",
  ],
  row2: [
    "/demos/kellerlicht/still-bar.jpg",
    `${SHOTS}/restaurant-desktop-2.webp`,
    `${SHOTS}/stadtgalerie-desktop-2.webp`,
    "/demos/kellerlicht/still-board.jpg",
    `${SHOTS}/auditoria-desktop-2.webp`,
    "/demos/novaai/mitha.webp",
  ],
} as const;

export type Creator3dService = {
  number: string;
  name: string;
  price: string;
  description: string;
  /** Nota corta bajo el precio (ej. «Opcional»). */
  note?: string;
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
  hero: {
    heading: string;
    tagline: string;
    scrollHint: string;
    bands: { from: number; to: number; line: string }[];
  };
  about: { title: string; body: string };
  services: { title: string; items: Creator3dService[] };
  projects: { title: string; openLabel: string; scrollHint: string; items: Creator3dProject[] };
  wienScroll: {
    eyebrow: string;
    scrollHint: string;
    bands: { from: number; to: number; line: string }[];
  };
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

const PROJECT_BASE: {
  slug: string;
  href: string;
  shots: Shots;
}[] = [
  { slug: "stadtgalerie", href: "/demos/stadtgalerie", shots: shots("stadtgalerie", "mobile-2") },
  {
    slug: "restaurant",
    href: "/demos/restaurant",
    shots: {
      desktop: "/demos/restaurant/hero-poster.jpg",
      mobile: "/demos/restaurant/still-schnitzel.jpg",
      secondary: "/demos/restaurant/still-dining.jpg",
    },
  },
  {
    slug: "kellerlicht",
    href: "/demos/kellerlicht",
    shots: {
      desktop: "/demos/kellerlicht/hero-poster.jpg",
      mobile: "/demos/kellerlicht/still-board.jpg",
      secondary: "/demos/kellerlicht/still-bar.jpg",
    },
  },
  { slug: "vaultshield", href: "/demos/vaultshield", shots: shots("vaultshield", "desktop-2") },
  {
    slug: "novaai",
    href: "/demos/novaai",
    shots: {
      desktop: "/demos/novaai/hero-poster.jpg",
      mobile: "/demos/novaai/mitha.webp",
      secondary: "/demos/novaai/hero-poster.jpg",
    },
  },
];

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
      scrollHint: "Scroll",
      bands: [
        { from: 0, to: 0.34, line: "Diseño webs que se entienden en el móvil" },
        { from: 0.34, to: 0.67, line: "WhatsApp a un toque" },
        { from: 0.67, to: 1.01, line: "Para negocios locales en Wien" },
      ],
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
          note: "Opcional",
          description:
            "Cambios de texto y fotos, monitoreo básico, soporte por WhatsApp y prioridad en nuevas funciones.",
        },
      ]),
    },
    wienScroll: {
      eyebrow: "Wien",
      scrollHint: "Scroll",
      bands: [
        { from: 0, to: 0.34, line: "Estoy en Wien" },
        { from: 0.34, to: 0.67, line: "Webs para negocios locales" },
        { from: 0.67, to: 1.01, line: "Hablemos por WhatsApp" },
      ],
    },
    projects: {
      title: "Proyectos",
      openLabel: "Abrir demo",
      scrollHint: "Scroll dentro de la preview",
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
            "Landing cinematográfica: vídeo con scroll, Speisekarte, horarios y reserva por WhatsApp.",
        },
        {
          name: "Kellerlicht",
          category: "Weinbar · Plantilla",
          blurb:
            "Landing cinematográfica: vídeo con scroll, Am Glas, horarios y reserva por WhatsApp.",
        },
        {
          name: "VaultShield",
          category: "SaaS · Concepto",
          blurb:
            "Hero de gestor de contraseñas: vídeo a pantalla completa, menú lateral en móvil y animaciones de entrada.",
        },
        {
          name: "NovaAI",
          category: "SaaS · AI",
          blurb:
            "Landing cinematográfica de automatización con IA: vídeo ligado al scroll, servicios, proceso y FAQ de concepto.",
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
      scrollHint: "Scrollen",
      bands: [
        { from: 0, to: 0.34, line: "Websites, die man am Handy versteht" },
        { from: 0.34, to: 0.67, line: "WhatsApp mit einem Tipp" },
        { from: 0.67, to: 1.01, line: "Für lokale Betriebe in Wien" },
      ],
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
          note: "Optional",
          description:
            "Text- und Fotoänderungen, Basis-Monitoring, Support per WhatsApp und Priorität bei neuen Funktionen.",
        },
      ]),
    },
    wienScroll: {
      eyebrow: "Wien",
      scrollHint: "Scrollen",
      bands: [
        { from: 0, to: 0.34, line: "Ich bin in Wien" },
        { from: 0.34, to: 0.67, line: "Websites für lokale Betriebe" },
        { from: 0.67, to: 1.01, line: "Schreib mir auf WhatsApp" },
      ],
    },
    projects: {
      title: "Projekte",
      openLabel: "Demo öffnen",
      scrollHint: "In der Vorschau scrollen",
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
            "Cinematic Landing: Scroll-Video, Speisekarte, Öffnungszeiten und Reservierung per WhatsApp.",
        },
        {
          name: "Kellerlicht",
          category: "Weinbar · Vorlage",
          blurb:
            "Cinematic Landing: Scroll-Video, Weine am Glas, Öffnungszeiten und Reservierung per WhatsApp.",
        },
        {
          name: "VaultShield",
          category: "SaaS · Konzept",
          blurb:
            "Hero für einen Passwort-Manager: Vollbild-Video, seitliches Menü am Handy und Einblend-Animationen.",
        },
        {
          name: "NovaAI",
          category: "SaaS · AI",
          blurb:
            "Kinematische KI-Automatisierungs-Landing: Scroll-Video, Leistungen, Prozess und FAQ als Konzept.",
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
      scrollHint: "Scroll",
      bands: [
        { from: 0, to: 0.34, line: "Websites that make sense on mobile" },
        { from: 0.34, to: 0.67, line: "WhatsApp in one tap" },
        { from: 0.67, to: 1.01, line: "For local businesses in Vienna" },
      ],
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
          note: "Optional",
          description:
            "Text and photo changes, basic monitoring, WhatsApp support and priority on new features.",
        },
      ]),
    },
    wienScroll: {
      eyebrow: "Vienna",
      scrollHint: "Scroll",
      bands: [
        { from: 0, to: 0.34, line: "Based in Vienna" },
        { from: 0.34, to: 0.67, line: "Sites for local businesses" },
        { from: 0.67, to: 1.01, line: "Message me on WhatsApp" },
      ],
    },
    projects: {
      title: "Projects",
      openLabel: "Open demo",
      scrollHint: "Scroll inside to explore",
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
            "Cinematic landing: scroll video, menu, hours and WhatsApp reservations.",
        },
        {
          name: "Kellerlicht",
          category: "Wine bar · Template",
          blurb:
            "Cinematic landing: scroll video, wines by the glass, hours and WhatsApp reservations.",
        },
        {
          name: "VaultShield",
          category: "SaaS · Concept",
          blurb:
            "Password-manager hero: fullscreen video, mobile slide-in menu and entrance animations.",
        },
        {
          name: "NovaAI",
          category: "SaaS · AI",
          blurb:
            "Cinematic AI automation landing: scroll-scrubbed video, services, process and concept FAQ.",
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
