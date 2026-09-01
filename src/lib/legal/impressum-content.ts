import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/locales";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  /** Stable anchor for deep links (e.g. #cookies). */
  id?: string;
};

export type LegalPageContent = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

function envPublic(key: string): string {
  return process.env[key]?.trim() || "";
}

function legalName() {
  return envPublic("NEXT_PUBLIC_LEGAL_NAME") || site.name;
}

/** Empty when unset — callers must show an explicit placeholder. */
function legalAddress() {
  return envPublic("NEXT_PUBLIC_LEGAL_ADDRESS");
}

function legalEmail() {
  return envPublic("NEXT_PUBLIC_LEGAL_EMAIL") || site.email;
}

function legalUid() {
  return envPublic("NEXT_PUBLIC_LEGAL_UID");
}

function legalGisa() {
  return envPublic("NEXT_PUBLIC_LEGAL_GISA");
}

function legalFirmenbuch() {
  return envPublic("NEXT_PUBLIC_LEGAL_FIRMENBUCH");
}

function legalGewerbebehoerde() {
  return envPublic("NEXT_PUBLIC_LEGAL_GEWERBEBEHOERDE");
}

function legalWko() {
  return envPublic("NEXT_PUBLIC_LEGAL_WKO");
}

function ph(
  locale: Locale,
  de: string,
  en: string,
  es: string,
): string {
  if (locale === "en") return `[To complete: ${en}]`;
  if (locale === "es") return `[Por completar: ${es}]`;
  return `[Zu ergänzen: ${de}]`;
}

function line(label: string, value: string, missing: string): string {
  return `${label}: ${value || missing}`;
}

function impressumIdentity(locale: Locale): string[] {
  const name = legalName();
  const address = legalAddress();
  const email = legalEmail();
  const gisa = legalGisa();
  const firmenbuch = legalFirmenbuch();
  const uid = legalUid();
  const behoerde = legalGewerbebehoerde();
  const wko = legalWko();

  if (locale === "en") {
    return [
      line("Full / trade name", name, ph(locale, "", "full / trade name", "")),
      line("Postal address", address, ph(locale, "", "postal address", "")),
      line("Email", email, ph(locale, "", "contact email", "")),
      line(
        "Trade licence / GISA no.",
        gisa,
        ph(locale, "", "GISA / Gewerbeschein number (if applicable)", ""),
      ),
      line(
        "Company register (Firmenbuch)",
        firmenbuch,
        ph(locale, "", "Firmenbuchnummer if applicable — otherwise N/A", ""),
      ),
      line(
        "VAT ID (UID)",
        uid,
        ph(locale, "", "UID if charging VAT — otherwise N/A", ""),
      ),
      line(
        "Supervisory authority (Gewerbebehörde)",
        behoerde,
        ph(locale, "", "Gewerbebehörde if applicable", ""),
      ),
      line(
        "Chamber / trade (WKO)",
        wko,
        ph(locale, "", "WKO membership / trade (optional)", ""),
      ),
    ];
  }

  if (locale === "es") {
    return [
      line("Nombre completo / comercial", name, ph(locale, "", "", "nombre completo / comercial")),
      line("Dirección postal", address, ph(locale, "", "", "dirección postal")),
      line("Email", email, ph(locale, "", "", "email de contacto")),
      line(
        "Gewerbeschein / GISA",
        gisa,
        ph(locale, "", "", "nº GISA / Gewerbeschein (si aplica)"),
      ),
      line(
        "Firmenbuchnummer",
        firmenbuch,
        ph(locale, "", "", "Firmenbuchnummer si aplica — si no, N/A"),
      ),
      line(
        "UID-Nummer",
        uid,
        ph(locale, "", "", "UID si facturas con IVA — si no, N/A"),
      ),
      line(
        "Gewerbebehörde",
        behoerde,
        ph(locale, "", "", "autoridad reguladora (Gewerbebehörde) si aplica"),
      ),
      line(
        "WKO / oficio",
        wko,
        ph(locale, "", "", "afiliación WKO / oficio (opcional)"),
      ),
    ];
  }

  return [
    line("Vollständiger / Firmenname", name, ph(locale, "Vollständiger / Firmenname", "", "")),
    line("Anschrift", address, ph(locale, "postalische Anschrift", "", "")),
    line("E-Mail", email, ph(locale, "Kontakt-E-Mail", "", "")),
    line(
      "Gewerbe / GISA-Nummer",
      gisa,
      ph(locale, "GISA- / Gewerbeschein-Nummer (falls zutreffend)", "", ""),
    ),
    line(
      "Firmenbuchnummer",
      firmenbuch,
      ph(locale, "Firmenbuchnummer falls zutreffend — sonst N/A", "", ""),
    ),
    line(
      "UID-Nummer",
      uid,
      ph(locale, "UID bei USt-Ausweis — sonst N/A", "", ""),
    ),
    line(
      "Gewerbebehörde",
      behoerde,
      ph(locale, "Gewerbebehörde falls zutreffend", "", ""),
    ),
    line(
      "WKO / Gewerbe",
      wko,
      ph(locale, "WKO-Mitgliedschaft / Gewerbe (optional)", "", ""),
    ),
  ];
}

