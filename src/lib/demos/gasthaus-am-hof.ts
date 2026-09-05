export const gasthausAssets = {
  video: "/demos/restaurant/hero.mp4",
  poster: "/demos/restaurant/hero-poster.jpg",
  end: "/demos/restaurant/hero-end.jpg",
  door: "/demos/restaurant/still-door.jpg",
  dining: "/demos/restaurant/still-dining.jpg",
  schnitzel: "/demos/restaurant/still-schnitzel.jpg",
} as const;

import { whatsappHref } from "@/lib/site";

export function gasthausReserveHref(): string {
  return whatsappHref(
    "Hallo! Ich möchte einen Tisch im Gasthaus Am Hof reservieren.",
  );
}

export const gasthausCopy = {
  title: "Gasthaus Am Hof — Demo",
  brand: "Gasthaus Am Hof",
  nav: [
    { label: "Speisekarte", href: "#speisekarte" },
    { label: "Haus", href: "#warum" },
    { label: "Zeiten", href: "#zeiten" },
    { label: "FAQ", href: "#faq" },
  ] as const,
  navCta: "Reservieren",
  bands: [
    {
      from: 0,
      to: 0.2,
      kicker: "Wien · Am Hof",
      title: "Gasthaus Am Hof",
      sub: null as string | null,
      cta: false,
    },
    {
      from: 0.2,
      to: 0.45,
      kicker: "Willkommen",
      title: "Wie daheim. Am Hof.",
      sub: null,
      cta: false,
    },
    {
      from: 0.45,
      to: 0.7,
      kicker: "Küche",
      title: "Wiener Küche. Holz. Kein Stress.",
      sub: null,
      cta: false,
    },
    {
      from: 0.7,
      to: 1.01,
      kicker: "Heute Abend",
      title: "Tisch reservieren.",
      sub: "Ein Achterl. Ein Schnitzel. Zeit ohne Hetze.",
      cta: true,
    },
  ],
  menuLead: {
    eyebrow: "Speisekarte",
    title: "Klassiker, wie sie sollen.",
    lead: "Kurze Karte. Faire Preise. Portionen, die satt machen.",
    tip: "Tipp: tippe ein Gericht an, um die kleine Notiz zu sehen.",
  },
  menu: [
    {
      section: "Vorspeisen",
      items: [
        {
          name: "Rindssuppe",
          price: "€5,90",
          note: "mit Frittaten, klar und würzig.",
        },
        {
          name: "Käseknödel",
          price: "€8,50",
          note: "auf Blattsalat, warm serviert.",
        },
      ],
    },
    {
      section: "Hauptgerichte",
      items: [
        {
          name: "Wiener Schnitzel",
          price: "€18,90",
          note: "vom Kalb, Erdäpfelsalat, Zitrone.",
        },
        {
          name: "Tafelspitz",
          price: "€21,50",
          note: "Apfelkren, Schnittlauchsauce.",
        },
        {
          name: "Gemüse-Strudel",
          price: "€14,90",
          note: "saisonales Gemüse, knusprig.",
        },
      ],
    },
    {
      section: "Süßes",
      items: [
        {
          name: "Apfelstrudel",
          price: "€6,50",
          note: "Vanillesauce.",
        },
        {
          name: "Sachertorte",
          price: "€7,20",
          note: "Schlagobers.",
        },
      ],
    },
  ],
  trust: {
    eyebrow: "Das Haus",
    title: "Drei Gründe, warum Gäste bleiben.",
    lead: "Nicht laut. Nicht touristisch. Einfach richtig.",
    items: [
      {
        num: "01",
        title: "Gemütlich",
        body: "Holz, Lampenlicht, Platz zum Reden. Wie daheim, nur mit besserem Schnitzel.",
      },
      {
        num: "02",
        title: "Hausgemacht",
        body: "Klassiker ohne Show. Suppe, Schnitzel, Strudel. So, wie Wiener sie erwarten.",
      },
      {
        num: "03",
        title: "Stammgäste",
        body: "Viele kommen wieder. Reservierung abends und am Wochenende ist klug.",
      },
    ],
  },
  hours: {
    eyebrow: "Öffnung & Lage",
    title: "Am Hof. Mitten in Wien.",
    lead: "Ruhig eintreten. Warm sitzen. Lange bleiben.",
    rows: [
      { days: "Di-Fr", time: "11.30-14.30 · 17.30-22.00" },
      { days: "Sa-So", time: "11.30-22.00" },
      { days: "Montag", time: "Ruhetag" },
    ],
    note: "Am Hof, 1010 Wien · U1/U3 Stephansplatz zu Fuß.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Kurze Antworten.",
    items: [
      {
        q: "Ist das ein Touristen-Trap?",
        a: "Nein. Kurze Karte, faire Preise, kein Druck. Stammgäste und Gäste aus der Stadt sitzen nebeneinander.",
      },
      {
        q: "Muss ich reservieren?",
        a: "Mittags oft spontan. Abends und am Wochenende lieber vorher. Sonst kann der Tisch weg sein.",
      },
      {
        q: "Gibt es vegetarisch?",
        a: "Ja. Unter anderem Gemüse-Strudel. Frag die Bedienung nach dem Tagesgericht.",
      },
      {
        q: "Wann ist Ruhetag?",
        a: "Montag. Di-So sind wir für dich da.",
      },
    ],
  },
  reserve: {
    eyebrow: "Reservieren",
    title: "Sag uns Tag und Uhrzeit.",
    lead: "Diese Demo speichert nichts. Du siehst nur eine Danke-Meldung. Für echten Kontakt nutze WhatsApp.",
    successTitle: "Danke.",
    successBody:
      "In dieser Demo geht die Anfrage nirgendwohin. Schreib uns per WhatsApp, wenn du einen echten Tisch willst.",
    submit: "Anfrage senden",
    waLabel: "per WhatsApp schreiben",
  },
  footer:
    "Konzept-Demo für das Portfolio von Santi Villa. Die Marke ist erfunden. Bilder und Film sind KI-generiert.",
} as const;
