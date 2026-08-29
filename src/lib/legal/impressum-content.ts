import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/locales";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalPageContent = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

function legalName() {
  return process.env.NEXT_PUBLIC_LEGAL_NAME || site.name;
}

function legalAddress() {
  return (
    process.env.NEXT_PUBLIC_LEGAL_ADDRESS || `${site.location.replace(" / Remote", "")}, Österreich`
  );
}

function legalUid() {
  return process.env.NEXT_PUBLIC_LEGAL_UID || "";
}

function legalGisa() {
  return process.env.NEXT_PUBLIC_LEGAL_GISA || "";
}

function legalWko() {
  return process.env.NEXT_PUBLIC_LEGAL_WKO || "";
}

export function getImpressum(locale: Locale): LegalPageContent {
  const name = legalName();
  const address = legalAddress();
  const uid = legalUid();
  const gisa = legalGisa();
  const wko = legalWko();

  if (locale === "en") {
    return {
      title: "Imprint",
      updated: "August 2026",
      sections: [
        {
          title: "Information pursuant to § 5 ECG (Austria)",
          paragraphs: [
            `${name}`,
            address,
            `Email: ${site.email}`,
            site.location,
            uid ? `VAT ID (UID): ${uid}` : "VAT ID (UID): available on request",
            gisa ? `Company register (GISA): ${gisa}` : "Company register (GISA): available on request",
            wko ? `Chamber / trade: ${wko}` : "Chamber / trade (WKO): available on request",
          ],
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
            "This imprint will be completed with full commercial register data when available. Not a substitute for legal advice.",
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
          paragraphs: [
            `${name}`,
            address,
            `Email: ${site.email}`,
            site.location,
            uid ? `UID: ${uid}` : "UID: bajo solicitud",
            gisa ? `GISA: ${gisa}` : "GISA: bajo solicitud",
            wko ? `Cámara / oficio: ${wko}` : "WKO: bajo solicitud",
          ],
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
      ],
    };
  }

  return {
    title: "Impressum",
    updated: "August 2026",
    sections: [
      {
        title: "Angaben gemäß § 5 ECG",
        paragraphs: [
          `${name}`,
          address,
          `E-Mail: ${site.email}`,
          site.location,
          uid ? `UID-Nummer: ${uid}` : "UID-Nummer: auf Anfrage",
          gisa ? `GISA-Nummer: ${gisa}` : "GISA-Nummer: auf Anfrage",
          wko ? `Mitglied der WKO / Gewerbe: ${wko}` : "WKO / Gewerbe: auf Anfrage",
        ],
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
          "Dieses Impressum wird bei Vorliegen vollständiger Firmendaten ergänzt. Kein Ersatz für Rechtsberatung.",
        ],
      },
    ],
  };
}