export function getImpressum(locale: Locale): LegalPageContent {
  if (locale === "en") {
    return {
      title: "Impressum",
      updated: "August 2026",
      sections: [
        {
          title: "Information pursuant to § 5 ECG (Austria)",
          paragraphs: impressumIdentity(locale),
        },
        {
          title: "Online dispute resolution",
          paragraphs: [
            "EU platform for online dispute resolution: https://ec.europa.eu/consumers/odr/",
            "We are not obliged or willing to participate in dispute resolution before a consumer arbitration board unless required by law.",
          ],
        },
        {
          title: "Liability for content and links",
          paragraphs: [
            "Content on this site was created with care. No guarantee for completeness or accuracy. External links are not under our control.",
          ],
        },
        {
          title: "Note",
          paragraphs: [
            "Fields marked “[To complete: …]” must be filled via NEXT_PUBLIC_LEGAL_* env vars before relying on this page. Not a substitute for legal advice.",
          ],
        },
      ],
    };
  }

  if (locale === "es") {
    return {
      title: "Impressum",
      updated: "Agosto 2026",
      sections: [
        {
          title: "Información según § 5 ECG (Austria)",
          paragraphs: impressumIdentity(locale),
        },
        {
          title: "Resolución de litigios",
          paragraphs: [
            "Plataforma UE ODR: https://ec.europa.eu/consumers/odr/",
            "No estamos obligados a participar en procedimientos de arbitraje de consumo salvo obligación legal.",
          ],
        },
        {
          title: "Responsabilidad",
          paragraphs: [
            "Contenido creado con cuidado, sin garantía de exhaustividad. Enlaces externos fuera de nuestro control.",
          ],
        },
        {
          title: "Nota",
          paragraphs: [
            "Los campos “[Por completar: …]” se rellenan con variables NEXT_PUBLIC_LEGAL_* en el entorno. No sustituye asesoría legal.",
          ],
        },
      ],
    };
  }

  return {
    title: "Impressum",
    updated: "August 2026",
    sections: [
      {
        title: "Angaben gemäß § 5 ECG",
        paragraphs: impressumIdentity(locale),
      },
      {
        title: "Online-Streitbeilegung",
        paragraphs: [
          "Plattform der EU-Kommission: https://ec.europa.eu/consumers/odr/",
          "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern gesetzlich nicht vorgeschrieben.",
        ],
      },
      {
        title: "Haftung für Inhalte und Links",
        paragraphs: [
          "Inhalte dieser Website wurden mit Sorgfalt erstellt. Keine Gewähr für Vollständigkeit oder Aktualität. Für externe Links übernehmen wir keine Haftung.",
        ],
      },
      {
        title: "Hinweis",
        paragraphs: [
          "Mit „[Zu ergänzen: …]“ markierte Angaben über NEXT_PUBLIC_LEGAL_*-Umgebungsvariablen pflegen. Kein Ersatz für Rechtsberatung.",
        ],
      },
    ],
  };
}

