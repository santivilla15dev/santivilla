import type { Locale } from "@/lib/i18n/locales";

/** Assets autoalojados (el mp4 original de CloudFront era temporal). */
export const vaultshieldAssets = {
  video: "/demos/vaultshield/hero.mp4",
  poster: "/demos/vaultshield/hero-poster.webp",
} as const;

export const vaultshieldTheme = {
  text: "#192837",
  accent: "#7342E2",
  loginBg: "#F2F2EE",
  sheetBg: "#CFC8C5",
} as const;

export type VaultshieldContent = {
  locale: Locale;
  langLabel: string;
  brand: string;
  nav: { links: string[]; start: string; signIn: string; menuOpen: string; menuClose: string };
  /**
   * Titular partido en 3 tramos para intercalar los iconos:
   * [Zap] part1 [LockKeyhole] part2 [Fingerprint]
   */
  heading: [string, string];
  subtext: string;
  cta: string;
  conceptNote: string;
};

const CONTENT: Record<Locale, VaultshieldContent> = {
  en: {
    locale: "en",
    langLabel: "Language",
    brand: "VaultShield",
    nav: {
      links: ["Vault", "Plans", "Install", "News", "Help"],
      start: "Start For Free",
      signIn: "Sign In",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    heading: ["Lock Down Your Passwords", "with Ironclad Security"],
    subtext:
      "Zero stress, total control. VaultShield keeps you covered with unbreakable storage, one-tap access, and pro-grade tools for your non-stop world.",
    cta: "Get It Free",
    conceptNote:
      "Concept demo for the Santi Villa portfolio — VaultShield is not a real product.",
  },
  de: {
    locale: "de",
    langLabel: "Sprache",
    brand: "VaultShield",
    nav: {
      links: ["Tresor", "Tarife", "Installieren", "News", "Hilfe"],
      start: "Kostenlos starten",
      signIn: "Anmelden",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
    },
    heading: ["Sichere deine Passwörter", "mit eiserner Verschlüsselung"],
    subtext:
      "Kein Stress, volle Kontrolle. VaultShield schützt dich mit unknackbarem Speicher, Zugriff mit einem Tipp und Profi-Tools für deinen Alltag ohne Pause.",
    cta: "Gratis holen",
    conceptNote:
      "Konzept-Demo für das Portfolio von Santi Villa — VaultShield ist kein echtes Produkt.",
  },
  es: {
    locale: "es",
    langLabel: "Idioma",
    brand: "VaultShield",
    nav: {
      links: ["Bóveda", "Planes", "Instalar", "Novedades", "Ayuda"],
      start: "Empieza gratis",
      signIn: "Iniciar sesión",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
    },
    heading: ["Blinda tus contraseñas", "con seguridad a prueba de todo"],
    subtext:
      "Cero estrés, control total. VaultShield te cubre con almacenamiento inquebrantable, acceso con un toque y herramientas profesionales para tu día a día sin pausa.",
    cta: "Consíguelo gratis",
    conceptNote:
      "Demo conceptual para el portfolio de Santi Villa — VaultShield no es un producto real.",
  },
};

export function getVaultshieldContent(locale: Locale): VaultshieldContent {
  return CONTENT[locale];
}
