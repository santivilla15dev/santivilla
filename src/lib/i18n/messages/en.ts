import type { SiteMessages } from "./types";

const packages: SiteMessages["packages"] = [
  {
    id: "landing",
    name: "Landing",
    price: "€400–800",
    description:
      "One clear page on mobile, tablet and desktop — with WhatsApp and domain/hosting.",
    includes: [
      "Responsive design (all devices)",
      "1 page + sections",
      "WhatsApp / booking button",
      "Domain + Vercel setup",
    ],
  },
  {
    id: "negocio",
    name: "Business website",
    price: "€900–2,000",
    description:
      "Full site (4–6 pages) for restaurant, shop or local business.",
    includes: [
      "Menu / services / hours",
      "Map & contact",
      "Basic SEO",
      "Up to 2 revision rounds",
    ],
  },
  {
    id: "mensual",
    name: "Maintenance",
    price: "€50–150/mo",
    description: "Text/photo updates, uptime and small improvements each month.",
    includes: [
      "Content changes",
      "Basic monitoring",
      "WhatsApp support",
      "Priority on new features",
    ],
  },
];

const projects: SiteMessages["projects"] = [
  {
    slug: "mobile-erst",
    title: "Mobile Erst — Responsive audit",
    type: "Product",
    href: "/auditoria",
    blurb:
      "Paste a URL: score + automatic HTML concept (Santi Design Agent) for all devices.",
  },
  {
    slug: "lugner",
    title: "Lugner City — Redesign concept",
    type: "Shopping center",
    href: "/demos/lugner",
    blurb:
      "Mobile-first proposal for Lugner City (Vienna). Concept, not the official site.",
    beforeNote:
      "The current site (lugner.at) runs on legacy Typo3 — hard to use on mobile.",
    afterNote:
      "New home with hours, shops, directions and contact in one clear flow.",
  },
  {
    slug: "restaurant",
    title: "Gasthaus Am Hof — Template",
    type: "Restaurant",
    href: "/demos/restaurant",
    blurb:
      "Reusable template: menu, hours, map and WhatsApp reservation.",
  },
  {
    slug: "villa-italia",
    title: "Villa Italia — Pizzeria demo",
    type: "Pizzeria",
    href: "/demos/villa-italia",
    blurb:
      "Demo for a Colombia pizzeria: menu, hours, delivery and WhatsApp — mobile-first.",
  },
  {
    slug: "solo-modas",
    title: "Solo Modas — Fashion retail",
    type: "Fashion",
    href: "/demos/solo-modas",
    blurb:
      "Demo clothing store Colombia: categories, multiple locations, hours and WhatsApp.",
  },
  {
    slug: "universo-del-calzado",
    title: "Universo del Calzado — Sports",
    type: "Sports retail",
    href: "/demos/universo-del-calzado",
    blurb:
      "Demo Santa Rosa de Osos: shoes, club shirts, two stores and WhatsApp — mobile-first.",
  },
];

