import type { SiteMessages } from "./types";

const packages: SiteMessages["packages"] = [
  {
    id: "landing",
    name: "Landing",
    price: "€400–800",
    description:
      "Una página clara en móvil, tablet y desktop, con WhatsApp y dominio/hosting.",
    includes: [
      "Diseño responsive (todos los dispositivos)",
      "1 página + secciones",
      "Botón WhatsApp / reserva",
      "Setup dominio + Vercel",
    ],
  },
  {
    id: "negocio",
    name: "Sitio negocio",
    price: "€900–2.000",
    description:
      "Sitio completo (4–6 páginas) para restaurante, tienda o local.",
    includes: [
      "Menú / servicios / horarios",
      "Mapa y contacto",
      "SEO básico",
      "Hasta 2 rondas de cambios",
    ],
  },
  {
    id: "mensual",
    name: "Mantenimiento",
    price: "€50–150/mes",
    description: "Cambios de texto/fotos, uptime y peques mejoras cada mes.",
    includes: [
      "Cambios de contenido",
      "Monitoreo básico",
      "Soporte por WhatsApp",
      "Prioridad en nuevas features",
    ],
  },
];

const projects: SiteMessages["projects"] = [
  {
    slug: "stadtgalerie",
    title: "Stadtgalerie West — Konzept centro",
    type: "Centro comercial",
    href: "/demos/stadtgalerie",
    group: "vienna",
    blurb:
      "Plantilla mobile-first de centro comercial en Wien. Concepto ficticio, no un sitio oficial.",
    beforeNote:
      "Muchos centros aún viven en Typo3 antiguo: zoom en móvil, info clave enterrada.",
    afterNote:
      "Home clara: horarios, tiendas, cómo llegar y contacto en un solo flujo táctil.",
  },
  {
    slug: "restaurant",
    title: "Gasthaus Am Hof — Plantilla gastro",
    type: "Restaurante",
    href: "/demos/restaurant",
    group: "template",
    blurb:
      "Plantilla gastro: menú, horarios, mapa y reserva por WhatsApp.",
  },
  {
    slug: "villa-italia",
    title: "Villa Italia — Pizzería",
    type: "Pizzería",
    href: "/demos/villa-italia",
    group: "template",
    blurb:
      "Plantilla pizzería: carta, horarios, delivery y WhatsApp — mobile-first.",
  },
  {
    slug: "solo-modas",
    title: "Solo Modas — Tienda de ropa",
    type: "Moda",
    href: "/demos/solo-modas",
    group: "template",
    blurb:
      "Plantilla retail moda: categorías, varias sedes, horarios y WhatsApp.",
  },
  {
    slug: "universo-del-calzado",
    title: "Universo del Calzado — Deportes",
    type: "Retail deportivo",
    href: "/demos/universo-del-calzado",
    group: "template",
    blurb:
      "Plantilla retail deportivo: catálogo, dos sedes y WhatsApp — mobile-first.",
  },
];

