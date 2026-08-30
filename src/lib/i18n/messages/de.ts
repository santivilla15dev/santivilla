import type { SiteMessages } from "./types";

const packages: SiteMessages["packages"] = [
  {
    id: "landing",
    name: "Landing",
    price: "€400–800",
    description:
      "Eine klare Seite auf Handy, Tablet und Desktop — mit WhatsApp und Domain/Hosting.",
    includes: [
      "Responsive Design (alle Geräte)",
      "1 Seite + Sektionen",
      "WhatsApp / Reservierung",
      "Domain + Vercel Setup",
    ],
  },
  {
    id: "negocio",
    name: "Business-Website",
    price: "€900–2.000",
    description:
      "Komplette Website (4–6 Seiten) für Restaurant, Shop oder lokalen Betrieb.",
    includes: [
      "Menü / Leistungen / Öffnungszeiten",
      "Karte & Kontakt",
      "Basis-SEO",
      "Bis zu 2 Feedback-Runden",
    ],
  },
  {
    id: "mensual",
    name: "Wartung",
    price: "€50–150/Monat",
    description: "Text-/Foto-Updates, Uptime und kleine Verbesserungen monatlich.",
    includes: [
      "Content-Änderungen",
      "Basis-Monitoring",
      "WhatsApp-Support",
      "Priorität bei Features",
    ],
  },
];

const projects: SiteMessages["projects"] = [
  {
    slug: "lugner",
    title: "Lugner City — Redesign Konzept",
    type: "Shopping Center",
    href: "/demos/lugner",
    group: "vienna",
    blurb:
      "Mobile-first Vorschlag für Lugner City (Wien). Konzept, keine offizielle Website.",
    beforeNote:
      "Die aktuelle Site (lugner.at) basiert auf klassischem Typo3 — am Handy schwer nutzbar.",
    afterNote:
      "Neue Home mit Öffnungszeiten, Shops, Anfahrt und Kontakt in einem klaren Flow.",
  },
  {
    slug: "restaurant",
    title: "Gasthaus Am Hof — Gastro-Vorlage",
    type: "Restaurant",
    href: "/demos/restaurant",
    group: "template",
    blurb:
      "Gastro-Vorlage: Speisekarte, Öffnungszeiten, Karte und WhatsApp-Reservierung.",
  },
  {
    slug: "villa-italia",
    title: "Villa Italia — Pizzeria",
    type: "Pizzeria",
    href: "/demos/villa-italia",
    group: "template",
    blurb:
      "Pizzeria-Vorlage: Karte, Öffnungszeiten, Lieferung und WhatsApp — mobile-first.",
  },
  {
    slug: "solo-modas",
    title: "Solo Modas — Mode",
    type: "Mode",
    href: "/demos/solo-modas",
    group: "template",
    blurb:
      "Mode-Retail-Vorlage: Kategorien, mehrere Filialen, Öffnungszeiten und WhatsApp.",
  },
  {
    slug: "universo-del-calzado",
    title: "Universo del Calzado — Sport",
    type: "Sport-Retail",
    href: "/demos/universo-del-calzado",
    group: "template",
    blurb:
      "Sport-Retail-Vorlage: Sortiment, zwei Filialen und WhatsApp — mobile-first.",
  },
];

