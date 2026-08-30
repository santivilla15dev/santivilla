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
    slug: "stadtgalerie",
    title: "Stadtgalerie West — mall concept",
    type: "Shopping center",
    href: "/demos/stadtgalerie",
    group: "vienna",
    blurb:
      "Mobile-first template for a shopping center in Vienna. Fictional concept, not an official site.",
    beforeNote:
      "Many centers still run on legacy Typo3 — zoom on mobile, key info buried.",
    afterNote:
      "New home with hours, shops, directions and contact in one clear flow.",
  },
  {
    slug: "restaurant",
    title: "Gasthaus Am Hof — Gastro template",
    type: "Restaurant",
    href: "/demos/restaurant",
    group: "template",
    blurb:
      "Gastro template: menu, hours, map and WhatsApp reservation.",
  },
  {
    slug: "villa-italia",
    title: "Villa Italia — Pizzeria",
    type: "Pizzeria",
    href: "/demos/villa-italia",
    group: "template",
    blurb:
      "Pizzeria template: menu, hours, delivery and WhatsApp — mobile-first.",
  },
  {
    slug: "solo-modas",
    title: "Solo Modas — Fashion",
    type: "Fashion",
    href: "/demos/solo-modas",
    group: "template",
    blurb:
      "Fashion retail template: categories, multiple locations, hours and WhatsApp.",
  },
  {
    slug: "universo-del-calzado",
    title: "Universo del Calzado — Sports",
    type: "Sports retail",
    href: "/demos/universo-del-calzado",
    group: "template",
    blurb:
      "Sports retail template: catalog, two stores and WhatsApp — mobile-first.",
  },
];