export function getDatenschutz(locale: Locale): LegalPageContent {
  const name = legalName();
  const address = legalAddress();

  if (locale === "en") {
    return {
      title: "Privacy policy",
      updated: "August 2026",
      sections: [
        {
          title: "Controller",
          paragraphs: [
            `${name}, ${address}`,
            `Email: ${site.email}`,
          ],
        },
        {
          title: "What this site does",
          paragraphs: [
            "Portfolio and lead generation for web design services.",
            "Mobile Erst: you submit a URL; we fetch public HTML for analysis and may store concepts in Supabase (EU). AI diagnosis (Anthropic) generates a written report; optional browser speech synthesis for audio; reports stored in Supabase. Contact form and CRM store leads; client portal uses Supabase Auth.",
            "Menu digitizer: you upload a menu photo; it is sent to Anthropic Vision for OCR. The image is not stored in v1 — only extracted menu JSON in Supabase.",
            "Micro-Bot: FAQ chips are answered locally; free-text messages are processed by Anthropic. Conversations are not stored in v1. Demo business data is fictional.",
            "Copy generator: source text is sent to Anthropic for cultural adaptation; drafts stored in Supabase. Not used for AI training.",
            "Maps concept (internal): Google Maps URL is sent to Google Places API; name, address, hours, photos and reviews feed concept HTML (Anthropic). Concepts stored in Supabase.",
            "Concepts include automatic Schema.org JSON-LD (LocalBusiness, Restaurant, opening hours, optional menu) based on submitted or public business data.",
            "Design Agent chat: messages and generated HTML may be stored with the concept.",
            "Contact: WhatsApp, email and Cal.com are external services with their own privacy policies.",
          ],
        },
        {
          title: "Legal basis (GDPR)",
          paragraphs: [
            "Art. 6(1)(b) GDPR — steps prior to a contract (inquiries, demos).",
            "Art. 6(1)(f) GDPR — legitimate interest in presenting services and securing the site (rate limits).",
          ],
        },
        {
          title: "Processors / third parties",
          paragraphs: [
            "Hosting: Vercel (USA/EU — SCCs).",
            "Database: Supabase (EU region if configured).",
            "AI (server-side only): Anthropic (concept text), Higgsfield (optional images), Google Places (Maps concept) — URLs you submit may be sent.",
            "No sale of personal data.",
          ],
        },
        {
          title: "Cookies & local storage",
          paragraphs: [
            "Cookie sv_locale — remembers your language choice (12 months).",
            "localStorage — optional draft HTML when editing a concept in the browser.",
            "No advertising or tracking cookies in v1.",
          ],
        },
        {
          title: "Retention",
          paragraphs: [
            "Concepts in Supabase: until deleted or expired per operational policy.",
            "Server logs (Vercel): per provider defaults.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Access, rectification, erasure, restriction, portability, objection — contact " + site.email + ".",
            "Complaint to Austrian Data Protection Authority (dsb.gv.at).",
          ],
        },
        {
          title: "Note",
          paragraphs: [
            "Informational only — not legal advice. Will be updated when services change.",
          ],
        },
      ],
    };
  }

  if (locale === "es") {
    return {
      title: "Datenschutz",
      updated: "Agosto 2026",
      sections: [
        {
          title: "Responsable",
          paragraphs: [`${name}, ${address}`, `Email: ${site.email}`],
        },
        {
          title: "Qué hace este sitio",
          paragraphs: [
            "Portfolio y captación de clientes para servicios web.",
            "Mobile Erst: envías una URL; analizamos HTML público y podemos guardar conceptos en Supabase. Diagnóstico IA + informe; audio vía síntesis del navegador. Formulario contacto y CRM guardan leads; portal cliente con Supabase Auth.",
            "Digitalizador de carta: subes una foto; se envía a Anthropic Vision para OCR. La imagen no se guarda en v1 — solo el JSON del menú en Supabase.",
            "Micro-Bot: los chips FAQ se responden localmente; el texto libre se procesa con Anthropic. Las conversaciones no se guardan en v1. Datos demo ficticios.",
            "Generador de copy: el texto origen se envía a Anthropic para adaptación cultural; borradores en Supabase. No se usa para entrenar IA.",
            "Konzept Maps (interno): la URL de Google Maps se envía a Google Places API; nombre, dirección, horarios, fotos y reseñas alimentan el HTML del concepto (Anthropic). Conceptos en Supabase.",
            "Los conceptos incluyen JSON-LD Schema.org automático (LocalBusiness, Restaurant, horarios, carta opcional) según datos del negocio.",
            "Chat del agente: mensajes y HTML generado pueden almacenarse con el concepto.",
            "Contacto: WhatsApp, email y Cal.com son servicios externos.",
          ],
        },
        {
          title: "Base legal (RGPD)",
          paragraphs: [
            "Art. 6(1)(b) — medidas precontractuales.",
            "Art. 6(1)(f) — interés legítimo (presentación del servicio, rate limit).",
          ],
        },
        {
          title: "Encargados",
          paragraphs: [
            "Vercel (hosting), Supabase (BD), Anthropic/Higgsfield/Google Places (IA en servidor).",
          ],
        },
        {
          title: "Cookies y almacenamiento",
          paragraphs: [
            "Cookie sv_locale — idioma preferido.",
            "localStorage — borrador de concepto en el navegador.",
          ],
        },
        {
          title: "Tus derechos",
          paragraphs: [
            "Acceso, rectificación, supresión — " + site.email,
            "Reclamación ante la autoridad austriaca (dsb.gv.at).",
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
        paragraphs: [
          `${name}, ${address}`,
          `E-Mail: ${site.email}`,
        ],
      },
      {
        title: "Was diese Website macht",
        paragraphs: [
          "Portfolio und Lead-Generierung für Webdesign-Dienstleistungen.",
          "Mobile Erst: Sie geben eine URL ein; wir laden öffentliches HTML zur Analyse und speichern Konzepte ggf. in Supabase. KI-Diagnose + Report; Audio optional per Browser. Kontaktformular und CRM speichern Leads; Kundenportal mit Supabase Auth.",
          "Speisekarten-Digitalisierung: Sie laden ein Foto hoch; es wird an Anthropic Vision zur Texterkennung gesendet. Das Bild wird in v1 nicht gespeichert — nur extrahierte Menüdaten in Supabase.",
          "Micro-Bot: FAQ-Chips werden lokal beantwortet; Freitext wird von Anthropic verarbeitet. Gespräche werden in v1 nicht gespeichert. Demo-Betriebsdaten sind fiktiv.",
          "Copy-Generator: Quelltext wird an Anthropic zur kulturellen Anpassung gesendet; Entwürfe in Supabase. Kein KI-Training.",
          "Maps-Konzept (intern): Google-Maps-URL wird an Google Places API gesendet; Name, Adresse, Öffnungszeiten, Fotos und Reviews fließen in Konzept-HTML (Anthropic). Konzepte in Supabase.",
          "Konzepte enthalten automatisch Schema.org JSON-LD (LocalBusiness, Restaurant, Öffnungszeiten, optional Speisekarte) — basierend auf eingegebenen oder öffentlichen Betriebsdaten.",
          "Design-Agent-Chat: Nachrichten und generiertes HTML können mit dem Konzept gespeichert werden.",
          "Kontakt: WhatsApp, E-Mail und Cal.com sind externe Dienste mit eigenen Datenschutzbestimmungen.",
        ],
      },
      {
        title: "Rechtsgrundlagen (DSGVO)",
        paragraphs: [
          "Art. 6 Abs. 1 lit. b DSGVO — vorvertragliche Maßnahmen (Anfragen, Demos).",
          "Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse (Darstellung des Angebots, Rate-Limiting).",
        ],
      },
      {
        title: "Auftragsverarbeiter / Dritte",
        paragraphs: [
          "Hosting: Vercel (USA/EU — Standardvertragsklauseln).",
          "Datenbank: Supabase (EU-Region wenn konfiguriert).",
          "KI (nur serverseitig): Anthropic (Konzepttext), Higgsfield (optional Bilder), Google Places (Maps-Konzept) — von Ihnen eingegebene URLs können übermittelt werden.",
          "Kein Verkauf personenbezogener Daten.",
        ],
      },
      {
        title: "Cookies & localStorage",
        paragraphs: [
          "Cookie sv_locale — speichert Ihre Sprachwahl (12 Monate).",
          "localStorage — optionaler HTML-Entwurf beim Bearbeiten eines Konzepts im Browser.",
          "Keine Werbe- oder Tracking-Cookies in v1.",
        ],
      },
      {
        title: "Speicherdauer",
        paragraphs: [
          "Konzepte in Supabase: bis zur Löschung oder Ablauf gemäß Betriebsrichtlinie.",
          "Server-Logs (Vercel): gemäß Anbieter.",
        ],
      },
      {
        title: "Ihre Rechte",
        paragraphs: [
          "Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch — " + site.email,
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
