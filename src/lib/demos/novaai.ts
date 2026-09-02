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
  services: ["/ AI AUTOMATION", "/ AI INTEGRATION", "/ AI AGENT DEVELOPMENT"],
  intro:
    "We design automation that brings clarity, precision, and efficiency to the way your company operates.",
  badge: "We Automate 100+ Businesses",
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
} as const;