export const enMessages: SiteMessages = {
  meta: {
    title: "Santi Villa — Websites for local businesses",
    description:
      "Modern responsive websites (mobile, tablet, desktop) for restaurants, shops and centers. Vienna / Remote.",
    ogLocale: "en_US",
  },
  nav: {
    audit: "Mobile Erst",
    work: "Work",
    services: "Services",
    brief: "Brief",
    contact: "Contact",
  },
  footer: {
    navLabel: "Navigation",
    legalLabel: "Legal",
    impressum: "Imprint",
    datenschutz: "Privacy",
    copyright:
      "Demos are concepts — not official websites of the businesses shown.",
    tagline: "Modern websites — clear on every device",
  },
  cta: {
    whatsapp: "WhatsApp",
    schedule: "Book 15 min",
    defaultWhatsapp:
      "Hi Santi, I saw your portfolio and I'm interested in a website for my business.",
  },
  home: {
    heroLead:
      "I design and build clear websites for restaurants, shops and centers — perfect on mobile, tablet and desktop.",
    heroCardEyebrow: "How your site should feel",
    heroCardTitle: "Clear. Fast. Mobile-ready.",
    heroAuditLink: "Try Mobile Erst →",
    introEyebrow: "What it's about",
    introTitle: "A website guests understand in seconds",
    introBody:
      "I'm Santi Villa. I help local businesses in Vienna (and remote) show up clearly online: hours, menu or services, map and WhatsApp in one tap. No tech hassle, no sites that only work on big monitors.",
    advantagesTitle: "Why it fits your business",
    advantages: [
      {
        title: "Looks good on every screen",
        body: "Mobile, tablet, desktop. Guests don't fight zoom or confusing menus.",
      },
      {
        title: "Contact in one tap",
        body: "WhatsApp, call or booking visible. Less friction = more inquiries.",
      },
      {
        title: "Concept before you decide",
        body: "You see a redesign example (Konzept). If it fits, we build the real site.",
      },
      {
        title: "Clear pricing and scope",
        body: "Landing, business site or maintenance. You know what's included from day one.",
      },
    ],
    clientDesignEyebrow: "Design for clients",
    clientDesignTitle: "How we work on design together",
    clientDesignBody:
      "First I create a Konzept: a visual idea of how your business could look online. It's not the official site — an honest demo. You can request changes (menu, hours, language) and when it fits, I launch the real site with domain, hosting and WhatsApp.",
    clientDesignSteps: [
      "Audit or demo: we look at your current site or a close template.",
      "Konzept: responsive design with your info (or data you send).",
      "Feedback: WhatsApp or agent chat — refine until you say yes.",
      "Real website: launch, domain, done — no more legacy CMS.",
    ],
    clientDesignCtaDemo: "View Lugner demo",
    clientDesignCtaAudit: "Try Mobile Erst",
    mobileErstEyebrow: "Product",
    mobileErstTitle: "Mobile Erst",
    mobileErstBody:
      "Paste a URL: responsive score (0–100) and automatic HTML concept with Santi Design Agent. Ideal for before/after with the owner.",
    mobileErstCta: "Open audit",
    mobileErstScoreNote:
      "Responsive score · Auto concept · WhatsApp-ready to share",
    workTitle: "Work & demos",
    workBody:
      "Live examples to open and share on WhatsApp. Demos are concepts, not official sites.",
    workLink: "View all →",
    processTitle: "How I work",
    processSteps: [
      "You tell me what your business needs (or try Mobile Erst with your URL).",
      "I design and build the responsive site in days, not months.",
      "Launch with domain, hosting and WhatsApp — ready for guests.",
    ],
  },
  services: {
    title: "Services",
    lead: "First you understand the concept (how your business could look). Then we build the real site. Three clear packages — mobile, tablet, desktop.",
    packageLabel: "Package",
    alsoTitle: "Also available",
    alsoItems: [
      "Shopping center / multi-shop — from ~€3,000–8,000+ depending on shops, languages, CMS.",
      "Pitch demo — like Lugner, to show the owner a vision.",
      "Domain + hosting — Vercel setup included in site packages.",
    ],
    whatsappMessage: "Hi Santi, I'd like to quote a website package.",
  },
  work: {
    title: "Work",
    lead: "Live cases and demos. Concepts — not official sites — so you see the mobile leap.",
    lugnerEyebrow: "Pitch case · Vienna",
    lugnerTitle: "Lugner City: before vs after",
    lugnerBody:
      "The current site (lugner.at) comes from legacy Typo3: zoom on mobile, key info buried. The demo is mobile-first — concept, not official.",
    before: "Before",
    after: "After · Demo",
    beforeNote: "Dense layout · small type · hard on mobile.",
    afterNote: "Clear home: hours, shops, directions, contact in one flow.",
    viewCurrent: "View current site →",
    openDemo: "Open demo →",
    openDemoCta: "Open Lugner demo",
    konzeptNote:
      "Konzept / redesign proposal — not the official Lugner City website.",
    moreTitle: "More pieces",
    open: "Open",
    pricingTitle: "Guide prices",
    pricingLead:
      "Guide prices in euros (Austria / EU). Deposit (30–50%) reserves the slot; code handover on payment.",
    centerNote: "Shopping center (multi-section + shops): from ~€3,000 depending on scope.",
    whatsappMessage:
      "Hi Santi, I saw your work (Lugner / restaurant) and want to discuss a project.",
    metricsTitle: "Numbers · Lighthouse mobile",
    metricsSource: "Google PageSpeed Insights API",
    metricsBefore: "Before (lugner.at)",
    metricsAfter: "After (demo)",
    metricsPerformance: "Performance",
    metricsLcp: "LCP",
    metricsFcp: "FCP",
    metricsUxNote:
      "WhatsApp 1-tap in hero vs. no link on lugner.at — UX fact, not an analytics claim.",
  },
  contact: {
    title: "Contact",
    lead: "Want to see how it could look first? Try",
    leadAudit: "or write me — next step in minutes.",
    email: "Email",
    whatsapp: "WhatsApp",
    openChat: "Open chat",
    schedule: "Calendar",
    formTitle: "Quick message",
    formLead:
      "Message is saved — Santi will reply by email or WhatsApp.",
    formName: "Your name",
    formBusiness: "Business",
    formMessage: "What do you need?",
    formSubmit: "Send",
    formSuccess: "Thanks — message saved. We'll be in touch.",
    formError: "Could not send. Try email or WhatsApp.",
    pitchLabel: "Pitch ready",
    pitchQuote:
      "“Hi, I'm Santi — here's how your site could look on mobile. 15 min?”",
    pitchBody:
      "Use this message with the link to /demos/lugner or your demo. Transparent: concept, not the official site.",
    mailSubject: "Website inquiry — santivilla.com",
    mailBody: "Hi Santi,\n\nI'd like to talk about a website for...\n",
    whatsappMessage:
      "Hi Santi, I want to talk about a website for my business.",
  },
  audit: {
    eyebrow: "Mobile Erst · Santi Design Agent",
    title: "Audit instantly.",
    titleBreak: "Concept automatically.",
    lead: "1) Paste URL → score on mobile, tablet, desktop. 2) Responsive HTML concept with the agent. 3) Like it? WhatsApp — we build the real site.",
    steps: ["01 Audit", "02 AI concept", "03 WhatsApp / deal"],
    uxScoreLabel: "UX Score",
    lighthouseLabel: "Lighthouse mobile",
    lighthouseLoading: "Loading Lighthouse… (Google PageSpeed)",
    lighthouseFailed: "Lighthouse unavailable — UX score still valid.",
    lighthouseUnavailable: "Lighthouse API not configured.",
    performance: "Performance",
    accessibility: "Accessibility",
    vitalsTitle: "Core Web Vitals",
    lcp: "LCP",
    fcp: "FCP",
    cls: "CLS",
    tbt: "TBT",
    ratingGood: "Good",
    ratingNeeds: "Needs work",
    ratingPoor: "Poor",
    diagnosisPending: "AI analyzing losses…",
    diagnosisTitle: "Santi's diagnosis",
    criticalPointsTitle: "3 critical losses",
    listenDiagnosis: "Audio diagnosis (~30 s)",
    audioPlay: "Listen",
    audioPause: "Pause",
    audioStop: "Stop",
    audioUnsupported: "Speech synthesis not supported in this browser.",
    downloadReport: "Open report",
    printPdf: "Print PDF",
    reportRecommendation: "Recommendation",
  },
  concept: {
    eyebrow: "Santi Design Agent",
    title: "Automatic concept",
    lead: "Preview from the audit. Talk to the agent to change menu, info, language… Not the official site. Like it? We build the real one.",
    backLink: "← Back to Mobile Erst",
    seoBadge: "SEO · JSON-LD",
    seoTooltip:
      "Machine-readable Schema.org data for Google — auto-generated from business facts.",
    seoOpeningHours: "Opening hours",
    seoMenu: "Menu",
    menuLinkLabel: "Link digitized menu (Menu ID)",
    menuLinkPlaceholder: "e.g. menu-abc123 or demo-konzept",
    menuLinkButton: "Link",
    menuLinkSuccess: "Menu linked — JSON-LD updated.",
    menuLinkError: "Link failed — check the ID.",
  },
  menuDigitizer: {
    title: "Digitize your menu",
    lead: "Upload a photo of your menu — in seconds see how it looks as a mobile website. Concept, no contract.",
    uploadLabel: "Photograph menu",
    uploadHint: "JPEG, PNG or WebP · max 4 MB · well lit, straight",
    processing: "Preparing image…",
    extracting: "AI reading your menu…",
    disclaimer:
      "OCR may contain errors — verify prices and allergens before publishing.",
    ocrNote: "Only readable text is extracted — nothing invented.",
    allergenNote:
      "Allergens only if visible on the menu — not a substitute for HACCP advice.",
    demoLinkLabel: "View demo menu (example)",
    demoLink: "/en/menu/demo-konzept",
    successTitle: "Your digital menu is ready",
    openPreview: "Open preview",
    tryAgain: "New photo",
    whatsappMessage:
      "Hi Santi, I digitized my menu and want to turn it into a real website.",
    previewBanner:
      "Concept / OCR preview — not the restaurant's official website",
    previewTitleFallback: "Your menu",
    previewBack: "← Upload new menu",
    previewEmpty: "No dishes detected — try a sharper photo.",
    homeCta: "Photograph your menu →",
    servicesBullet:
      "Menu digitization — upload a photo, mobile preview in seconds (restaurant hook).",
  },
  microBot: {
    title: "Micro-Bot WhatsApp",
    lead: "Three questions that flood your phone — tables, hours, parking. Instant answers, booking via WhatsApp. Not an annoying chatbot.",
    eyebrow: "Product · Restaurant",
    chipAvailability: "Tables today?",
    chipHours: "Opening hours",
    chipParking: "Parking",
    placeholder: "Ask a question…",
    send: "Send",
    openWhatsapp: "Open WhatsApp",
    disclaimer:
      "Concept — not official booking. Free text uses AI (Anthropic).",
    greeting:
      "Hi! I help with tables, opening hours and parking. Pick a question or type yours.",
    thinking: "One moment…",
    errorGeneric: "Can't reply right now. Try WhatsApp.",
    openLabel: "Open help",
    closeLabel: "Close",
    demoLink: "/demos/restaurant",
    demoLinkLabel: "Full restaurant demo",
    salesWhatsapp:
      "Hi Santi, I want the Micro-Bot WhatsApp for my restaurant.",
    homeCta: "Micro-Bot WhatsApp →",
    servicesBullet:
      "Micro-Bot WhatsApp — filters tables/hours/parking and hands off bookings.",
    bullets: [
      "Top 3 questions as chips — instant answers",
      "Free text: AI detects booking intent",
      "WhatsApp with pre-filled message",
      "Ultra-light — no login, no CRM",
    ],
  },
  copyAdapt: {
    title: "Local copy adaptation",
    lead: "Not literal translation — AI adapts menu items, offers and services to audience and culture (e.g. formal Austrian German for locals vs. fresh English for tourists).",
    eyebrow: "Product · Content",
    sourceLabel: "Source text",
    sourcePlaceholder: "e.g. Wiener schnitzel from veal with potato salad…",
    sourceLocaleLabel: "Source language",
    contentTypeLabel: "Content type",
    typeDish: "Dish / menu item",
    typeService: "Service",
    typeOffer: "Offer / promo",
    typeGeneral: "General",
    cityLabel: "City / region (optional)",
    cityPlaceholder: "Vienna",
    presetsLabel: "Quick presets",
    presetLocalAt: "Local AT + tourist EN/ES",
    presetTourist: "Tourist pack",
    presetBusiness: "Business DE/EN",
    targetsLabel: "Target variants (max 4)",
    audienceLocal: "Local",
    audienceTourist: "Tourist",
    audienceBusiness: "Business",
    generate: "Adapt copy",
    generating: "AI adapting…",
    disclaimer:
      "AI may err — review before publishing. No invented prices or facts.",
    errorGeneric: "Adaptation failed — please try again.",
    demoLinkLabel: "View demo example",
    shareLabel: "Shareable link",
    copy: "Copy",
    copied: "Copied",
    previewBanner: "Concept — not the business official website",
    previewTitle: "Adapted copy variants",
    previewBack: "← Generate new copy",
    salesWhatsapp:
      "Hi Santi, I want the copy generator for my business.",
    homeCta: "Local copy adaptation →",
    servicesBullet:
      "Copy generator — cultural adaptation instead of translation (DE/EN/ES).",
    tabAgent: "Agent",
    tabCopy: "Copy",
    bullets: [
      "Austrian German for locals, fresh English for tourists",
      "Dishes, offers or services — one text, multiple audiences",
      "Shareable link to align with your team",
      "Integrated into Mobile Erst concepts",
    ],
  },
  briefAgent: {
    title: "Brief → landing",
    lead: "Describe your business in a few lines. The AI fills a safe schema (no HTML) and we render Hero, features and contact with fixed React components.",
    eyebrow: "Product · Brief Agent",
    textareaLabel: "Your brief",
    textareaPlaceholder:
      "e.g. We’re an artisan bakery in Vienna’s 7th district. Sourdough and pastries. We want more catering bookings and neighborhood foot traffic…",
    textareaHint: "At least 20 characters. More concrete = better output.",
    generate: "Generate landing",
    generating: "AI writing the schema…",
    disclaimer:
      "Concept — structured text only. Review copy and colors before publishing.",
    errorGeneric: "Could not generate the brief. Please try again.",
    resultTitle: "Your preview",
    openShare: "Open shareable link",
    copyLink: "Copy link",
    copied: "Copied",
    previewBanner: "Brief Agent concept — not the official business site",
    previewBack: "← New brief",
    featuresTitle: "Why choose us",
    contactTitle: "Let’s talk",
    contactBody:
      "This block is a preview. If the direction feels right, we turn it into a real site with WhatsApp and a domain.",
    whatsappLabel: "Portfolio WhatsApp",
    salesWhatsapp:
      "Hi Santi, I generated a brief with the Brief Agent and want the real website.",
    homeCta: "Brief → landing →",
    servicesBullet:
      "Brief Agent — textarea → Zod JSON → React components (Hero / Features / Contact).",
    reviseLabel: "Edit with natural language",
    revisePlaceholder: "e.g. Shorten the headline · Change CTA to Book · Darker look",
    reviseSubmit: "Apply",
    revising: "Applying…",
    reviseError: "Could not apply the change. Please try again.",
    reviseHint: "The AI updates the JSON (copy/colors). Photos change only if you ask.",
    bullets: [
      "Natural language — no HTML, no rigid templates",
      "The AI only fills a Zod schema (colors, copy, 3 features)",
      "Shareable React preview for WhatsApp pitch",
      "Complements the URL Design Agent — does not replace it",
    ],
  },
  mapsKonzept: {
    title: "Maps → Live concept",
    lead: "Internal tool: paste a Google Maps URL → real hours, photos and reviews → shareable concept at /k/[slug].",
    eyebrow: "Internal · Prospecting",
    urlLabel: "Google Maps URL",
    urlPlaceholder: "https://maps.app.goo.gl/… or maps.google.com/…",
    urlHint: "Short links are resolved. place_id or business name from the URL is detected.",
    generate: "Create concept",
    generating: "Places + AI generating… (~60–90 s)",
    disclaimer:
      "Data from Google Places + Anthropic. Verify before pitching. Rate limit: 5/h per IP.",
    errorGeneric: "Concept failed — check URL or API keys.",
    shareLabel: "Live link (pitch-ready)",
    editLink: "Edit in agent →",
    salesWhatsapp: "Hi Santi, I want to use Maps concept for prospecting.",
    bullets: [
      "Real Google photos when available — otherwise AI images",
      "Slug URL /k/name for WhatsApp pitch",
      "Stored in Supabase like Mobile Erst concepts",
      "Batch: npm run prospect:maps",
    ],
  },
  packages,
  projects,
  projectsForHome: projects.map((p) => {
    if (p.slug === "mobile-erst") {
      return {
        ...p,
        blurb: "Find out if your current site fails on mobile — concept in minutes.",
      };
    }
    if (p.slug === "lugner") {
      return {
        ...p,
        blurb:
          "How a Vienna center could look with clear hours, shops and contact on mobile.",
      };
    }
    if (p.slug === "restaurant") {
      return {
        ...p,
        blurb:
          "Gastro template: menu, hours, map and WhatsApp booking in one flow.",
      };
    }
    return p;
  }),
};
