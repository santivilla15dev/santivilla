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
    slug: "stadtgalerie",
    title: "Stadtgalerie West — Zentrum-Konzept",
    type: "Shopping Center",
    href: "/demos/stadtgalerie",
    group: "vienna",
    blurb:
      "Mobile-first Vorlage für ein Einkaufszentrum in Wien. Fiktives Konzept, keine offizielle Site.",
    beforeNote:
      "Viele Center laufen noch auf altem Typo3: Zoom am Handy, Infos versteckt.",
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
    title: "Santi Villa — Websites für lokale Betriebe in Wien",
    description:
      "Moderne responsive Websites (Handy, Tablet, Desktop) für Restaurants, Shops und Center. Wien / Remote.",
    ogLocale: "de_AT",
  },
  nav: {
    work: "Arbeiten",
    services: "Leistungen",
    contact: "Kontakt",
    localeHint: "Für Betriebe in Wien",
    localeLabels: {
      de: "Deutsch — Kunden in Wien",
      en: "English — Portfolio / Partner",
      es: "Español — Portfolio",
    },
  },
  footer: {
    navLabel: "Navigation",
    legalLabel: "Rechtliches",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    agb: "AGB",
    copyright:
      "Demos sind Konzepte — keine offiziellen Websites der gezeigten Betriebe.",
    tagline: "Moderne Websites — klar auf jedem Gerät",
  },
  consent: {
    title: "Cookies & Datenschutz",
    body: "Wir nutzen notwendige Cookies für die Sprache und — nur mit Ihrer Zustimmung — optionale Analyse- oder Marketing-Cookies. In v1 laden wir keine Tracking-Skripte, bevor Sie diese Kategorien freigeben.",
    acceptAll: "Alles akzeptieren",
    rejectNonEssential: "Nur notwendige",
    customize: "Einstellungen",
    save: "Einstellungen speichern",
    necessaryLabel: "Notwendig",
    necessaryHint: "Sprache (sv_locale), Sicherheit und Auth für Admin/Portal. Immer aktiv.",
    analyticsLabel: "Analyse",
    analyticsHint: "Nutzungsstatistik. In v1 kein Analyse-Skript, bis wir es aktivieren und Sie zustimmen.",
    marketingLabel: "Marketing",
    marketingHint: "Pixel oder Werbung. In v1 keines, bis wir es aktivieren und Sie zustimmen.",
    privacyLink: "Cookie-Hinweise lesen →",
    closeCustomize: "Zurück",
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
    heroH1: "Websites für lokale Betriebe in Wien",
    heroCost:
      "Auf Mobilgeräten werden 53% der Besuche abgebrochen, wenn die Seite länger als 3 Sekunden braucht (Google, Need for Mobile Speed, 2016). Eine langsame Website wirkt nicht nur „hässlich“ — sie verliert Gäste, bevor sie dich lesen.",
    heroCardEyebrow: "Konzept · Wien 15",
    heroCardTitle: "Stadtgalerie West am Handy",
    heroCardAlt: "Stadtgalerie West Demo auf dem Handy",
    heroAuditCta: "Kostenlos mit deiner URL testen",
    heroFreeNote:
      "Audit und erstes Konzept kostenlos und unverbindlich. Du zahlst erst, wenn du die echte Website willst.",
    heroGuarantee: "Du siehst das Design, bevor du einen Euro zahlst.",
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
        title: "Design sehen, bevor du zahlst",
        body: "Du siehst ein Redesign (Konzept) kostenlos — bevor du einen Euro für die echte Website zahlst.",
      },
      {
        title: "Klare Preise und Umfang",
        body: "Landing, Business-Site oder Wartung. Du weißt von Tag eins, was enthalten ist.",
      },
    ],
    clientDesignEyebrow: "So arbeiten wir",
    clientDesignTitle: "Du siehst das Design, bevor du zahlst",
    clientDesignBody:
      "Du siehst das Design, bevor du einen Euro zahlst: zuerst ein kostenloses Konzept — eine visuelle Idee, wie dein Betrieb online wirken könnte. Es ist nicht die offizielle Website; eine ehrliche Demo, kostenlos und unverbindlich. Du kannst Änderungen wünschen (Menü, Zeiten, Sprache) und wenn es passt, launch ich die echte Site mit Domain, Hosting und WhatsApp.",
    clientDesignSteps: [
      "Audit oder Demo (kostenlos): deine URL oder eine passende Vorlage.",
      "Konzept (kostenlos): responsives Design mit deinen Infos (oder Daten die du schickst).",
      "Feedback: WhatsApp — Feinschliff bis du Ja sagst.",
      "Echte Website (fester Preisrahmen): Launch, Domain, fertig — kein altes Typo3 mehr.",
    ],
    clientDesignCtaDemo: "Stadtgalerie Demo ansehen",
    proofEyebrow: "Gemessener Fall · Wien",
    proofTitle: "Einkaufszentrum — Mobile vorher / nachher",
    proofBody:
      "Typisches Typo3-Zentrum vs. Konzept Stadtgalerie West. Zahlen von Google PageSpeed Insights (Mobile). Öffentliche Demo ist fiktiv — keine offizielle Site.",
    proofCtaDemo: "Stadtgalerie Demo ansehen",
    proofCtaWork: "Arbeiten ansehen →",
    selfScoreEyebrow: "Diese Seite",
    selfScoreTitle: "/100 auf Mobil",
    selfScoreBody:
      "Dieselbe Kennzahl wie im Audit. Gemessen mit Google Lighthouse (Mobile Lab).",
    selfScoreMeta: "Lighthouse · Mobil",
    selfScoreLink: "In PageSpeed öffnen →",
    includesEyebrow: "Ein Service",
    includesTitle: "So bauen wir deine Website",
    includesLead:
      "Schritt für Schritt, im selben Projekt. Diese Bausteine kommen dazu, wenn dein Betrieb sie braucht — keine separaten Produkte.",
    includes: [
      {
        title: "Wir starten mit deiner URL",
        body: "Score 0–100 und Auto-Konzept von deiner Site — Vorher/Nachher sichtbar.",
        tool: "audit",
      },
      {
        title: "Speisekarte auf die Website",
        body: "Foto der Karte → Gerichte und Preise im Mobile-Preview, bereit für die Site.",
        tool: "menu",
      },
      {
        title: "Kontakt mit einem Tap",
        body: "Schnelle Antworten zu Platz, Zeiten, Parken; Reservierung in den echten WhatsApp-Chat.",
        tool: "microbot",
      },
      {
        title: "Texte, die lokal klingen",
        body: "Copy an Zielgruppe angepasst (keine wörtliche Übersetzung) DE/EN/ES.",
        tool: "copy",
      },
      {
        title: "Lieber schreiben?",
        body: "Kurzer Brief → Landing-Entwurf — dasselbe Projekt, anderer Einstieg.",
        tool: "brief",
      },
    ],
    pricingEyebrow: "Preise",
    pricingFrom: "Ab €400",
    pricingBody:
      "Klare Mobile-Landing mit WhatsApp und Domain-Setup. Geschäfts-Sites und Wartung mit festem Scope — ohne Überraschungen.",
    pricingLink: "Pakete ansehen →",
    workTitle: "Arbeiten & Demos",
    workBody:
      "Zuerst Cases aus Wien. Dann Vorlagen nach Branche. Demos sind Konzepte, keine offiziellen Sites.",
    workLink: "Alle ansehen →",
    faqEyebrow: "FAQ",
    faqTitle: "Häufige Fragen",
    faqItems: [
      {
        id: "timeline",
        question: "Wie lange dauert meine Website?",
        answer:
          "Nach Anzahlung und geschlossenem Brief: Landing ca. 1–2 Wochen; Business-Site ca. 2–4 Wochen; Center-Projekte ca. 4–8+ Wochen. Fristen hängen von zeitnahem Feedback und Inhalten ab.",
      },
      {
        id: "design",
        question: "Was, wenn mir das Design nicht gefällt?",
        answer:
          "Zuerst feilen wir das Konzept per WhatsApp kostenlos bis zum Ja — du siehst das Design, bevor du einen Euro für die echte Site zahlst. Beim bezahlten Build sind 2 Korrekturrunden vor der Restzahlung inklusive.",
      },
      {
        id: "assets",
        question: "Was brauche ich von dir zum Start?",
        answer:
          "Texte (oder Entwürfe), Fotos von Lokal/Produkten, Logo falls vorhanden (sonst Platzhalter), Öffnungszeiten, WhatsApp- oder Buchungslink und einen kurzen Brief, was hervorgehoben werden soll. Damit startet das Konzept.",
      },
      {
        id: "deposit",
        question: "Wie funktioniert die Anzahlung?",
        answer:
          "Du reservierst den Termin mit 30–50% des vereinbarten Preises (SEPA-Überweisung / Rechnung AT). Der Rest bei Code-Übergabe oder Go-Live. Die Anzahlung ist bei Storno nach Reservierung nicht erstattungsfähig; der Rest wird nicht verlangt, wenn nicht geliefert wird.",
      },
      {
        id: "hosting",
        question: "Sind Wartung oder Hosting inklusive?",
        answer:
          "Site-Pakete enthalten Domain- + Vercel-Hosting-Setup. Monatliche Wartung (€50–150) ist optional: Content-Updates, Basis-Monitoring und WhatsApp-Support.",
      },
      {
        id: "location",
        question: "Arbeitest du auch außerhalb Wiens?",
        answer:
          "Ja. Fokus Wien/Österreich — remote aber problemlos auch außerhalb Wiens (und außerhalb AT).",
      },
    ],
    resultsEyebrow: "Ergebnisse",
    resultsTitle: "Vorher / nachher in Zahlen",
    resultsLead:
      "Eine klare Kennzahl pro Projekt. Das erste ist ein gemessenes öffentliches Konzept; die beiden anderen sind Platzhalter bis echte Kunden erlauben.",
    resultsPlaceholderBadge: "Platzhalter — TODO",
    resultsBeforeLabel: "Vorher",
    resultsAfterLabel: "Nachher",
    resultsItems: [
      {
        id: "stadtgalerie-konzept",
        name: "Einkaufszentrum · Konzept",
        sector: "Öffentliches Konzept",
        metricLabel: "Lighthouse Performance (Mobile)",
        quote: null,
        isPlaceholder: false,
      },
      {
        // TODO: replace with real local café / business when permitted
        id: "todo-local-cafe",
        name: "Lokales Café (generisch)",
        sector: "Platzhalter",
        metricLabel: "LCP Mobile",
        before: "4,2 s",
        after: "0,9 s",
        quote: null,
        isPlaceholder: true,
      },
      {
        // TODO: replace with real salon / service business when permitted
        id: "todo-salon",
        name: "Salon / Service (generisch)",
        sector: "Platzhalter",
        metricLabel: "Mobile Besuche",
        before: "~48 %",
        after: "~71 %",
        quote: null,
        isPlaceholder: true,
      },
    ],
  },
  services: {
    title: "Leistungen",
    lead: "Ein klares Produkt: deine Website. Zuerst das Konzept, dann die echte Site. Drei klare Pakete — mobil, Tablet, Desktop.",
    packageLabel: "Paket",
    alsoTitle: "Im Projekt enthalten oder verfügbar",
    alsoItems: [
      "Shopping Center / Multi-Shop — ab ~€3.000–8.000+ je nach Shops, Sprachen, CMS.",
      "Pitch-Demo — wie Stadtgalerie, um dem Inhaber eine Vorstellung zu zeigen.",
      "Domain + Hosting — Vercel-Setup in den Site-Paketen enthalten.",
    ],
    agbLink: "Ablauf, Anzahlung und Garantie (Design sehen vor Zahlung) → AGB",
    whatsappMessage: "Hallo Santi, ich möchte ein Web-Paket anfragen.",
  },
  work: {
    title: "Arbeiten",
    lead: "Zuerst der Wien-Case (Einkaufszentrum). Danach Vorlagen nach Branche — anpassbar für deinen Betrieb.",
    lugnerEyebrow: "Vorlage · Wien",
    lugnerTitle: "Stadtgalerie West: vorher vs. nachher",
    lugnerBody:
      "Viele Center kämpfen noch mit Typo3 am Handy. Die öffentliche Demo ist ein fiktives mobile-first Konzept — keine offizielle Site eines echten Centers.",
    before: "Vorher",
    after: "Nachher · Demo",
    beforeNote: "Dichtes Layout · kleine Schrift · schwer am Handy.",
    afterNote: "Klare Home: Zeiten, Shops, Anfahrt, Kontakt in einem Flow.",
    beforeHost: "Typo3 · Zentrum",
    caseBrand: "Stadtgalerie West",
    viewCurrent: "Aktuelle Site ansehen →",
    openDemo: "Demo öffnen →",
    openDemoCta: "Stadtgalerie Demo öffnen",
    konzeptNote:
      "Fiktives Konzept — keine offizielle Website eines Einkaufszentrums.",
    viennaTitle: "Wien",
    viennaLead:
      "Öffentliche Vorlage: Einkaufszentrum in Wien (Stadtgalerie West).",
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
      "Hallo Santi, ich habe deine Arbeiten (Stadtgalerie / Restaurant) gesehen und möchte über ein Projekt sprechen.",
    metricsTitle: "Zahlen · Lighthouse mobile",
    metricsSource: "Google PageSpeed Insights API",
    metricsBefore: "Vorher (Typo3 · Zentrum)",
    metricsAfter: "Nachher (Demo)",
    metricsPerformance: "Performance",
    metricsLcp: "LCP",
    metricsFcp: "FCP",
    metricsUxNote:
      "WhatsApp 1-Tap im Hero vs. Typo3-Sites ohne klaren Link — UX-Fakt, kein Analytics-Versprechen.",
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
      "Nutze diese Nachricht mit dem Link zu /demos/stadtgalerie oder deiner Demo. Transparent: Konzept, keine offizielle Site.",
    mailSubject: "Website-Anfrage — santivilla.com",
    mailBody: "Hallo Santi,\n\nIch möchte über eine Website sprechen für...\n",
    whatsappMessage:
      "Hallo Santi, ich möchte über eine Website für meinen Betrieb sprechen.",
  },
  audit: {
    eyebrow: "Mobile Erst · Santi Design Agent",
    title: "Audit sofort.",
    titleBreak: "Konzept automatisch.",
    lead: "Kostenlos und unverbindlich: 1) URL einfügen → Score auf Handy, Tablet, Desktop. 2) Responsives HTML-Konzept mit dem Agenten. 3) Gefällt es? WhatsApp — wir kalkulieren die echte Site.",
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
    if (p.slug === "stadtgalerie") {
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