export const enMessages: SiteMessages = {
  meta: {
    title: "Santi Villa — Websites for local businesses in Vienna",
    description:
      "Modern responsive websites (mobile, tablet, desktop) for restaurants, shops and centers. Vienna / Remote.",
    ogLocale: "en_US",
  },
  nav: {
    work: "Work",
    services: "Services",
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
      "Guests decide in seconds whether to stay. I build websites that win those seconds — for restaurants, shops and centers in Vienna.",
    heroSub: "Clear. Fast. Mobile first.",
    heroH1: "Websites for local businesses in Vienna",
    heroCost:
      "On mobile, 53% of visits are abandoned if a page takes longer than 3 seconds (Google, Need for Mobile Speed, 2016). A slow site doesn’t just look bad — it loses customers before they read you.",
    heroCardEyebrow: "Concept · Vienna 15",
    heroCardTitle: "Stadtgalerie West on mobile",
    heroCardAlt: "Stadtgalerie West demo on a phone",
    heroAuditCta: "Try free with your URL",
    heroFreeNote:
      "Audit and first Konzept free, no commitment. You only quote when you want the real site.",
    heroGuarantee: "You see the design before you pay a euro.",
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
        title: "See the design before you pay",
        body: "You get a redesign (Konzept) at no cost — you see how it looks before you pay a euro for the real site.",
      },
      {
        title: "Clear pricing and scope",
        body: "Landing, business site or maintenance. You know what's included from day one.",
      },
    ],
    clientDesignEyebrow: "How we work",
    clientDesignTitle: "See the design before you pay",
    clientDesignBody:
      "You see the design before you pay a euro: first a free Konzept — a visual idea of how your business could look online. It's not the official site; an honest demo, free and no commitment. You can request changes (menu, hours, language) and when it fits, I launch the real site with domain, hosting and WhatsApp.",
    clientDesignSteps: [
      "Audit or demo (free): your URL or a close template for your niche.",
      "Konzept (free): responsive design with your info (or data you send).",
      "Feedback: WhatsApp — refine until you say yes.",
      "Real website (fixed scope & price): launch, domain, done — no more legacy CMS.",
    ],
    clientDesignCtaDemo: "View Stadtgalerie demo",
    proofEyebrow: "Measured case · Vienna",
    proofTitle: "Shopping center — mobile before / after",
    proofBody:
      "Typical Typo3 mall vs. Stadtgalerie West concept. Numbers from Google PageSpeed Insights (mobile). Public demo is fictional — not an official site.",
    proofCtaDemo: "View Stadtgalerie demo",
    proofCtaWork: "See work →",
    includesEyebrow: "One service",
    includesTitle: "How we build your website",
    includesLead:
      "Step by step, in the same project. These pieces come in when your business needs them — not separate products.",
    includes: [
      {
        title: "We start with your URL",
        body: "Score 0–100 and an auto concept from your site — clear before/after.",
        tool: "audit",
      },
      {
        title: "Menu onto the website",
        body: "Photo of the menu → dishes and prices in a mobile preview, ready for the site.",
        tool: "menu",
      },
      {
        title: "Contact in one tap",
        body: "Quick answers on seating, hours, parking; bookings to the real WhatsApp chat.",
        tool: "microbot",
      },
      {
        title: "Copy that sounds local",
        body: "Text adapted to the audience (not literal translation) DE/EN/ES.",
        tool: "copy",
      },
      {
        title: "Prefer to write?",
        body: "A short brief becomes a landing draft — same project, different starting point.",
        tool: "brief",
      },
    ],
    pricingEyebrow: "Pricing",
    pricingFrom: "From €400",
    pricingBody:
      "A clear mobile landing with WhatsApp and domain setup. Business sites and retainers with a fixed scope — no surprises.",
    pricingLink: "See packages →",
    workTitle: "Work & demos",
    workBody:
      "Vienna cases first. Then niche templates. Demos are concepts, not official sites.",
    workLink: "View all →",
  },
  services: {
    title: "Services",
    lead: "One clear product: your website. First the concept, then the real site. Three clear packages — mobile, tablet, desktop.",
    packageLabel: "Package",
    alsoTitle: "Included or available in your project",
    alsoItems: [
      "Shopping center / multi-shop — from ~€3,000–8,000+ depending on shops, languages, CMS.",
      "Pitch demo — like Stadtgalerie, to show the owner a vision.",
      "Domain + hosting — Vercel setup included in site packages.",
    ],
    whatsappMessage: "Hi Santi, I'd like to quote a website package.",
  },
  work: {
    title: "Work",
    lead: "Vienna case first (shopping center). Then niche templates you can adapt to your business.",
    lugnerEyebrow: "Template · Vienna",
    lugnerTitle: "Stadtgalerie West: before vs after",
    lugnerBody:
      "Many shopping centers still fight Typo3 on mobile. The public demo is a fictional mobile-first concept — not an official site for any real center.",
    before: "Before",
    after: "After · Demo",
    beforeNote: "Dense layout · small type · hard on mobile.",
    afterNote: "Clear home: hours, shops, directions, contact in one flow.",
    beforeHost: "Typo3 · Zentrum",
    caseBrand: "Stadtgalerie West",
    viewCurrent: "View current site →",
    openDemo: "Open demo →",
    openDemoCta: "Open Stadtgalerie demo",
    konzeptNote:
      "Fictional concept — not the official website of any shopping center.",
    viennaTitle: "Vienna",
    viennaLead:
      "Public template: shopping center in Vienna (Stadtgalerie West).",
    templatesTitle: "Templates by niche",
    templatesLead:
      "Reusable structures: gastro, pizzeria, fashion and sports.",
    templatesNote: "Also tested internationally.",
    open: "Open",
    pricingTitle: "Guide prices",
    pricingLead:
      "Guide prices in euros (Austria / EU). Deposit (30–50%) reserves the slot; code handover on payment.",
    centerNote: "Shopping center (multi-section + shops): from ~€3,000 depending on scope.",
    whatsappMessage:
      "Hi Santi, I saw your work (Stadtgalerie / restaurant) and want to discuss a project.",
    metricsTitle: "Numbers · Lighthouse mobile",
    metricsSource: "Google PageSpeed Insights API",
    metricsBefore: "Before (Typo3 · Zentrum)",
    metricsAfter: "After (demo)",
    metricsPerformance: "Performance",
    metricsLcp: "LCP",
    metricsFcp: "FCP",
    metricsUxNote:
      "WhatsApp 1-tap in hero vs. Typo3 sites without a clear link — UX fact, not an analytics claim.",
  },
  contact: {
    title: "Contact",
    lead: "Want to see how it could look first? Try",
    leadAudit: "or write me — next step in minutes.",
    auditLinkLabel: "Try with your URL",
    briefAlt: "Prefer to write a brief instead of calling?",
    briefLink: "Open Brief Agent →",
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
      "Use this message with the link to /demos/stadtgalerie or your demo. Transparent: concept, not the official site.",
    mailSubject: "Website inquiry — santivilla.com",
    mailBody: "Hi Santi,\n\nI'd like to talk about a website for...\n",
    whatsappMessage:
      "Hi Santi, I want to talk about a website for my business.",
  },
  audit: {
    eyebrow: "Mobile Erst · Santi Design Agent",
    title: "Audit instantly.",
    titleBreak: "Concept automatically.",
    lead: "Free, no commitment: 1) Paste URL → score on mobile, tablet, desktop. 2) Responsive HTML concept with the agent. 3) Like it? WhatsApp — we quote the real site.",
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
      "Available in your project: menu digitization — photo → mobile preview (restaurant).",
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
      "Available in your project: Micro-Bot WhatsApp — tables/hours/parking → booking chat.",
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
      "Available in your project: local copy — cultural adaptation (not literal translation) DE/EN/ES.",
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
      "Available in your project: Brief → conceptual landing from a few lines of text.",
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
    if (p.slug === "stadtgalerie") {
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
