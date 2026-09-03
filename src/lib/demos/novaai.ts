/** URLs exactas de la spec; los espejos locales cubren CloudFront caído. */
export const novaaiAssets = {
  video:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4",
  videoLocal: "/demos/novaai/hero.mp4",
  poster: "/demos/novaai/hero-poster.jpg",
  portrait:
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85",
  portraitLocal: "/demos/novaai/mitha.webp",
} as const;

export type NovaService = {
  index: string;
  title: string;
  lead: string;
  bullets: readonly string[];
};

export type NovaStep = {
  number: string;
  title: string;
  body: string;
};

export type NovaProject = {
  number: string;
  name: string;
  sector: string;
  result: string;
};

export type NovaPerson = {
  name: string;
  role: string;
  bio: string;
};

export type NovaPost = {
  date: string;
  title: string;
  excerpt: string;
};

export type NovaFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type NovaFooterCol = {
  title: string;
  links: readonly { label: string; href: string }[];
};

export const novaaiCopy = {
  brand: "novaai",
  title: "NOVA_AI — Today AI Aligns With Bold Dreams",
  nav: [
    { label: "Projects", href: "#projects", count: "6" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  navCta: "Get Free Consultation",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  serviceLines: [
    "/ AI AUTOMATION",
    "/ AI INTEGRATION",
    "/ AI AGENT DEVELOPMENT",
  ],
  intro:
    "We design automation that brings clarity, precision, and efficiency to the way your company operates.",
  badge: "Concept · AI for operations",
  h1: ["Clear. Precise.", "Automated."],
  talkTitle: "Talk with Mitha",
  talkRole: "Co-founder of NovaAI",
  talkCta: "Book 15-mins call",
  portraitAlt: "Mitha, co-founder of NovaAI",
  insightBadge: "Insight On Demand",
  insightIntro:
    "Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.",
  h2: ["Learn to see", "brilliantly."],
  body: "From the first sketch to the final render, Nova turns raw intent into decisions your team can act on — quietly, precisely, at speed.",
  demoCta: "Run the demo",
  consultCta: "Free consultation",
  capabilities: [
    {
      index: "01",
      title: "Real-time vision",
      body: "Reads context as it happens and surfaces what matters before you ask.",
    },
    {
      index: "02",
      title: "Layered insight",
      body: "Moves from rough outline to sharp output without losing the thread.",
    },
    {
      index: "03",
      title: "Adaptive speed",
      body: "Learns your cadence and tightens every pass as you work.",
    },
  ],
  offerings: {
    eyebrow: "What we build",
    title: "Three ways we put AI to work.",
    lead: "Not a chatbot bolted on. Systems that read your stack, act on your rules, and leave an audit trail your team can trust.",
    items: [
      {
        index: "01",
        title: "AI Automation",
        lead: "Replace the repetitive work that eats mornings — intake, triage, reporting, follow-ups.",
        bullets: [
          "Document and email pipelines that classify, extract, and route",
          "Exception queues with a human in the loop when confidence is low",
          "Dashboards that show what ran, what failed, and why",
        ],
      },
      {
        index: "02",
        title: "AI Integration",
        lead: "Wire models into the tools you already live in — CRM, ERP, helpdesk, data warehouse.",
        bullets: [
          "Secure connectors with least-privilege access",
          "Event-driven hooks so actions fire when reality changes",
          "Fallback paths when an API stalls or a model times out",
        ],
      },
      {
        index: "03",
        title: "AI Agent Development",
        lead: "Agents that plan multi-step work: research, draft, verify, then hand off cleanly.",
        bullets: [
          "Tool use with guardrails and spend caps",
          "Memory scoped to the project — not a black box",
          "Eval harnesses so quality does not drift after launch",
        ],
      },
    ] satisfies readonly NovaService[],
  },
  process: {
    eyebrow: "How we work",
    title: "A clear path from brief to production.",
    lead: "Four phases. You see a working slice early — not a deck that promises one.",
    steps: [
      {
        number: "01",
        title: "Discover",
        body: "We map the workflow, the data, and the risk. You get a one-page brief: scope, success metrics, and what we will not touch.",
      },
      {
        number: "02",
        title: "Prototype",
        body: "In days, not months: a thin slice on real samples. You click it. We measure precision before we scale.",
      },
      {
        number: "03",
        title: "Integrate",
        body: "Connectors, auth, logging, and the UI your team already opens. Rollout behind a flag until confidence is high.",
      },
      {
        number: "04",
        title: "Operate",
        body: "Monitoring, evals, and a monthly review. Models change; your process stays owned by you.",
      },
    ] satisfies readonly NovaStep[],
  },
  projects: {
    eyebrow: "Projects",
    title: "Six builds that shipped.",
    lead: "Fictional case notes for this concept — written as if the work were live. Sectors we typically serve.",
    items: [
      {
        number: "01",
        name: "Northline Ops",
        sector: "Operations",
        result: "Cut ticket triage from 14 minutes to under 90 seconds with a supervised classifier.",
      },
      {
        number: "02",
        name: "Atrium Retail",
        sector: "Retail",
        result: "Autofill product copy and size charts across 12k SKUs — editors keep final say.",
      },
      {
        number: "03",
        name: "Ledger & Co",
        sector: "Fintech",
        result: "KYC document extraction with dual review when confidence drops below 0.92.",
      },
      {
        number: "04",
        name: "ClinicFlow",
        sector: "Health",
        result: "Intake forms summarized for clinicians before the visit — PHI stays in-region.",
      },
      {
        number: "05",
        name: "Harbor Route",
        sector: "Logistics",
        result: "Delay predictions fed into the dispatcher board; false alarms down 38%.",
      },
      {
        number: "06",
        name: "Signal Desk",
        sector: "Media",
        result: "Newsroom research agent that cites sources and refuses when the trail goes cold.",
      },
    ] satisfies readonly NovaProject[],
  },
  about: {
    eyebrow: "About",
    title: "A small studio. Serious systems.",
    lead: "NovaAI is a concept studio brand for this portfolio demo — the story below is how a real AI product team would present itself.",
    studio:
      "We sit between product and engineering: enough design to make tools usable, enough rigor to ship into production. Based remote-first, with clients across EU time zones.",
    people: [
      {
        name: "Mitha Rao",
        role: "Co-founder",
        bio: "Product and research. Owns discovery, evals, and the call you book from this page.",
      },
      {
        name: "Jonas Keller",
        role: "Systems lead",
        bio: "Integrations, observability, and the boring reliability work that keeps agents honest.",
      },
      {
        name: "Elena Vu",
        role: "Applied ML",
        bio: "Model selection, prompt and tool design, and the harness that catches drift.",
      },
    ] satisfies readonly NovaPerson[],
  },
  blog: {
    eyebrow: "Blog",
    title: "Notes from the desk.",
    lead: "Short posts — part of the concept, not a live feed.",
    items: [
      {
        date: "12 Aug 2026",
        title: "Why we put a human on every low-confidence path",
        excerpt:
          "Automation without an exception queue is just a faster way to ship mistakes. Here is how we design the handoff.",
      },
      {
        date: "3 Jul 2026",
        title: "Evals before polish",
        excerpt:
          "A pretty demo dies in week two. We freeze a golden set before we touch the UI chrome.",
      },
      {
        date: "19 May 2026",
        title: "Agents that know when to stop",
        excerpt:
          "Spend caps, step limits, and a refuse mode — the three brakes we never ship without.",
      },
    ] satisfies readonly NovaPost[],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Straight answers.",
    lead: "If yours is missing, the contact block goes to Santi — this is a portfolio concept, not a support desk.",
    items: [
      {
        id: "scope",
        question: "What is in scope for a first engagement?",
        answer:
          "One workflow end to end: discover, prototype on your samples, integrate behind a flag, and a 30-day operate window. Extra workflows are a separate brief.",
      },
      {
        id: "timeline",
        question: "How long until we see something real?",
        answer:
          "A clickable prototype on sample data in 1–2 weeks for most intake or triage problems. Full integration depends on your APIs and access reviews.",
      },
      {
        id: "data",
        question: "Where does our data live?",
        answer:
          "In your cloud or an EU region you choose. We prefer least-privilege service accounts. Training on your private data is opt-in and written into the brief.",
      },
      {
        id: "ownership",
        question: "Who owns the code and prompts?",
        answer:
          "You do. Repos, prompts, eval sets, and runbooks transfer on delivery. We keep no hostage licenses.",
      },
      {
        id: "price",
        question: "What does it cost?",
        answer:
          "Concept pricing for this demo: discovery from €4k, a production slice typically €12–40k depending on connectors and compliance. Monthly operate retainers start around €2.5k.",
      },
      {
        id: "not",
        question: "What do you not do?",
        answer:
          "We do not sell a generic chatbot theme, scrape the open web into your CRM without consent, or promise “fully autonomous” agents with no oversight.",
      },
    ] satisfies readonly NovaFaqItem[],
  },
  contact: {
    eyebrow: "Contact",
    title: "Book 15 minutes with Mitha.",
    lead: "Tell us the workflow that hurts. We will say if NovaAI is the right fit — or if you should wait.",
    primary: "Book 15-mins call",
    secondary: "Get Free Consultation",
    note: "Concept demo for the Santi Villa portfolio — NovaAI is not a real company. The call links here for storytelling only.",
  },
  footer: {
    tagline: "Automation with clarity — a cinematic SaaS concept.",
    conceptNote:
      "Concept demo for the Santi Villa portfolio — NovaAI is not a real product.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Services", href: "#services" },
          { label: "Projects", href: "#projects" },
          { label: "Process", href: "#process" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "FAQ", href: "#faq" },
          { label: "Santi Villa", href: "/trabajos" },
        ],
      },
    ] satisfies readonly NovaFooterCol[],
  },
} as const;