export const esMessages: SiteMessages = {
  meta: {
    title: "Santi Villa — Webs para negocios locales en Wien",
    description:
      "Webs modernas y responsive (móvil, tablet, desktop) para restaurantes, locales y centros comerciales. Wien / Remote.",
    ogLocale: "es_ES",
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que buscas no existe o fue movida.",
    cta: "Volver al inicio",
  },
  nav: {
    work: "Trabajos",
    services: "Servicios",
    contact: "Contacto",
    localeHint: "Portafolio (ES) · el sitio de cliente es DE",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    localeLabels: {
      de: "Deutsch — clientes en Wien",
      en: "English — portfolio / partners",
      es: "Español — portafolio",
    },
  },
  footer: {
    navLabel: "Navegación",
    legalLabel: "Legal",
    impressum: "Impressum",
    datenschutz: "Privacidad",
    agb: "Términos",
    about: "Sobre mí",
    copyright:
      "Demos conceptuales no son sitios oficiales de los negocios mostrados.",
    tagline: "Webs modernas que se ven bien en cualquier dispositivo",
  },
  consent: {
    title: "Cookies y privacidad",
    body: "Usamos cookies necesarias para el idioma y, solo si las aceptas, cookies opcionales de analítica o marketing. En v1 no cargamos scripts de tracking hasta que optes por esas categorías.",
    acceptAll: "Aceptar todo",
    rejectNonEssential: "Rechazar no esenciales",
    customize: "Personalizar",
    save: "Guardar preferencias",
    necessaryLabel: "Necesarias",
    necessaryHint: "Idioma (sv_locale), seguridad del sitio y Auth en admin/portal. Siempre activas.",
    analyticsLabel: "Analítica",
    analyticsHint: "Medición de uso del sitio. Ningún script de analítica en v1 hasta que lo activemos y tú aceptes.",
    marketingLabel: "Marketing",
    marketingHint: "Píxeles o anuncios. Ninguno en v1 hasta que lo activemos y tú aceptes.",
    privacyLink: "Ver política de cookies →",
    closeCustomize: "Volver",
  },
  cta: {
    whatsapp: "WhatsApp",
    schedule: "Agendar 15 min",
    defaultWhatsapp:
      "Hola Santi, vi tu portafolio y me interesa una web para mi negocio.",
  },
  home: {
    heroLead:
      "Tus clientes deciden en segundos si se quedan. Yo construyo webs que ganan esos segundos — para restaurantes, locales y centros en Wien.",
    heroH1: "Webs para negocios locales en Wien",
    heroCost:
      "En móvil, el 53% de las visitas se abandona si la página tarda más de 3 s (Google, Need for Mobile Speed, 2016). Una web lenta no “se ve fea”: pierde clientes antes de que te lean.",
    heroCardEyebrow: "Konzept · mobile-first",
    heroCardTitle: "Tu negocio en el móvil",
    heroCardAlt: "Concepto mobile-first mostrado en un móvil",
    heroAuditCta: "Audita tu web gratis",
    heroGuarantee: "Ves el diseño antes de pagar un euro.",
    trustSignalsLabel: "Señales de confianza",
    trustSignals: [
      {
        id: "hosting",
        label: "HTTPS · hosting Vercel — velocidad real",
      },
      {
        id: "payment",
        label: "Depósito: SEPA / factura AT",
      },
      {
        id: "coverage",
        label: "Viena y alrededores",
      },
      {
        id: "response",
        label: "Respondo en menos de 24 h",
      },
    ],
    introEyebrow: "De qué se trata",
    introTitle: "Una web que tus clientes entienden en segundos",
    introBody:
      "Soy Santi Villa. Ayudo a negocios locales (Wien y remote) a tener una presencia online limpia: horarios, menú o servicios, mapa y WhatsApp a un toque. Sin líos técnicos, sin sitios que solo se ven bien en un monitor grande.",
    advantagesTitle: "Por qué encaja con tu negocio",
    advantages: [
      {
        title: "Se ve bien en cualquier pantalla",
        body: "Móvil, tablet y desktop. Tus clientes no pelean con el zoom ni con menús imposibles.",
      },
      {
        title: "Contacto en un toque",
        body: "WhatsApp, llamada o reserva visibles. Menos fricción = más clientes que te escriben.",
      },
      {
        title: "Hablas con quien construye",
        body: "Sin gestores de proyecto ni tickets. Escribes por WhatsApp y te responde la persona que hace tu web.",
      },
      {
        title: "Precios y alcance claros",
        body: "Landing, sitio de negocio o mantenimiento. Sabes qué incluye cada paquete desde el día uno.",
      },
    ],
    clientDesignEyebrow: "Cómo trabajamos",
    clientDesignTitle: "Ves el diseño antes de pagar",
    clientDesignBody:
      "Ves el diseño antes de pagar un euro: primero un Konzept gratis — propuesta visual de cómo podría verse tu negocio online. No es el sitio oficial; es una demo honesta, sin costo y sin compromiso. Puedes pedir cambios (menú, horarios, idioma) y, cuando encaje, lanzo la web real con dominio, hosting y WhatsApp listo.",
    clientDesignSteps: [
      "Audit o demo (gratis): URL de tu web o una plantilla cercana a tu rubro.",
      "Konzept (gratis): diseño responsive con tu info (o datos que me pases).",
      "Feedback: WhatsApp — afinamos hasta que digas sí.",
      "Web real (presupuesto cerrado): publicamos, conectamos dominio y dejas de depender de sitios antiguos.",
    ],
    clientDesignCtaDemo: "Ver demo Stadtgalerie →",
    proofEyebrow: "Caso medido · Wien",
    proofTitle: "Centro comercial — móvil antes / después",
    proofBody:
      "Typo3 típico de un Zentrum frente al Konzept Stadtgalerie West. Cifras de Google PageSpeed Insights (móvil). Demo pública ficticia — no un sitio oficial.",
    proofCtaDemo: "Ver demo Stadtgalerie →",
    proofCtaWork: "Ver trabajos →",
    selfScoreEyebrow: "Esta página",
    selfScoreTitle: "/100 en móvil",
    selfScoreBody:
      "La misma métrica que uso en la auditoría. Medido con Google Lighthouse (lab móvil).",
    selfScoreMeta: "Lighthouse · móvil",
    selfScoreLink: "Ver en PageSpeed →",
    includesEyebrow: "Un solo servicio",
    includesTitle: "Así construimos tu web",
    includesLead:
      "Paso a paso, dentro del mismo proyecto. Estas piezas entran cuando tu negocio las necesita — no son productos aparte.",
    includes: [
      {
        title: "Empezamos con tu URL",
        body: "Score 0–100 y concepto automático a partir de tu web — para ver el salto antes/después.",
        tool: "audit",
      },
      {
        title: "Pasamos la carta a la web",
        body: "Foto de la carta → platos y precios en preview móvil, listos para el sitio.",
        tool: "menu",
      },
      {
        title: "Contacto a un toque",
        body: "Respuestas rápidas a sitio, horarios y aparcar; reservas al chat real de WhatsApp.",
        tool: "microbot",
      },
      {
        title: "Textos que suenan locales",
        body: "Copy adaptado al público (no traducción literal) en DE/EN/ES.",
        tool: "copy",
      },
      {
        title: "Si prefieres escribir",
        body: "Un brief corto se convierte en borrador de landing — mismo proyecto, otro punto de partida.",
        tool: "brief",
      },
    ],
    pricingEyebrow: "Precios",
    pricingFrom: "Desde €400",
    pricingBody:
      "Landing clara en móvil con WhatsApp y setup de dominio. Sitios de negocio y mantenimiento con alcance cerrado — sin sorpresas.",
    pricingLink: "Ver paquetes →",
    workTitle: "Trabajos y demos",
    workBody:
      "Primero casos en Wien. Luego plantillas por rubro. Las demos son propuestas conceptuales, no sitios oficiales.",
    workLink: "Ver todos →",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas frecuentes",
    finalCtaEyebrow: "Siguiente paso",
    finalCtaTitle: "¿Empezamos con tu auditoría gratuita?",
    faqItems: [
      {
        id: "timeline",
        question: "¿Cuánto tarda en estar lista mi web?",
        answer:
          "Tras el depósito y un brief cerrado: landing ~1–2 semanas; sitio de negocio ~2–4 semanas; proyectos tipo centro comercial ~4–8+ semanas. Los plazos dependen de que me envíes feedback y contenidos a tiempo.",
      },
      {
        id: "design",
        question: "¿Qué pasa si no me gusta el diseño?",
        answer:
          "Primero afinamos el Konzept gratis por WhatsApp hasta que digas sí — ves el diseño antes de pagar un euro por la web real. En el build de pago van incluidas 2 rondas de revisión antes del saldo.",
      },
      {
        id: "assets",
        question: "¿Qué necesito darte para empezar?",
        answer:
          "Textos (o borradores), fotos del local/productos, logo si lo tienes (si no, usamos placeholders), horarios, enlace de WhatsApp o reserva, y un brief corto de lo que quieres destacar. Con eso arranca el Konzept.",
      },
      {
        id: "deposit",
        question: "¿Cómo funciona el pago del depósito?",
        answer:
          "Reservas la fecha con un depósito del 30–50% del precio acordado (transferencia SEPA / factura en Austria). El resto se factura a la entrega del código o al go-live. El depósito no se reembolsa si cancelas después de reservar; el saldo no se cobra si no entrego.",
      },
      {
        id: "hosting",
        question: "¿Incluye mantenimiento o hosting?",
        answer:
          "Los paquetes de sitio incluyen el setup de dominio + hosting en Vercel. El mantenimiento mensual (€50–150) es opcional: cambios de contenido, monitoreo básico y soporte por WhatsApp.",
      },
      {
        id: "location",
        question: "¿Trabajas fuera de Viena?",
        answer:
          "Sí. El foco es Wien y Austria, pero trabajo remoto con negocios fuera de Viena (y fuera de AT) sin problema.",
      },
    ],
    aboutEyebrow: "Sobre mí",
    aboutTitle: "Santi Villa",
    aboutBody:
      "Trabajo solo: hablas con quien diseña, programa y publica. Sin capas de cuenta ni markup de agencia — plazos y precio claros desde el día uno. Estoy en Wien y también remoto, para negocios locales que quieren una web que se entiende en el móvil.",
    aboutStackLabel: "Stack",
    aboutStack:
      "Next.js + Vercel — sitios rápidos, HTTPS y deploys limpios (la misma base que medimos en esta página).",
    aboutPhotoAlt: "Santi Villa — retrato 3D estilizado",
    resultsEyebrow: "Resultados",
    resultsTitle: "Antes / después en números",
    resultsLead:
      "Una métrica clara por proyecto. El primero es un Konzept público medido; los otros dos son placeholders hasta tener permiso de clientes reales.",
    resultsPlaceholderBadge: "Placeholder — TODO",
    resultsBeforeLabel: "Antes",
    resultsAfterLabel: "Después",
    resultsItems: [
      {
        id: "stadtgalerie-konzept",
        name: "Centro comercial · Konzept",
        sector: "Konzept público",
        metricLabel: "Lighthouse Performance (móvil)",
        quote: null,
        isPlaceholder: false,
      },
      {
        // TODO: replace with real local café / business when permitted
        id: "todo-local-cafe",
        name: "Café local (genérico)",
        sector: "Placeholder",
        metricLabel: "LCP móvil",
        before: "4,2 s",
        after: "0,9 s",
        quote: null,
        isPlaceholder: true,
      },
      {
        // TODO: replace with real salon / service business when permitted
        id: "todo-salon",
        name: "Salón / servicio (genérico)",
        sector: "Placeholder",
        metricLabel: "Visitas desde móvil",
        before: "~48 %",
        after: "~71 %",
        quote: null,
        isPlaceholder: true,
      },
    ],
  },
  services: {
    title: "Servicios",
    lead: "Un producto claro: tu web. Primero ves el concepto; luego construimos el sitio real. Tres paquetes simples — claros en móvil, tablet y desktop.",
    packageLabel: "Paquete",
    alsoTitle: "Incluido o disponible en tu proyecto",
    alsoItems: [
      "Centro comercial / multi-tienda — desde ~€3.000–8.000+ según shops, idiomas y CMS.",
      "Demo de pitch — te preparo una vista previa conceptual (como Stadtgalerie) para enseñar al dueño.",
      "Dominio + hosting — setup en Vercel incluido en los paquetes de sitio.",
    ],
    agbLink: "Proceso, depósito y garantía (ves el diseño antes de pagar) → Términos",
    whatsappMessage: "Hola Santi, quiero cotizar un paquete de web.",
  },
  work: {
    title: "Trabajos",
    lead: "Primero el caso Wien (centro comercial). Después, plantillas por rubro que puedes adaptar.",
    stadtgalerieEyebrow: "Plantilla · Wien",
    stadtgalerieTitle: "Stadtgalerie West: antes vs después",
    stadtgalerieBody:
      "Muchos centros comerciales aún pelean con Typo3 en el móvil. La demo pública es un Konzept ficticio mobile-first — no un sitio oficial de ningún centro real.",
    before: "Antes",
    after: "Después · Demo",
    beforeNote: "Layout denso · tipografía pequeña · difícil en móvil.",
    afterNote: "Home clara: horarios, tiendas, cómo llegar y contacto en un solo flujo.",
    beforeHost: "Typo3 · Zentrum",
    caseBrand: "Stadtgalerie West",
    viewCurrent: "Ver sitio actual →",
    openDemo: "Abrir demo →",
    openDemoCta: "Abrir demo Stadtgalerie",
    konzeptNote:
      "Konzept ficticio — no es el sitio oficial de ningún centro comercial.",
    viennaTitle: "Wien",
    viennaLead:
      "Plantilla pública de centro comercial en Viena (Stadtgalerie West).",
    demoCta: "Abrir demo Stadtgalerie →",
    templatesTitle: "Plantillas por rubro",
    templatesLead:
      "Estructuras reutilizables: gastro, pizzería, moda y deportes.",
    templatesNote: "También probado internacionalmente.",
    open: "Abrir",
    pricingTitle: "Precios orientativos",
    pricingLead:
      "Orientativos en euros (Austria / EU). El depósito (30–50%) reserva la fecha; la entrega del código es al pagar.",
    centerNote: "Centro comercial (multi-sección + shops): desde ~€3.000 según alcance.",
    whatsappMessage:
      "Hola Santi, vi tus trabajos (Stadtgalerie / restaurante) y quiero hablar de un proyecto.",
    metricsTitle: "Cifras · Lighthouse mobile",
    metricsSource: "Google PageSpeed Insights API",
    metricsBefore: "Antes (Typo3 · Zentrum)",
    metricsAfter: "Después (demo)",
    metricsPerformance: "Performance",
    metricsLcp: "LCP",
    metricsFcp: "FCP",
    metricsUxNote:
      "WhatsApp 1 tap en hero vs. sitios Typo3 sin enlace claro — hecho UX, no promesa de analytics.",
  },
  contact: {
    title: "Contacto",
    lead: "¿Quieres ver primero cómo quedaría? Prueba",
    leadAudit: "o escríbeme: te cuento el siguiente paso en minutos.",
    auditLinkLabel: "Probar con tu URL",
    briefAlt: "¿Prefieres escribir un brief en vez de llamar?",
    briefLink: "Abrir Brief Agent →",
    email: "Email",
    whatsapp: "WhatsApp",
    openChat: "Abrir chat",
    schedule: "Agenda",
    formTitle: "Mensaje rápido",
    formLead:
      "El mensaje se guarda — Santi responde por email o WhatsApp.",
    formName: "Tu nombre",
    formBusiness: "Negocio",
    formMessage: "¿Qué necesitas?",
    formSubmit: "Enviar",
    formSuccess: "Gracias — mensaje guardado. Te contactamos pronto.",
    formError: "Error al enviar. Usa email o WhatsApp.",
    pitchLabel: "Pitch listo",
    pitchQuote:
      "“Hola, soy Santi — rediseñé cómo se vería tu sitio en el móvil. ¿Tenemos 15 min?”",
    pitchBody:
      "Usa ese mensaje con el link de /demos/stadtgalerie o tu demo personalizada. Transparencia: es un concepto, no el sitio oficial.",
    mailSubject: "Consulta web — santivilla.com",
    mailBody: "Hola Santi,\n\nMe gustaría hablar de una web para...\n",
    whatsappMessage:
      "Hola Santi, quiero hablar de una web para mi negocio.",
  },
  audit: {
    eyebrow: "Auditoría · gratis",
    title: "Auditoría al instante.",
    titleBreak: "Concepto automático.",
    lead: "Gratis y sin compromiso: 1) Pegas la URL → score en móvil, tablet y desktop. 2) Generas un concepto HTML responsive con el agente. 3) Si te gusta, WhatsApp y cotizamos la web real.",
    steps: ["01 Audit", "02 Concepto IA", "03 WhatsApp / deal"],
    uxScoreLabel: "UX Score",
    lighthouseLabel: "Lighthouse mobile",
    lighthouseLoading: "Cargando Lighthouse… (Google PageSpeed)",
    lighthouseFailed: "Lighthouse no disponible — el score UX sigue válido.",
    lighthouseUnavailable: "API Lighthouse no configurada.",
    performance: "Performance",
    accessibility: "Accesibilidad",
    vitalsTitle: "Core Web Vitals",
    lcp: "LCP",
    fcp: "FCP",
    cls: "CLS",
    tbt: "TBT",
    ratingGood: "Bien",
    ratingNeeds: "Mejorable",
    ratingPoor: "Mal",
    diagnosisPending: "La IA analiza pérdidas…",
    diagnosisTitle: "Diagnóstico de Santi",
    criticalPointsTitle: "3 pérdidas críticas",
    listenDiagnosis: "Diagnóstico en audio (~30 s)",
    audioPlay: "Escuchar",
    audioPause: "Pausa",
    audioStop: "Parar",
    audioUnsupported: "Este navegador no soporta voz sintética.",
    downloadReport: "Abrir informe",
    printPdf: "Imprimir PDF",
    reportRecommendation: "Recomendación",
  },
  concept: {
    eyebrow: "Santi Design Agent",
    title: "Concepto automático",
    lead: "Preview generado desde el audit. Habla con el agente para cambiar menú, info, idioma… No es el sitio oficial. Si te gusta, lo convertimos en web real.",
    backLink: "← Volver a la auditoría",
    seoBadge: "SEO · JSON-LD",
    seoTooltip:
      "Datos Schema.org legibles por Google — generados automáticamente desde datos del negocio.",
    seoOpeningHours: "Horarios",
    seoMenu: "Carta",
    menuLinkLabel: "Vincular carta digitalizada (ID menú)",
    menuLinkPlaceholder: "ej. menu-abc123 o demo-konzept",
    menuLinkButton: "Vincular",
    menuLinkSuccess: "Carta vinculada — JSON-LD actualizado.",
    menuLinkError: "Error al vincular — revisa el ID.",
  },
  menuDigitizer: {
    title: "Digitalizar tu carta",
    lead: "Sube una foto de tu carta — en segundos ves cómo quedaría como web móvil. Concepto, sin contrato.",
    uploadLabel: "Fotografiar carta",
    uploadHint: "JPEG, PNG o WebP · máx. 4 MB · buena luz, recta",
    processing: "Preparando imagen…",
    extracting: "La IA lee tu carta…",
    disclaimer:
      "El OCR puede equivocarse — revisa precios y alérgenos antes de publicar.",
    ocrNote: "Solo se extrae texto legible — nada inventado.",
    allergenNote:
      "Alérgenos solo si aparecen en la carta — no sustituye asesoría HACCP.",
    demoLinkLabel: "Ver carta demo (ejemplo)",
    demoLink: "/es/menu/demo-konzept",
    successTitle: "Tu carta digital está lista",
    openPreview: "Abrir preview",
    tryAgain: "Nueva foto",
    whatsappMessage:
      "Hola Santi, digitalicé mi carta y quiero convertirla en web real.",
    previewBanner:
      "Concepto / preview OCR — no es la web oficial del local",
    previewTitleFallback: "Tu carta",
    previewBack: "← Subir otra carta",
    previewEmpty: "No se detectaron platos — prueba una foto más nítida.",
    homeCta: "Fotografiar tu carta →",
    servicesBullet:
      "Disponible en el proyecto: digitalización de carta — foto → preview móvil (gastro).",
  },
  microBot: {
    title: "Micro-Bot WhatsApp",
    lead: "Tres preguntas que te llaman cada día — sitio, horarios, aparcar. Respuesta al instante, reserva por WhatsApp. No es un chatbot molesto.",
    eyebrow: "Incluido en tu web · Gastro",
    chipAvailability: "¿Hay sitio hoy?",
    chipHours: "Horarios",
    chipParking: "Aparcar",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    openWhatsapp: "Abrir WhatsApp",
    disclaimer:
      "Concepto — no es reserva oficial. El texto libre usa IA (Anthropic).",
    greeting:
      "¡Hola! Te ayudo con sitio, horarios y aparcamiento. Elige una pregunta o escríbenos.",
    thinking: "Un momento…",
    errorGeneric: "No puedo responder ahora. Prueba WhatsApp.",
    openLabel: "Abrir ayuda",
    closeLabel: "Cerrar",
    demoLink: "/demos/restaurant",
    demoLinkLabel: "Demo restaurante completa",
    salesWhatsapp:
      "Hola Santi, quiero el Micro-Bot WhatsApp para mi local.",
    homeCta: "Micro-Bot WhatsApp →",
    servicesBullet:
      "Disponible en el proyecto: Micro-Bot WhatsApp — sitio/horarios/aparcar → reserva al chat.",
    bullets: [
      "3 preguntas frecuentes como chips — respuesta instantánea",
      "Texto libre: la IA detecta intención de reserva",
      "WhatsApp con mensaje pre-rellenado",
      "Ultra-ligero — sin login ni CRM",
    ],
  },
  copyAdapt: {
    title: "Adaptar copy local",
    lead: "No es traducción literal — la IA adapta platos, ofertas y servicios al público y la cultura (ej. alemán formal austriaco para locales vs. inglés fresco para turistas).",
    eyebrow: "Incluido en tu web · Contenido",
    sourceLabel: "Texto original",
    sourcePlaceholder: "ej. Schnitzel vienés de ternera con ensalada de patata…",
    sourceLocaleLabel: "Idioma origen",
    contentTypeLabel: "Tipo de contenido",
    typeDish: "Plato / carta",
    typeService: "Servicio",
    typeOffer: "Oferta / promo",
    typeGeneral: "General",
    cityLabel: "Ciudad / región (opcional)",
    cityPlaceholder: "Viena",
    presetsLabel: "Presets rápidos",
    presetLocalAt: "Local AT + turistas EN/ES",
    presetTourist: "Pack turistas",
    presetBusiness: "Business DE/EN",
    targetsLabel: "Variantes destino (máx. 4)",
    audienceLocal: "Local",
    audienceTourist: "Turista",
    audienceBusiness: "Business",
    generate: "Adaptar copy",
    generating: "IA adaptando…",
    disclaimer:
      "La IA puede equivocarse — revisa antes de publicar. Sin precios ni datos inventados.",
    errorGeneric: "Falló la adaptación — inténtalo de nuevo.",
    demoLinkLabel: "Ver ejemplo demo",
    shareLabel: "Enlace compartible",
    copy: "Copiar",
    copied: "Copiado",
    previewBanner: "Concepto — no es la web oficial del local",
    previewTitle: "Variantes de copy adaptadas",
    previewBack: "← Generar nuevo copy",
    salesWhatsapp:
      "Hola Santi, quiero el generador de copy para mi local.",
    homeCta: "Adaptar copy local →",
    servicesBullet:
      "Disponible en el proyecto: copy local — adaptación cultural (no traducción literal) DE/EN/ES.",
    tabAgent: "Agente",
    tabCopy: "Copy",
    bullets: [
      "Alemán austriaco para locales, inglés fresco para turistas",
      "Platos, ofertas o servicios — un texto, varios públicos",
      "Enlace compartible para alinear con el equipo",
      "Integrado en conceptos de auditoría",
    ],
  },
  briefAgent: {
    title: "Brief → landing",
    lead: "Describe tu negocio en unas líneas. La IA rellena un esquema seguro (sin HTML) y pintamos Hero, servicios y contacto con componentes fijos.",
    eyebrow: "Incluido en tu web · Brief Agent",
    textareaLabel: "Tu brief",
    textareaPlaceholder:
      "Ej. Somos una panadería artesanal en el 7. Bezirk. Horneamos pan de masa madre y pasteles. Queremos más reservas de catering y visitas de vecinos…",
    textareaHint: "Mínimo 20 caracteres. Cuanto más concreto, mejor el resultado.",
    generate: "Generar landing",
    generating: "IA escribiendo el esquema…",
    disclaimer:
      "Concepto — solo texto estructurado. Revisa copy y colores antes de publicar.",
    errorGeneric: "No se pudo generar el brief. Inténtalo de nuevo.",
    resultTitle: "Tu preview",
    openShare: "Abrir enlace compartible",
    copyLink: "Copiar enlace",
    copied: "Copiado",
    previewBanner: "Concepto Brief Agent — no es la web oficial del negocio",
    previewBack: "← Nuevo brief",
    featuresTitle: "Por qué elegirnos",
    contactTitle: "Hablemos",
    contactBody:
      "Este bloque es un preview. Si te gusta la dirección, lo convertimos en web real con WhatsApp y dominio.",
    whatsappLabel: "WhatsApp portfolio",
    salesWhatsapp:
      "Hola Santi, generé un brief con el Brief Agent y quiero la web real.",
    homeCta: "Brief → landing →",
    servicesBullet:
      "Disponible en el proyecto: Brief → landing conceptual desde unas líneas de texto.",
    reviseLabel: "Editar con lenguaje natural",
    revisePlaceholder: "Ej. Acorta el headline · Cambia el CTA a Reservar · Más oscuro",
    reviseSubmit: "Aplicar",
    revising: "Aplicando…",
    reviseError: "No se pudo aplicar el cambio. Inténtalo de nuevo.",
    reviseHint: "La IA actualiza el JSON (copy/colores). Las fotos solo cambian si lo pides.",
    bullets: [
      "Escribes en lenguaje natural — sin HTML ni plantillas rígidas",
      "La IA solo rellena un esquema Zod (colores, copy, 3 features)",
      "Preview React compartible por WhatsApp",
      "Complementa el Design Agent por URL — no lo sustituye",
    ],
  },
  mapsKonzept: {
    title: "Maps → Konzept Live",
    lead: "Herramienta interna: pega URL de Google Maps → horarios, fotos y reseñas reales → concepto compartible en /k/[slug].",
    eyebrow: "Interno · Prospección",
    urlLabel: "URL de Google Maps",
    urlPlaceholder: "https://maps.app.goo.gl/… o maps.google.com/…",
    urlHint: "Se resuelven enlaces cortos. Se detecta place_id o nombre del negocio.",
    generate: "Crear concepto",
    generating: "Places + IA generando… (~60–90 s)",
    disclaimer:
      "Datos de Google Places + Anthropic. Revisa antes del pitch. Límite: 5/h por IP.",
    errorGeneric: "Concepto fallido — revisa URL o API keys.",
    shareLabel: "Enlace live (listo para pitch)",
    editLink: "Editar en agente →",
    salesWhatsapp: "Hola Santi, quiero usar Maps Konzept para prospección.",
    bullets: [
      "Fotos reales de Google si existen — si no, imágenes IA",
      "URL slug /k/nombre para pitch por WhatsApp",
      "Guardado en Supabase como conceptos de auditoría",
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
          "Cómo se vería un centro comercial de Wien con horarios, tiendas y contacto claros en el móvil.",
      };
    }
    if (p.slug === "restaurant") {
      return {
        ...p,
        blurb:
          "Plantilla gastro: menú, horarios, mapa y reserva por WhatsApp en un flujo simple.",
      };
    }
    return p;
  }),
};
