export const kellerlichtAssets = {
  video: "/demos/kellerlicht/hero.mp4",
  poster: "/demos/kellerlicht/hero-poster.jpg",
  end: "/demos/kellerlicht/hero-end.jpg",
  bar: "/demos/kellerlicht/still-bar.jpg",
  board: "/demos/kellerlicht/still-board.jpg",
  vault: "/demos/kellerlicht/still-vault.jpg",
} as const;

import { whatsappHref } from "@/lib/site";

export function kellerlichtReserveHref(): string {
  return whatsappHref(
    "Hallo! Ich möchte einen Tisch im Kellerlicht reservieren.",
  );
}

export const kellerlichtCopy = {
  title: "Kellerlicht - Demo",
  brand: "Kellerlicht",
  nav: [
    { label: "Am Glas", href: "#am-glas" },
    { label: "Haus", href: "#warum" },
    { label: "Zeiten", href: "#zeiten" },
    { label: "FAQ", href: "#faq" },
  ] as const,
  navCta: "Tisch sichern",
  bands: [
    {
      from: 0,
      to: 0.2,
      kicker: "Wien · Seilergasse",
      title: "Kellerlicht",
      sub: null as string | null,
      cta: false,
    },
    {
      from: 0.2,
      to: 0.45,
      kicker: "Willkommen",
      title: "Ein Achterl. Kein Stress.",
      sub: null,
      cta: false,
    },
    {
      from: 0.45,
      to: 0.7,
      kicker: "Wein",
      title: "Österreich am Glas. Beratung ohne Nase rümpfen.",
      sub: null,
      cta: false,
    },
    {
      from: 0.7,
      to: 1.01,
      kicker: "Heute Abend",
      title: "Tisch sichern.",
      sub: "Ein Achterl. Ein Brett. Zeit ohne Hetze.",
      cta: true,
    },
  ],
  menuLead: {
    eyebrow: "Am Glas",
    title: "Österreich, offen und klar.",
    lead: "Kurze Liste. Faire Gläser. Brett dazu, wenn du magst.",
    tip: "Tipp: tippe einen Wein an, um die kleine Notiz zu sehen.",
  },
  menu: [
    {
      section: "Weiß",
      items: [
        {
          name: "Grüner Veltliner",
          price: "€5,90",
          note: "Wachau, knackig, mit Pfeffer.",
        },
        {
          name: "Riesling",
          price: "€6,50",
          note: "Kamptal, mineralisch und klar.",
        },
        {
          name: "Weißburgunder",
          price: "€6,20",
          note: "Leithaberg, weich und rund.",
        },
      ],
    },
    {
      section: "Rot",
      items: [
        {
          name: "Blaufränkisch",
          price: "€6,80",
          note: "Burgenland, dunkel und würzig.",
        },
        {
          name: "Zweigelt",
          price: "€5,90",
          note: "Carnuntum, fruchtig, leicht gekühlt.",
        },
        {
          name: "St. Laurent",
          price: "€7,20",
          note: "Thermenregion, samtig und still.",
        },
      ],
    },
    {
      section: "Brett & mehr",
      items: [
        {
          name: "Brettl klassisch",
          price: "€14,90",
          note: "Schinken, Käse, Senf, Brot.",
        },
        {
          name: "Nüsse & Oliven",
          price: "€6,50",
          note: "Zum ersten Glas.",
        },
      ],
    },
  ],
  trust: {
    eyebrow: "Das Haus",
    title: "Drei Gründe, warum Gäste bleiben.",
    lead: "Nicht laut. Nicht snobistisch. Einfach gut beraten.",
    items: [
      {
        num: "01",
        title: "Kellerstimmung",
        body: "Stein, Kerzenlicht, Platz zum Reden. Wien unten, ohne Hetze.",
      },
      {
        num: "02",
        title: "Am Glas",
        body: "Österreichische Weine, offen und ehrlich. Kein Nase rümpfen.",
      },
      {
        num: "03",
        title: "Stammgäste",
        body: "Viele kommen wieder. Abends und am Wochenende lieber vorher sichern.",
      },
    ],
  },
  hours: {
    eyebrow: "Öffnung & Lage",
    title: "Seilergasse. Mitten in Wien.",
    lead: "Ruhig eintreten. Warm sitzen. Lange bleiben.",
    rows: [
      { days: "Di-Do", time: "16.00-23.00" },
      { days: "Fr-Sa", time: "16.00-01.00" },
      { days: "So-Mo", time: "Ruhetag" },
    ],
    note: "Seilergasse, 1010 Wien · U1/U3 Stephansplatz zu Fuß.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Kurze Antworten.",
    items: [
      {
        q: "Ist das ein Wein-Snob-Laden?",
        a: "Nein. Klare Gläser, faire Preise, Beratung ohne Druck. Stammgäste und Neulinge sitzen nebeneinander.",
      },
      {
        q: "Muss ich reservieren?",
        a: "Unter der Woche oft spontan. Freitag und Samstag abends lieber vorher. Sonst kann der Tisch weg sein.",
      },
      {
        q: "Gibt es etwas zum Essen?",
        a: "Ja. Brettl, Nüsse, Oliven. Keine volle Küche, aber genug zum Bleiben.",
      },
      {
        q: "Wann ist Ruhetag?",
        a: "Sonntag und Montag. Di-Sa sind wir für dich da.",
      },
    ],
  },
  reserve: {
    eyebrow: "Tisch sichern",
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