export function getDatenschutz(locale: Locale): LegalPageContent {
  const name = legalName();
  const address =
    legalAddress() ||
    ph(locale, "postalische Anschrift", "postal address", "dirección postal");
  const email = legalEmail();

  if (locale === "en") {
    return {
      title: "Privacy policy",
      updated: "August 2026",
      sections: [
        {
          title: "Controller",
          paragraphs: [`${name}`, address, `Email: ${email}`],
        },
        {
          title: "Personal data we collect",
          paragraphs: [
            "Contact form / CRM leads: name, business name, message, and related metadata you submit.",
            "Site audit: the URL you submit; we fetch publicly available HTML and may store audit reports and concepts.",
            "Optional tools you use: brief text, menu photos (OCR), Design Agent chat, copy drafts, Maps concept URLs — processed as described below.",
            "WhatsApp and Cal.com: if you contact or book via those links, data is processed under their policies (not stored by us beyond what you send us).",
            "Technical logs: IP and request metadata via hosting (Vercel) for security and rate limiting.",
            "We do not run marketing analytics (no Vercel Analytics, Meta Pixel, or similar trackers in v1).",
          ],
        },
        {
          title: "Purpose and legal basis",
          paragraphs: [
            "Art. 6(1)(b) GDPR — steps prior to a contract (inquiries, demos, quotes).",
            "Art. 6(1)(f) GDPR — legitimate interest in operating the portfolio site, delivering requested tools, and securing the service (rate limits).",
            "Art. 6(1)(a) GDPR — only if we later introduce features that require consent (e.g. non-essential cookies); none in v1.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "Vercel — hosting and server logs.",
            "Supabase — database (leads, concepts, drafts, audit reports) and Auth for /admin and /portal.",
            "Anthropic — server-side AI (audit diagnosis, Design Agent, menu OCR, Micro-Bot free text, copy, Maps concept text).",
            "Google Places API — Maps→Konzept (internal): place data for concepts you request.",
            "Higgsfield — optional image generation when configured.",
            "WhatsApp — external chat when you open a wa.me / WhatsApp link.",
            "Cal.com — external scheduling when you open the calendar link.",
            "Email — messages you send to the contact address.",
            "We do not use Vercel Analytics or Meta Pixel in v1. Personal data is not sold.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies",
          paragraphs: [
            "A consent banner lets you accept all, reject non-essential, or customize analytics/marketing. Choice is stored in the sv_consent cookie (and localStorage mirror) for up to 12 months.",
            "sv_locale — remembers your language choice (up to 12 months), set when you switch locale (necessary).",
            "Supabase Auth cookies — only if you sign in to /admin or /portal (necessary for those areas).",
            "localStorage — optional concept HTML draft in the browser when editing a concept.",
            "Analytics and marketing scripts load only after opt-in via ConsentScriptGate. In v1 no Vercel Analytics or Meta Pixel is installed yet.",
          ],
        },
        {
          title: "Retention",
          paragraphs: [
            "Leads and concepts in Supabase: until deleted or per operational policy.",
            "Vercel server logs: according to the provider’s defaults.",
            "sv_locale cookie: up to 12 months.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "You may request access, rectification, erasure, restriction, portability, and objection under the GDPR.",
            `To exercise these rights, email ${email}.`,
            "You may lodge a complaint with the Austrian Data Protection Authority (dsb.gv.at).",
          ],
        },
        {
          title: "Note",
          paragraphs: [
            "Informational only — not legal advice. Updated when services change.",
          ],
        },
      ],
    };
  }

  if (locale === "es") {
    return {
      title: "Privacidad",
      updated: "Agosto 2026",
      sections: [
        {
          title: "Responsable del tratamiento",
          paragraphs: [`${name}`, address, `Email: ${email}`],
        },
        {
          title: "Datos personales que se recogen",
          paragraphs: [
            "Formulario de contacto / leads CRM: nombre, negocio, mensaje y metadatos que envías.",
            "Auditoría web: la URL que envías; obtenemos HTML público y podemos guardar informes y conceptos.",
            "Herramientas opcionales: brief, foto de carta (OCR), chat del Design Agent, borradores de copy, URL Maps→Konzept — según se describe abajo.",
            "WhatsApp y Cal.com: si escribes o reservas por esos enlaces, el tratamiento lo hacen esos proveedores (sus políticas).",
            "Logs técnicos: IP y metadatos de petición vía hosting (Vercel) por seguridad y rate limit.",
            "No usamos analítica de marketing (ni Vercel Analytics ni Meta Pixel en v1).",
          ],
        },
        {
          title: "Finalidad y base legal",
          paragraphs: [
            "Art. 6(1)(b) RGPD — medidas precontractuales (consultas, demos, presupuestos).",
            "Art. 6(1)(f) RGPD — interés legítimo en operar el portafolio, prestar las herramientas solicitadas y asegurar el servicio (rate limits).",
            "Art. 6(1)(a) RGPD — solo si en el futuro hubiera funciones que exijan consentimiento (p. ej. cookies no esenciales); ninguna en v1.",
          ],
        },
        {
          title: "Servicios de terceros",
          paragraphs: [
            "Vercel — hosting y logs de servidor.",
            "Supabase — base de datos (leads, conceptos, borradores, informes) y Auth en /admin y /portal.",
            "Anthropic — IA en servidor (diagnóstico de auditoría, Design Agent, OCR de carta, Micro-Bot, copy, texto Maps).",
            "Google Places API — Maps→Konzept (interno).",
            "Higgsfield — imágenes opcionales si está configurado.",
            "WhatsApp — chat externo al abrir el enlace.",
            "Cal.com — agenda externa al abrir el calendario.",
            "Email — mensajes a la dirección de contacto.",
            "No usamos Vercel Analytics ni Meta Pixel en v1. No vendemos datos personales.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies",
          paragraphs: [
            "Un banner de consentimiento permite aceptar todo, rechazar lo no esencial o personalizar analítica/marketing. La elección se guarda en la cookie sv_consent (y localStorage) hasta 12 meses.",
            "sv_locale — recuerda el idioma (hasta 12 meses) al cambiar de locale (necesaria).",
            "Cookies de Supabase Auth — solo si inicias sesión en /admin o /portal (necesarias ahí).",
            "localStorage — borrador opcional de HTML de concepto en el navegador.",
            "Scripts de analítica/marketing solo tras opt-in (ConsentScriptGate). En v1 aún no hay Vercel Analytics ni Meta Pixel instalados.",
          ],
        },
        {
          title: "Tiempo de retención",
          paragraphs: [
            "Leads y conceptos en Supabase: hasta borrado o según operación.",
            "Logs de Vercel: según el proveedor.",
            "Cookie sv_locale: hasta 12 meses.",
          ],
        },
        {
          title: "Derechos del usuario",
          paragraphs: [
            "Acceso, rectificación, supresión, limitación, portabilidad y oposición (RGPD).",
            `Para ejercerlos, escribe a ${email}.`,
            "Puedes reclamar ante la autoridad austriaca de protección de datos (dsb.gv.at).",
          ],
        },
        {
          title: "Nota",
          paragraphs: [
            "Informativo — no sustituye asesoría legal. Se actualiza si cambian los servicios.",
          ],
        },
      ],
    };
  }

  return {
    title: "Datenschutzerklärung",
    updated: "August 2026",
    sections: [
      {
        title: "Verantwortlicher",
        paragraphs: [`${name}`, address, `E-Mail: ${email}`],
      },
      {
        title: "Welche personenbezogenen Daten wir erheben",
        paragraphs: [
          "Kontaktformular / CRM-Leads: Name, Betrieb, Nachricht und von Ihnen übermittelte Metadaten.",
          "Web-Audit: die eingegebene URL; öffentliches HTML wird geladen; Reports und Konzepte können gespeichert werden.",
          "Optionale Tools: Brief-Text, Speisekartenfotos (OCR), Design-Agent-Chat, Copy-Entwürfe, Maps-Konzept-URLs — wie unten beschrieben.",
          "WhatsApp und Cal.com: bei Nutzung dieser Links gilt die Datenschutzpraxis der jeweiligen Anbieter.",
          "Technische Logs: IP und Request-Metadaten über Hosting (Vercel) zu Sicherheit und Rate-Limiting.",
          "Kein Marketing-Tracking (kein Vercel Analytics, kein Meta Pixel in v1).",
        ],
      },
      {
        title: "Zweck und Rechtsgrundlagen",
        paragraphs: [
          "Art. 6 Abs. 1 lit. b DSGVO — vorvertragliche Maßnahmen (Anfragen, Demos, Angebote).",
          "Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am Betrieb der Website, an angefragten Tools und an der Absicherung (Rate Limits).",
          "Art. 6 Abs. 1 lit. a DSGVO — nur falls künftig Einwilligung nötig wird (z. B. nicht notwendige Cookies); in v1 keine.",
        ],
      },
      {
        title: "Drittanbieter",
        paragraphs: [
          "Vercel — Hosting und Server-Logs.",
          "Supabase — Datenbank (Leads, Konzepte, Entwürfe, Reports) und Auth für /admin und /portal.",
          "Anthropic — serverseitige KI (Audit-Diagnose, Design Agent, Speisekarten-OCR, Micro-Bot, Copy, Maps-Text).",
          "Google Places API — Maps→Konzept (intern).",
          "Higgsfield — optionale Bildgenerierung, sofern konfiguriert.",
          "WhatsApp — externer Chat über den Link.",
          "Cal.com — externe Terminbuchung über den Kalender-Link.",
          "E-Mail — Nachrichten an die Kontaktadresse.",
          "Kein Vercel Analytics und kein Meta Pixel in v1. Kein Verkauf personenbezogener Daten.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        paragraphs: [
          "Ein Einwilligungs-Banner erlaubt Alles akzeptieren, nur Notwendige oder Anpassen von Analyse/Marketing. Die Wahl wird in der Cookie sv_consent (und localStorage) bis 12 Monate gespeichert.",
          "sv_locale — speichert die Sprachwahl (bis 12 Monate) beim Sprachwechsel (notwendig).",
          "Supabase-Auth-Cookies — nur bei Anmeldung in /admin oder /portal (dort notwendig).",
          "localStorage — optionaler HTML-Entwurf eines Konzepts im Browser.",
          "Analyse-/Marketing-Skripte nur nach Opt-in (ConsentScriptGate). In v1 sind noch kein Vercel Analytics und kein Meta Pixel installiert.",
        ],
      },
      {
        title: "Speicherdauer",
        paragraphs: [
          "Leads und Konzepte in Supabase: bis zur Löschung oder gemäß Betriebsrichtlinie.",
          "Vercel-Logs: gemäß Anbieter.",
          "Cookie sv_locale: bis 12 Monate.",
        ],
      },
      {
        title: "Ihre Rechte",
        paragraphs: [
          "Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (DSGVO).",
          `Zur Ausübung: E-Mail an ${email}.`,
          "Beschwerde bei der Österreichischen Datenschutzbehörde (dsb.gv.at).",
        ],
      },
      {
        title: "Hinweis",
        paragraphs: [
          "Kein Ersatz für Rechtsberatung. Wird bei Änderungen der Dienste aktualisiert.",
        ],
      },
    ],
  };
}
