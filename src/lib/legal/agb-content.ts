import type { Locale } from "@/lib/i18n/locales";
import type { LegalPageContent } from "@/lib/legal/impressum-content";

export function getAgb(locale: Locale): LegalPageContent {
  if (locale === "en") {
    return {
      title: "Terms of service",
      updated: "August 2026",
      sections: [
        {
          title: "1. Scope of service",
          paragraphs: [
            "These terms apply to website projects offered by Santi Villa (portfolio: santivilla.com) for local businesses.",
            "Landing (€400–800): one clear responsive page, WhatsApp/booking CTA, domain + Vercel setup.",
            "Business site (€900–2,000): 4–6 pages (menu/services/hours, map, contact), basic SEO, up to 2 revision rounds on the live build.",
            "Maintenance (€50–150/month): content updates, basic monitoring, WhatsApp support.",
            "Shopping center / multi-shop projects: typically ~€3,000–8,000+ depending on shops, languages and CMS — scoped in writing before deposit.",
          ],
        },
        {
          title: "2. Process",
          paragraphs: [
            "Audit or demo → free Konzept/demo (honest redesign preview, not the official site) → deposit 30–50% to reserve the build slot → development → delivery of the live site / code on final payment.",
            "WhatsApp or a short call may be used to refine scope before the deposit.",
          ],
        },
        {
          title: "3. Estimated timelines",
          paragraphs: [
            "After deposit and a closed brief: Landing about 1–2 weeks; business site about 2–4 weeks; shopping-center class projects about 4–8+ weeks.",
            "Timelines are estimates and depend on timely feedback and content from the client.",
          ],
        },
        {
          title: "4. Revisions",
          paragraphs: [
            "Free Konzept: refinements via WhatsApp until you say yes — before any payment for the real site.",
            "Paid build: two rounds of revisions included before the remaining balance is due. Extra rounds or out-of-scope changes may be quoted separately.",
          ],
        },
        {
          title: "5. Payment",
          paragraphs: [
            "Deposit 30–50% of the agreed package price reserves the date and starts paid work.",
            "Accepted methods: SEPA bank transfer / invoice under Austrian practice (details on the invoice).",
            "Remaining balance is invoiced on delivery of the agreed code / go-live. Code handover follows payment of that balance.",
          ],
        },
        {
          title: "6. Cancellation after deposit",
          paragraphs: [
            "If you cancel after the deposit, the deposit is non-refundable (date reserved and work started).",
            "You will not be charged the remaining balance if the project is not delivered.",
          ],
        },
        {
          title: "7. Ownership",
          paragraphs: [
            "Upon full payment, you receive ownership of the project’s design and code as delivered for your business site.",
            "Santi Villa may show the work in the portfolio unless we agree otherwise in writing. Third-party assets (fonts, stock, APIs) keep their own licences.",
          ],
        },
        {
          title: "8. Guarantee — see the design before you pay",
          paragraphs: [
            "You see the Konzept / design before paying a euro for the real website. Audit and initial Konzept are free and without obligation; payment starts only when you commission the paid build (deposit).",
            "This is not a money-back guarantee after final delivery of paid code.",
          ],
        },
        {
          title: "Note",
          paragraphs: [
            "Informational terms for transparency — not a substitute for legal advice. Written offers may add project-specific terms.",
          ],
        },
      ],
    };
  }

  if (locale === "es") {
    return {
      title: "Términos de servicio",
      updated: "Agosto 2026",
      sections: [
        {
          title: "1. Alcance del servicio",
          paragraphs: [
            "Estos términos aplican a proyectos web de Santi Villa (portafolio: santivilla.com) para negocios locales.",
            "Landing (€400–800): una página responsive clara, CTA WhatsApp/reserva, setup de dominio + Vercel.",
            "Sitio negocio (€900–2.000): 4–6 páginas (menú/servicios/horarios, mapa, contacto), SEO básico, hasta 2 rondas de cambios en la web real.",
            "Mantenimiento (€50–150/mes): cambios de contenido, monitoreo básico, soporte WhatsApp.",
            "Centro comercial / multi-tienda: orientativo ~€3.000–8.000+ según shops, idiomas y CMS — alcance por escrito antes del depósito.",
          ],
        },
        {
          title: "2. Proceso",
          paragraphs: [
            "Auditoría o demo → Konzept/demo gratis (preview honesta, no el sitio oficial) → depósito 30–50% para reservar fecha → desarrollo → entrega del sitio / código al pagar el resto.",
            "WhatsApp o una llamada corta pueden afinar el alcance antes del depósito.",
          ],
        },
        {
          title: "3. Plazos estimados",
          paragraphs: [
            "Tras depósito y brief cerrado: Landing ~1–2 semanas; sitio negocio ~2–4 semanas; proyectos tipo centro ~4–8+ semanas.",
            "Los plazos son orientativos y dependen de feedback y contenidos a tiempo por parte del cliente.",
          ],
        },
        {
          title: "4. Revisiones",
          paragraphs: [
            "Konzept gratis: afinamos por WhatsApp hasta que digas sí — antes de pagar nada por la web real.",
            "Web de pago: 2 rondas de revisión incluidas antes de cobrar el saldo. Rondas extra o fuera de alcance se cotizan aparte.",
          ],
        },
        {
          title: "5. Condiciones de pago",
          paragraphs: [
            "El depósito del 30–50% del precio acordado reserva la fecha e inicia el trabajo de pago.",
            "Métodos: transferencia SEPA / factura según práctica en Austria (detalle en la factura).",
            "El resto se factura a la entrega del código / go-live acordado. La entrega del código sigue al pago de ese saldo.",
          ],
        },
        {
          title: "6. Cancelación tras el depósito",
          paragraphs: [
            "Si cancelas después del depósito, el depósito no es reembolsable (fecha reservada y trabajo iniciado).",
            "No se cobra el saldo si el proyecto no se entrega.",
          ],
        },
        {
          title: "7. Propiedad",
          paragraphs: [
            "Con el pago completo, adquieres el diseño y el código del proyecto entregado para tu web.",
            "Santi Villa puede mostrar el trabajo en el portafolio salvo acuerdo escrito en contrario. Licencias de terceros (fuentes, stock, APIs) siguen siendo suyas.",
          ],
        },
        {
          title: "8. Garantía — ves el diseño antes de pagar",
          paragraphs: [
            "Ves el Konzept / diseño antes de pagar un euro por la web real. Auditoría y Konzept inicial son gratis y sin compromiso; el pago empieza solo al encargar la web de pago (depósito).",
            "Esto no es una garantía de devolución tras la entrega final del código pagado.",
          ],
        },
        {
          title: "Nota",
          paragraphs: [
            "Términos informativos — no sustituyen asesoría legal. Ofertas por escrito pueden añadir condiciones del proyecto.",
          ],
        },
      ],
    };
  }

  return {
    title: "AGB",
    updated: "August 2026",
    sections: [
      {
        title: "1. Leistungsgegenstand",
        paragraphs: [
          "Diese Bedingungen gelten für Website-Projekte von Santi Villa (Portfolio: santivilla.com) für lokale Betriebe.",
          "Landing (€400–800): eine klare responsive Seite, WhatsApp-/Buchungs-CTA, Domain- + Vercel-Setup.",
          "Business-Site (€900–2.000): 4–6 Seiten (Menü/Leistungen/Zeiten, Karte, Kontakt), Basis-SEO, bis zu 2 Änderungsrunden am Live-Build.",
          "Wartung (€50–150/Monat): Content-Updates, Basis-Monitoring, WhatsApp-Support.",
          "Einkaufszentrum / Multi-Shop: orientierend ~€3.000–8.000+ je nach Shops, Sprachen und CMS — schriftlich vor der Anzahlung.",
        ],
      },
      {
        title: "2. Ablauf",
        paragraphs: [
          "Audit oder Demo → kostenloses Konzept/Demo (ehrliche Vorschau, keine offizielle Site) → Anzahlung 30–50% zur Terminreserve → Umsetzung → Übergabe Site/Code bei Restzahlung.",
          "WhatsApp oder ein kurzes Gespräch können den Umfang vor der Anzahlung klären.",
        ],
      },
      {
        title: "3. Geschätzte Fristen",
        paragraphs: [
          "Nach Anzahlung und geschlossenem Brief: Landing ca. 1–2 Wochen; Business-Site ca. 2–4 Wochen; Center-Projekte ca. 4–8+ Wochen.",
          "Fristen sind Schätzungen und hängen von zeitnahem Feedback und Inhalten des Kunden ab.",
        ],
      },
      {
        title: "4. Korrekturen",
        paragraphs: [
          "Kostenloses Konzept: Feinschliff per WhatsApp bis zum Ja — bevor für die echte Site gezahlt wird.",
          "Bezahlter Build: 2 Korrekturrunden inklusive vor der Restzahlung. Weitere Runden oder Scope-Erweiterungen werden gesondert angeboten.",
        ],
      },
      {
        title: "5. Zahlung",
        paragraphs: [
          "Anzahlung 30–50% des vereinbarten Paketpreises reserviert den Termin und startet die bezahlte Arbeit.",
          "Zahlungswege: SEPA-Überweisung / Rechnung nach österreichischer Praxis (Details auf der Rechnung).",
          "Restbetrag bei Übergabe des vereinbarten Codes / Go-Live. Code-Übergabe nach Zahlung des Rests.",
        ],
      },
      {
        title: "6. Storno nach Anzahlung",
        paragraphs: [
          "Bei Storno nach Anzahlung ist die Anzahlung nicht erstattungsfähig (Termin reserviert, Arbeit begonnen).",
          "Der Restbetrag wird nicht verlangt, wenn das Projekt nicht geliefert wird.",
        ],
      },
      {
        title: "7. Eigentum",
        paragraphs: [
          "Mit vollständiger Zahlung erhältst du Design und Code des gelieferten Projektstands für deine Website.",
          "Santi Villa darf die Arbeit im Portfolio zeigen, sofern schriftlich nichts anderes vereinbart ist. Drittmaterial (Fonts, Stock, APIs) behält eigene Lizenzen.",
        ],
      },
      {
        title: "8. Garantie — Design sehen, bevor du zahlst",
        paragraphs: [
          "Du siehst das Konzept/Design, bevor du einen Euro für die echte Website zahlst. Audit und erstes Konzept sind kostenlos und unverbindlich; Zahlung beginnt erst mit dem Auftrag zur bezahlten Umsetzung (Anzahlung).",
          "Das ist keine Geld-zurück-Garantie nach finaler Übergabe bezahlten Codes.",
        ],
      },
      {
        title: "Hinweis",
        paragraphs: [
          "Transparente Informationen — kein Ersatz für Rechtsberatung. Schriftliche Angebote können projektspezifische Punkte ergänzen.",
        ],
      },
    ],
  };
}