export const deMessages: SiteMessages = {
  meta: {
    title: "Santi Villa — Websites für lokale Betriebe",
    description:
      "Moderne responsive Websites (Handy, Tablet, Desktop) für Restaurants, Shops und Center. Wien / Remote.",
    ogLocale: "de_AT",
  },
  nav: {
    work: "Arbeiten",
    services: "Leistungen",
    contact: "Kontakt",
  },
  footer: {
    navLabel: "Navigation",
    legalLabel: "Rechtliches",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    copyright:
      "Demos sind Konzepte — keine offiziellen Websites der gezeigten Betriebe.",
    tagline: "Moderne Websites — klar auf jedem Gerät",
  },
  cta: {
    whatsapp: "WhatsApp",
    schedule: "15 Min buchen",
    defaultWhatsapp:
      "Hallo Santi, ich habe dein Portfolio gesehen und interessiere mich für eine Website für meinen Betrieb.",
  },
  home: {
    heroLead:
      "Deine Gäste entscheiden in Sekunden, ob sie bleiben. Ich baue Websites, die diese Sekunden gewinnen — für Restaurants, Shops und Center in Wien.",
    heroSub: "Klar. Schnell. Mobile zuerst.",
    heroCardEyebrow: "So sollte sich deine Website anfühlen",
    heroCardTitle: "Klar. Schnell. Mobile zuerst.",
    heroDemoCta: "Demo ansehen",
    heroAuditLink: "Mobile Erst testen →",
    introEyebrow: "Worum es geht",
    introTitle: "Eine Website, die Gäste in Sekunden verstehen",
    introBody:
      "Ich bin Santi Villa. Ich helfe lokalen Betrieben in Wien (und remote), online klar aufzutreten: Öffnungszeiten, Menü oder Leistungen, Karte und WhatsApp mit einem Tap. Kein Technik-Chaos, keine Sites die nur auf großen Monitoren funktionieren.",
    advantagesTitle: "Warum es zu deinem Betrieb passt",
    advantages: [
      {
        title: "Sieht auf jedem Screen gut aus",
        body: "Handy, Tablet, Desktop. Deine Gäste kämpfen nicht mit Zoom oder unklaren Menüs.",
      },
      {
        title: "Kontakt mit einem Tap",
        body: "WhatsApp, Anruf oder Reservierung sichtbar. Weniger Reibung = mehr Anfragen.",
      },
      {
        title: "Konzept vor der Entscheidung",
        body: "Du siehst ein Redesign-Beispiel (Konzept). Wenn es passt, bauen wir die echte Website.",
      },
      {
        title: "Klare Preise und Umfang",
        body: "Landing, Business-Site oder Wartung. Du weißt von Tag eins, was enthalten ist.",
      },
    ],
    clientDesignEyebrow: "So arbeiten wir",
    clientDesignTitle: "So arbeiten wir am Design zusammen",
    clientDesignBody:
      "Zuerst erstelle ich ein Konzept: eine visuelle Idee, wie dein Betrieb online wirken könnte. Es ist nicht die offizielle Website — eine ehrliche Demo. Du kannst Änderungen wünschen (Menü, Zeiten, Sprache) und wenn es passt, launch ich die echte Site mit Domain, Hosting und WhatsApp.",
    clientDesignSteps: [
      "Audit oder Demo: deine URL oder eine passende Vorlage.",
      "Konzept: responsives Design mit deinen Infos (oder Daten die du schickst).",
      "Feedback: WhatsApp — Feinschliff bis du Ja sagst.",
      "Echte Website: Launch, Domain, fertig — kein altes Typo3 mehr.",
    ],
    clientDesignCtaDemo: "Lugner Demo ansehen",
    clientDesignCtaAudit: "Kostenlos testen, wie deine URL wirkt →",
    includesEyebrow: "Deine Website",
    includesTitle: "Was deine Website umfasst",
    includesLead:
      "Keine separaten Produkte — Bausteine desselben Service, wenn dein Betrieb sie braucht.",
    includes: [
      {
        title: "Responsive-Audit",
        body: "Score 0–100 und Auto-Konzept von deiner URL — Vorher/Nachher sichtbar.",
        linkLabel: "Mit deiner URL testen →",
        tool: "audit",
      },
      {
        title: "Digitale Speisekarte",
        body: "Foto der Karte → Gerichte und Preise im Mobile-Preview.",
        linkLabel: "So funktioniert’s →",
        tool: "menu",
      },
      {
        title: "WhatsApp-Hilfe",
        body: "Schnelle Antworten zu Platz, Zeiten, Parken; Reservierung in den echten Chat.",
        linkLabel: "Beispiel ansehen →",
        tool: "microbot",
      },
      {
        title: "Lokaler Copy",
        body: "Texte an Zielgruppe angepasst (keine wörtliche Übersetzung) DE/EN/ES.",
        linkLabel: "Beispiel ansehen →",
        tool: "copy",
      },
      {
        title: "Brief → Landing",
        body: "Kurz beschreiben — und einen Landing-Entwurf sehen.",
        linkLabel: "Ausprobieren →",
        tool: "brief",
      },
    ],
    workTitle: "Arbeiten & Demos",
    workBody:
      "Zuerst Cases aus Wien. Dann Vorlagen nach Branche. Demos sind Konzepte, keine offiziellen Sites.",
    workLink: "Alle ansehen →",
  },
  services: {
    title: "Leistungen",
    lead: "Ein klares Produkt: deine Website. Zuerst das Konzept, dann die echte Site. Drei klare Pakete — mobil, Tablet, Desktop.",
    packageLabel: "Paket",
    alsoTitle: "Im Projekt enthalten oder verfügbar",
    alsoItems: [
      "Shopping Center / Multi-Shop — ab ~€3.000–8.000+ je nach Shops, Sprachen, CMS.",
      "Pitch-Demo — wie Lugner, um dem Inhaber eine Vorstellung zu zeigen.",
      "Domain + Hosting — Vercel-Setup in den Site-Paketen enthalten.",
    ],
    whatsappMessage: "Hallo Santi, ich möchte ein Web-Paket anfragen.",
  },
  work: {
    title: "Arbeiten",
    lead: "Zuerst der Wien-Case (Lugner). Danach Vorlagen nach Branche — anpassbar für deinen Betrieb.",
    lugnerEyebrow: "Pitch-Case · Wien",
    lugnerTitle: "Lugner City: vorher vs. nachher",
    lugnerBody:
      "Die aktuelle Site (lugner.at) kommt von altem Typo3: am Handy zoomen, wichtige Infos versteckt. Die Demo ist mobile-first — Konzept, keine offizielle Website.",
    before: "Vorher",
    after: "Nachher · Demo",
    beforeNote: "Dichtes Layout · kleine Schrift · schwer am Handy.",
    afterNote: "Klare Home: Zeiten, Shops, Anfahrt, Kontakt in einem Flow.",
    viewCurrent: "Aktuelle Site ansehen →",
    openDemo: "Demo öffnen →",
    openDemoCta: "Lugner Demo öffnen",
    konzeptNote:
      "Konzept / Redesign-Vorschlag — keine offizielle Website von Lugner City.",
    viennaTitle: "Wien",
    viennaLead:
      "Lokaler Pitch-Case: Lugner City — heißer Lead in Wien.",
    templatesTitle: "Vorlagen nach Branche",
    templatesLead:
      "Wiederverwendbare Strukturen: Gastro, Pizzeria, Mode und Sport.",
    templatesNote: "Auch international getestet.",
    open: "Öffnen",
    pricingTitle: "Orientierungspreise",
    pricingLead:
      "Richtwerte in Euro (Österreich / EU). Anzahlung (30–50%) reserviert den Termin; Code-Übergabe nach Zahlung.",
    centerNote: "Shopping Center (Multi-Section + Shops): ab ~€3.000 je nach Umfang.",
    whatsappMessage:
      "Hallo Santi, ich habe deine Arbeiten (Lugner / Restaurant) gesehen und möchte über ein Projekt sprechen.",
    metricsTitle: "Zahlen · Lighthouse mobile",
    metricsSource: "Google PageSpeed Insights API",
    metricsBefore: "Vorher (lugner.at)",
    metricsAfter: "Nachher (Demo)",
    metricsPerformance: "Performance",
    metricsLcp: "LCP",
    metricsFcp: "FCP",
    metricsUxNote:
      "WhatsApp 1-Tap im Hero vs. kein Link auf lugner.at — UX-Fakt, kein Analytics-Versprechen.",
  },
  contact: {
    title: "Kontakt",
    lead: "Willst du zuerst sehen, wie es aussehen könnte? Probiere",
    leadAudit: "oder schreib mir — nächster Schritt in Minuten.",
    auditLinkLabel: "Mobile Erst",
    briefAlt: "Lieber ein Brief schreiben statt anrufen?",
    briefLink: "Brief Agent öffnen →",
    email: "E-Mail",
    whatsapp: "WhatsApp",
    openChat: "Chat öffnen",
    schedule: "Termin",
    formTitle: "Kurznachricht",
    formLead:
      "Nachricht wird gespeichert — Santi meldet sich per E-Mail oder WhatsApp.",
    formName: "Dein Name",
    formBusiness: "Betrieb",
    formMessage: "Was brauchst du?",
    formSubmit: "Senden",
    formSuccess: "Danke — Nachricht gespeichert. Wir melden uns.",
    formError: "Senden fehlgeschlagen. Bitte E-Mail oder WhatsApp nutzen.",
    pitchLabel: "Pitch fertig",
    pitchQuote:
      "„Hallo, ich bin Santi — so könnte eure Site am Handy aussehen. 15 Min?“",
    pitchBody:
      "Nutze diese Nachricht mit dem Link zu /demos/lugner oder deiner Demo. Transparent: Konzept, keine offizielle Site.",
    mailSubject: "Website-Anfrage — santivilla.com",
    mailBody: "Hallo Santi,\n\nIch möchte über eine Website sprechen für...\n",
    whatsappMessage:
      "Hallo Santi, ich möchte über eine Website für meinen Betrieb sprechen.",
  },
  audit: {
    eyebrow: "Mobile Erst · Santi Design Agent",
    title: "Audit sofort.",
    titleBreak: "Konzept automatisch.",
    lead: "1) URL einfügen → Score auf Handy, Tablet, Desktop. 2) Responsives HTML-Konzept mit dem Agenten. 3) Gefällt es? WhatsApp — wir bauen die echte Site.",
    steps: ["01 Audit", "02 KI-Konzept", "03 WhatsApp / Deal"],
    uxScoreLabel: "UX Score",
    lighthouseLabel: "Lighthouse mobile",
    lighthouseLoading: "Lighthouse lädt… (Google PageSpeed)",
    lighthouseFailed: "Lighthouse nicht verfügbar — UX-Score bleibt gültig.",
    lighthouseUnavailable: "Lighthouse API nicht konfiguriert.",
    performance: "Performance",
    accessibility: "Barrierefreiheit",
    vitalsTitle: "Core Web Vitals",
    lcp: "LCP",
    fcp: "FCP",
    cls: "CLS",
    tbt: "TBT",
    ratingGood: "Gut",
    ratingNeeds: "Verbesserbar",
    ratingPoor: "Schlecht",
    diagnosisPending: "KI analysiert Verluste…",
    diagnosisTitle: "Santi's Diagnose",
    criticalPointsTitle: "3 kritische Verluste",
    listenDiagnosis: "Audio-Diagnose (~30 s)",
    audioPlay: "Anhören",
    audioPause: "Pause",
    audioStop: "Stop",
    audioUnsupported: "Sprachausgabe wird in diesem Browser nicht unterstützt.",
    downloadReport: "Report öffnen",
    printPdf: "Als PDF drucken",
    reportRecommendation: "Empfehlung",
  },
  concept: {
    eyebrow: "Santi Design Agent",
    title: "Automatisches Konzept",
    lead: "Preview aus dem Audit. Sprich mit dem Agenten für Menü, Infos, Sprache… Keine offizielle Website. Gefällt es? Wir bauen die echte Site.",
    backLink: "← Zurück zu Mobile Erst",
    seoBadge: "SEO · JSON-LD",
    seoTooltip:
      "Maschinenlesbare Schema.org-Daten für Google — automatisch aus Betriebsdaten generiert.",
    seoOpeningHours: "Öffnungszeiten",
    seoMenu: "Speisekarte",
    menuLinkLabel: "Digitale Karte verknüpfen (Menu-ID)",
    menuLinkPlaceholder: "z. B. menu-abc123 oder demo-konzept",
    menuLinkButton: "Verknüpfen",
    menuLinkSuccess: "Karte verknüpft — JSON-LD aktualisiert.",
    menuLinkError: "Verknüpfung fehlgeschlagen — ID prüfen.",
  },
  menuDigitizer: {
    title: "Speisekarte digitalisieren",
    lead: "Foto deiner Karte hochladen — in Sekunden siehst du, wie sie als mobile Website wirkt. Konzept, kein Vertrag.",
    uploadLabel: "Speisekarte fotografieren",
    uploadHint: "JPEG, PNG oder WebP · max. 4 MB · gut beleuchtet, gerade",
    processing: "Bild wird vorbereitet…",
    extracting: "KI liest deine Karte…",
    disclaimer:
      "OCR kann Fehler machen — Preise und Allergene vor Veröffentlichung prüfen.",
    ocrNote: "Nur lesbarer Text wird übernommen — nichts erfunden.",
    allergenNote:
      "Allergene nur wenn auf der Karte sichtbar — kein Ersatz für HACCP-Beratung.",
    demoLinkLabel: "Demo-Karte ansehen (Beispiel)",
    demoLink: "/de/menu/demo-konzept",
    successTitle: "Deine digitale Karte ist bereit",
    openPreview: "Preview öffnen",
    tryAgain: "Neues Foto",
    whatsappMessage:
      "Hallo Santi, ich habe meine Speisekarte digitalisiert und möchte daraus eine echte Website.",
    previewBanner:
      "Konzept / OCR-Vorschau — keine offizielle Website des Betriebs",
    previewTitleFallback: "Deine Speisekarte",
    previewBack: "← Neue Karte hochladen",
    previewEmpty: "Keine Gerichte erkannt — bitte schärferes Foto versuchen.",
    homeCta: "Speisekarte fotografieren →",
    servicesBullet:
      "Im Projekt verfügbar: Speisekarte digitalisieren — Foto → mobile Preview (Gastro).",
  },
  microBot: {
    title: "Micro-Bot WhatsApp",
    lead: "Drei Fragen, die jeden Tag anrufen — Platz, Zeiten, Parken. Antwort in Sekunden, Reservierung per WhatsApp. Kein nerviger Chatbot.",
    eyebrow: "Produkt · Gastro",
    chipAvailability: "Platz heute?",
    chipHours: "Öffnungszeiten",
    chipParking: "Parken",
    placeholder: "Frage stellen…",
    send: "Senden",
    openWhatsapp: "WhatsApp öffnen",
    disclaimer:
      "Konzept — keine offizielle Reservierung. Freitext nutzt KI (Anthropic).",
    greeting:
      "Hallo! Ich helfe bei Platz, Öffnungszeiten und Parken. Wähle eine Frage oder schreib uns.",
    thinking: "Einen Moment…",
    errorGeneric: "Antwort gerade nicht möglich. Probier WhatsApp.",
    openLabel: "Hilfe öffnen",
    closeLabel: "Schließen",
    demoLink: "/demos/restaurant",
    demoLinkLabel: "Vollständige Restaurant-Demo",
    salesWhatsapp:
      "Hallo Santi, ich möchte den Micro-Bot WhatsApp für mein Lokal.",
    homeCta: "Micro-Bot WhatsApp →",
    servicesBullet:
      "Im Projekt verfügbar: Micro-Bot WhatsApp — Platz/Zeiten/Parken → Reservierung im Chat.",
    bullets: [
      "3 häufigste Fragen als Chips — sofort beantwortet",
      "Freitext: KI erkennt Reservierungs-Intent",
      "WhatsApp mit vorausgefüllter Nachricht",
      "Ultra-leicht — kein Login, kein CRM",
    ],
  },
  copyAdapt: {
    title: "Copy lokal anpassen",
    lead: "Keine wortwörtliche Übersetzung — KI passt Menütexte, Angebote und Services an Zielgruppe und Kultur an (z. B. formelles Österreichisches Deutsch vs. frisches Englisch für Touristen).",
    eyebrow: "Produkt · Content",
    sourceLabel: "Originaltext",
    sourcePlaceholder: "z. B. Wiener Schnitzel vom Kalb mit Erdäpfelsalat…",
    sourceLocaleLabel: "Quellsprache",
    contentTypeLabel: "Inhaltstyp",
    typeDish: "Gericht / Menü",
    typeService: "Dienstleistung",
    typeOffer: "Angebot / Aktion",
    typeGeneral: "Allgemein",
    cityLabel: "Stadt / Region (optional)",
    cityPlaceholder: "Wien",
    presetsLabel: "Schnell-Presets",
    presetLocalAt: "Lokal AT + Touristen EN/ES",
    presetTourist: "Touristen-Paket",
    presetBusiness: "Business DE/EN",
    targetsLabel: "Zielvarianten (max. 4)",
    audienceLocal: "Lokal",
    audienceTourist: "Tourist",
    audienceBusiness: "Business",
    generate: "Copy anpassen",
    generating: "KI passt an…",
    disclaimer:
      "KI kann Fehler machen — vor Veröffentlichung prüfen. Keine erfundenen Preise oder Fakten.",
    errorGeneric: "Anpassung fehlgeschlagen — bitte erneut versuchen.",
    demoLinkLabel: "Demo-Beispiel ansehen",
    shareLabel: "Teilbarer Link",
    copy: "Kopieren",
    copied: "Kopiert",
    previewBanner: "Konzept — keine offizielle Website des Betriebs",
    previewTitle: "Angepasste Copy-Varianten",
    previewBack: "← Neues Copy generieren",
    salesWhatsapp:
      "Hallo Santi, ich möchte den Copy-Generator für mein Lokal.",
    homeCta: "Copy lokal anpassen →",
    servicesBullet:
      "Im Projekt verfügbar: lokaler Copy — kulturelle Anpassung (keine wörtliche Übersetzung) DE/EN/ES.",
    tabAgent: "Agent",
    tabCopy: "Copy",
    bullets: [
      "Österreichisches Deutsch für Locals, frisches Englisch für Touristen",
      "Gerichte, Angebote oder Services — ein Text, mehrere Zielgruppen",
      "Teilbarer Link zum Abstimmen mit dem Team",
      "Integriert in Mobile-Erst-Konzepte",
    ],
  },
  briefAgent: {
    title: "Brief → Landing",
    lead: "Beschreib dein Business in ein paar Zeilen. Die KI füllt ein sicheres Schema (ohne HTML) — wir rendern Hero, Leistungen und Kontakt mit festen React-Komponenten.",
    eyebrow: "Produkt · Brief Agent",
    textareaLabel: "Dein Brief",
    textareaPlaceholder:
      "z. B. Wir sind eine Handwerksbäckerei im 7. Bezirk. Sauerteigbrot und Patisserie. Mehr Catering-Anfragen und Nachbarschaftsbesuche…",
    textareaHint: "Mindestens 20 Zeichen. Je konkreter, desto besser.",
    generate: "Landing generieren",
    generating: "KI schreibt das Schema…",
    disclaimer:
      "Konzept — nur strukturierter Text. Copy und Farben vor Veröffentlichung prüfen.",
    errorGeneric: "Brief konnte nicht erzeugt werden. Bitte erneut versuchen.",
    resultTitle: "Dein Preview",
    openShare: "Teilbaren Link öffnen",
    copyLink: "Link kopieren",
    copied: "Kopiert",
    previewBanner: "Konzept Brief Agent — keine offizielle Website des Betriebs",
    previewBack: "← Neuer Brief",
    featuresTitle: "Warum wir",
    contactTitle: "Lass uns sprechen",
    contactBody:
      "Dieser Block ist ein Preview. Wenn die Richtung passt, machen wir daraus die echte Website mit WhatsApp und Domain.",
    whatsappLabel: "WhatsApp Portfolio",
    salesWhatsapp:
      "Hallo Santi, ich habe einen Brief mit dem Brief Agent erzeugt und will die echte Website.",
    homeCta: "Brief → Landing →",
    servicesBullet:
      "Im Projekt verfügbar: Brief → konzeptionelle Landing aus wenigen Zeilen Text.",
    reviseLabel: "Mit natürlicher Sprache bearbeiten",
    revisePlaceholder: "z. B. Headline kürzer · CTA zu Anfragen · dunkler",
    reviseSubmit: "Anwenden",
    revising: "Wird angewendet…",
    reviseError: "Änderung fehlgeschlagen. Bitte erneut versuchen.",
    reviseHint: "Die KI aktualisiert das JSON (Copy/Farben). Fotos nur wenn du es verlangst.",
    bullets: [
      "Natürliche Sprache — kein HTML, keine starren Templates",
      "Die KI füllt nur ein Zod-Schema (Farben, Copy, 3 Features)",
      "React-Preview teilbar per WhatsApp",
      "Ergänzt den Design Agent per URL — ersetzt ihn nicht",
    ],
  },
  mapsKonzept: {
    title: "Maps → Konzept Live",
    lead: "Internes Tool: Google-Maps-URL einfügen → echte Öffnungszeiten, Fotos und Reviews → teilbares Konzept unter /k/[slug].",
    eyebrow: "Intern · Prospecting",
    urlLabel: "Google-Maps-URL",
    urlPlaceholder: "https://maps.app.goo.gl/… oder maps.google.com/…",
    urlHint:
      "Kurzlinks werden aufgelöst. place_id oder Betriebsname aus der URL werden erkannt.",
    generate: "Konzept erstellen",
    generating: "Places + KI generieren… (ca. 60–90 s)",
    disclaimer:
      "Daten von Google Places + Anthropic. Vor Pitch prüfen. Rate-Limit: 5/h pro IP.",
    errorGeneric: "Konzept fehlgeschlagen — URL oder API-Keys prüfen.",
    shareLabel: "Live-Link (pitch-ready)",
    editLink: "Im Agent bearbeiten →",
    salesWhatsapp:
      "Hallo Santi, ich möchte Maps-Konzept für Prospecting nutzen.",
    bullets: [
      "Echte Google-Fotos wenn verfügbar — sonst KI-Bilder",
      "Slug-URL /k/name für WhatsApp-Pitch",
      "Speichert in Supabase wie Mobile-Erst-Konzepte",
      "Batch: npm run prospect:maps",
    ],
  },
  packages,
  projects,
  projectsForHome: projects.map((p) => {
    if (p.slug === "lugner") {
      return {
        ...p,
        blurb:
          "So könnte ein Wiener Center mit klaren Zeiten, Shops und Kontakt am Handy wirken.",
      };
    }
    if (p.slug === "restaurant") {
      return {
        ...p,
        blurb:
          "Gastro-Vorlage: Menü, Zeiten, Karte und WhatsApp-Reservierung in einem Flow.",
      };
    }
    return p;
  }),
};
