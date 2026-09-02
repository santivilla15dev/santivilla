import type { Locale } from "@/lib/i18n/locales";

/** Assets autoalojados (el mp4 original de CloudFront era temporal). */
export const vaultshieldAssets = {
  video: "/demos/vaultshield/hero.mp4",
  poster: "/demos/vaultshield/hero-poster.webp",
  vault: "/demos/vaultshield/vault.webp",
  shield: "/demos/vaultshield/shield.webp",
  devices: "/demos/vaultshield/devices.webp",
} as const;

export const vaultshieldTheme = {
  text: "#192837",
  accent: "#7342E2",
  loginBg: "#F2F2EE",
  sheetBg: "#CFC8C5",
} as const;

export type VaultshieldNavLink = { label: string; href: string };

export type VaultshieldMetric = { value: string; label: string };

export type VaultshieldCard = { title: string; body: string };

export type VaultshieldStep = { number: string; title: string; body: string };

export type VaultshieldPlan = {
  id: "free" | "premium" | "family" | "business";
  name: string;
  monthly: string;
  yearly: string;
  periodMonthly: string;
  periodYearly: string;
  popular?: boolean;
  includes: string[];
};

export type VaultshieldTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type VaultshieldNewsItem = {
  date: string;
  title: string;
  body: string;
};

export type VaultshieldFaqItem = { id: string; question: string; answer: string };

export type VaultshieldFooterCol = { title: string; links: { label: string; href: string }[] };

export type VaultshieldContent = {
  locale: Locale;
  langLabel: string;
  brand: string;
  nav: {
    links: VaultshieldNavLink[];
    start: string;
    signIn: string;
    menuOpen: string;
    menuClose: string;
  };
  heading: [string, string];
  subtext: string;
  cta: string;
  conceptNote: string;
  trust: {
    rating: string;
    ratingLabel: string;
    metrics: VaultshieldMetric[];
  };
  features: {
    eyebrow: string;
    title: string;
    lead: string;
    items: VaultshieldCard[];
    imageAlt: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: VaultshieldStep[];
  };
  checker: {
    eyebrow: string;
    title: string;
    lead: string;
    placeholder: string;
    show: string;
    hide: string;
    privacy: string;
    empty: string;
    entropy: string;
    crackTime: string;
    levels: [string, string, string, string];
    tipsTitle: string;
  };
  security: {
    eyebrow: string;
    title: string;
    lead: string;
    items: VaultshieldCard[];
    imageAlt: string;
  };
  plans: {
    eyebrow: string;
    title: string;
    lead: string;
    monthly: string;
    yearly: string;
    yearlyHint: string;
    popular: string;
    cta: string;
    items: VaultshieldPlan[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    lead: string;
    items: VaultshieldTestimonial[];
  };
  install: {
    eyebrow: string;
    title: string;
    lead: string;
    platformsLabel: string;
    browsersLabel: string;
    platforms: string[];
    browsers: string[];
    imageAlt: string;
  };
  news: {
    eyebrow: string;
    title: string;
    lead: string;
    items: VaultshieldNewsItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    items: VaultshieldFaqItem[];
  };
  finalCta: {
    title: string;
    lead: string;
    button: string;
  };
  footer: {
    tagline: string;
    columns: VaultshieldFooterCol[];
    legalImpressum: string;
    legalPrivacy: string;
    legalTerms: string;
  };
};

const NAV_HREFS = ["#vault", "#plans", "#install", "#news", "#help"] as const;

function nav(labels: [string, string, string, string, string]): VaultshieldNavLink[] {
  return labels.map((label, i) => ({ label, href: NAV_HREFS[i] }));
}

const CONTENT: Record<Locale, VaultshieldContent> = {
  en: {
    locale: "en",
    langLabel: "Language",
    brand: "VaultShield",
    nav: {
      links: nav(["Vault", "Plans", "Install", "News", "Help"]),
      start: "Start For Free",
      signIn: "Sign In",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    heading: ["Lock Down Your Passwords", "with Ironclad Security"],
    subtext:
      "Zero stress, total control. VaultShield keeps you covered with unbreakable storage, one-tap access, and pro-grade tools for your non-stop world.",
    cta: "Get It Free",
    conceptNote:
      "Concept demo for the Santi Villa portfolio — VaultShield is not a real product.",
    trust: {
      rating: "4.9 / 5",
      ratingLabel: "from 12,400 reviews",
      metrics: [
        { value: "2.1M+", label: "vaults created" },
        { value: "99.99%", label: "uptime last year" },
        { value: "0", label: "known breaches" },
        { value: "< 80 ms", label: "median unlock" },
      ],
    },
    features: {
      eyebrow: "Vault",
      title: "One vault. Every login.",
      lead: "Store passwords, passkeys, cards and notes. Autofill on the site you open — desktop, phone or tablet.",
      items: [
        {
          title: "Unbreakable storage",
          body: "Every item is encrypted on your device before it leaves. We never see the plaintext.",
        },
        {
          title: "One-tap autofill",
          body: "The browser extension and mobile apps fill username, password and 2FA in a single tap.",
        },
        {
          title: "Passkeys included",
          body: "Create and sync FIDO2 passkeys. Sites that support them skip the password entirely.",
        },
        {
          title: "Breach watch",
          body: "We hash your emails and check public dumps. If a login is exposed, you get a quiet alert.",
        },
        {
          title: "Shared vaults",
          body: "Hand a wifi password or a team login to someone — revoke it the same afternoon.",
        },
        {
          title: "Offline unlock",
          body: "Your vault lives on the device. No signal? You still get in with the master password.",
        },
      ],
      imageAlt: "Open vault with iridescent access tokens on a beige studio surface",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Three steps. Then you forget about it.",
      lead: "No import wizard that lasts an hour. Most people finish before the coffee cools.",
      steps: [
        {
          number: "01",
          title: "Create a master password",
          body: "Twelve words or a long phrase. We never store it. If you lose it, we cannot reset it — that is the point.",
        },
        {
          number: "02",
          title: "Move your logins",
          body: "Import from Chrome, Safari, 1Password or a CSV. Duplicates collapse. Weak ones get a flag.",
        },
        {
          number: "03",
          title: "Install and go",
          body: "Extension on the laptop, app on the phone. New accounts are generated and saved as you sign up.",
        },
      ],
    },
    checker: {
      eyebrow: "Try it",
      title: "How long would this password last?",
      lead: "Type anything. Strength, entropy and crack-time are estimated in your browser — nothing is sent.",
      placeholder: "Type a password to test",
      show: "Show",
      hide: "Hide",
      privacy: "Nothing leaves this page. The check runs only on your device.",
      empty: "Start typing to see a score.",
      entropy: "Estimated entropy",
      crackTime: "Time to crack (offline, 10¹¹ guesses/s)",
      levels: ["Very weak", "Weak", "Fair", "Strong"],
      tipsTitle: "Ways to harden it",
    },
    security: {
      eyebrow: "Security",
      title: "Designed so we cannot read you.",
      lead: "Zero-knowledge is not a slogan here: the server only ever holds ciphertext. Unlock happens on the device.",
      items: [
        {
          title: "AES-256-GCM",
          body: "Each vault item uses its own key. Tampering a single byte makes the record unreadable.",
        },
        {
          title: "Argon2id",
          body: "Your master password is stretched with a memory-hard KDF before any key is derived.",
        },
        {
          title: "Zero-knowledge",
          body: "Support can reset billing, never your vault. We have no recovery backdoor.",
        },
        {
          title: "2FA / FIDO2",
          body: "Unlock with a hardware key or a platform passkey. SMS codes are optional, not required.",
        },
      ],
      imageAlt: "Glass lock on a matte white shield, purple studio lighting",
    },
    plans: {
      eyebrow: "Plans",
      title: "Start free. Upgrade when the vault fills up.",
      lead: "Prices in euros, billed from the EU. Cancel any month. No per-device tax.",
      monthly: "Monthly",
      yearly: "Yearly",
      yearlyHint: "2 months on us",
      popular: "Most popular",
      cta: "Choose this plan",
      items: [
        {
          id: "free",
          name: "Free",
          monthly: "€0",
          yearly: "€0",
          periodMonthly: "forever",
          periodYearly: "forever",
          includes: [
            "Unlimited passwords",
            "1 device type at a time",
            "Passkeys on this device",
            "Breach watch (weekly)",
          ],
        },
        {
          id: "premium",
          name: "Premium",
          monthly: "€2.99",
          yearly: "€29.99",
          periodMonthly: "/ month",
          periodYearly: "/ year",
          popular: true,
          includes: [
            "Unlimited devices",
            "Passkeys + 2FA codes",
            "Secure notes and cards",
            "Priority breach alerts",
            "1 shared vault",
          ],
        },
        {
          id: "family",
          name: "Family",
          monthly: "€4.99",
          yearly: "€49.99",
          periodMonthly: "/ month",
          periodYearly: "/ year",
          includes: [
            "Up to 6 people",
            "Each person has a private vault",
            "A shared household vault",
            "Everything in Premium",
          ],
        },
        {
          id: "business",
          name: "Business",
          monthly: "€6.99",
          yearly: "€69.99",
          periodMonthly: "/ user / month",
          periodYearly: "/ user / year",
          includes: [
            "SSO (OIDC)",
            "Admin console + audit log",
            "Shared team vaults",
            "SCIM provisioning",
          ],
        },
      ],
    },
    testimonials: {
      eyebrow: "Reviews",
      title: "People who stopped writing passwords in Notes.",
      lead: "Fictional quotes for this concept — written as if the product shipped.",
      items: [
        {
          quote:
            "I moved 340 logins on a Sunday. Autofill on the phone is the first thing that actually works in Safari.",
          name: "Mara K.",
          role: "Freelance designer, Wien",
        },
        {
          quote:
            "We gave the café wifi to staff through a shared vault. When someone left, I revoked it in ten seconds.",
          name: "Jonas V.",
          role: "Owner, small restaurant",
        },
        {
          quote:
            "The master password is long and I like that they cannot reset it. Feels like the opposite of every other app.",
          name: "Elena R.",
          role: "Systems admin",
        },
      ],
    },
    install: {
      eyebrow: "Install",
      title: "On the devices you already use.",
      lead: "Same vault, same master password. Unlock once; the rest stays in sync.",
      platformsLabel: "Apps",
      browsersLabel: "Browsers",
      platforms: ["iOS 16+", "Android 12+", "macOS 13+", "Windows 11", "Linux (deb / AppImage)"],
      browsers: ["Chrome", "Safari", "Firefox", "Edge"],
      imageAlt: "Phone, laptop and watch on a beige desk with the VaultShield mark",
    },
    news: {
      eyebrow: "News",
      title: "What shipped recently.",
      lead: "A short changelog. Dates are part of the concept, not a live feed.",
      items: [
        {
          date: "18 Aug 2026",
          title: "Passkeys in the family vault",
          body: "Shared passkeys now sync to every member who has the vault open. Revoke still works instantly.",
        },
        {
          date: "2 Jul 2026",
          title: "Linux desktop, first stable",
          body: "deb and AppImage with the same autofill protocol as macOS. Wayland sessions included.",
        },
        {
          date: "14 May 2026",
          title: "Offline unlock under 80 ms",
          body: "We rewrote the local key cache. Median unlock on a 2022 phone dropped from 210 ms to 74 ms.",
        },
      ],
    },
    faq: {
      eyebrow: "Help",
      title: "Questions we hear first.",
      lead: "Straight answers. If yours is missing, the contact on this demo goes to Santi — not a support desk.",
      items: [
        {
          id: "lost",
          question: "What if I forget the master password?",
          answer:
            "We cannot reset it. That is how zero-knowledge works. Write the recovery kit on paper the first day and store it offline.",
        },
        {
          id: "free",
          question: "Is the free plan actually usable?",
          answer:
            "Yes for one device type. Unlimited logins, passkeys on that device, weekly breach check. You pay when you want the phone and the laptop at once.",
        },
        {
          id: "import",
          question: "Can I import from another manager?",
          answer:
            "Chrome, Safari, Edge, Firefox, 1Password, Bitwarden and a generic CSV. We delete the upload from our servers after the import job finishes.",
        },
        {
          id: "family",
          question: "Do family members see my logins?",
          answer:
            "No. Each person has a private vault. Only items you drop in the household vault are shared.",
        },
        {
          id: "offline",
          question: "Does it work on a plane?",
          answer:
            "Yes. The vault is local. Sync waits until you have a network. Autofill does not need one.",
        },
        {
          id: "business",
          question: "Is there an admin kill-switch?",
          answer:
            "Business plans can revoke a seat and rotate shared vaults. Private employee vaults stay private unless you used a company-owned account.",
        },
        {
          id: "audit",
          question: "Has anyone audited the crypto?",
          answer:
            "In this concept: a public report would sit here (scope, date, firm). On a real product that PDF would be downloadable.",
        },
        {
          id: "gdpr",
          question: "Where is data stored?",
          answer:
            "Ciphertext in EU regions (Frankfurt). Billing data is separate. You can export or delete the account from Settings.",
        },
      ],
    },
    finalCta: {
      title: "Lock the vault. Then ignore it.",
      lead: "Free plan, no card. Upgrade later if the second device starts to matter.",
      button: "Get It Free",
    },
    footer: {
      tagline: "A password manager concept — built as a portfolio demo.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Vault", href: "#vault" },
            { label: "Plans", href: "#plans" },
            { label: "Install", href: "#install" },
            { label: "Security", href: "#security" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "News", href: "#news" },
            { label: "Help", href: "#help" },
            { label: "Santi Villa", href: "/en" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Strength checker", href: "#checker" },
            { label: "How it works", href: "#how" },
          ],
        },
      ],
      legalImpressum: "Impressum",
      legalPrivacy: "Privacy",
      legalTerms: "Terms",
    },
  },
  de: {
    locale: "de",
    langLabel: "Sprache",
    brand: "VaultShield",
    nav: {
      links: nav(["Tresor", "Tarife", "Installieren", "News", "Hilfe"]),
      start: "Kostenlos starten",
      signIn: "Anmelden",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
    },
    heading: ["Sichere deine Passwörter", "mit eiserner Verschlüsselung"],
    subtext:
      "Kein Stress, volle Kontrolle. VaultShield schützt dich mit unknackbarem Speicher, Zugriff mit einem Tipp und Profi-Tools für deinen Alltag ohne Pause.",
    cta: "Gratis holen",
    conceptNote:
      "Konzept-Demo für das Portfolio von Santi Villa — VaultShield ist kein echtes Produkt.",
    trust: {
      rating: "4,9 / 5",
      ratingLabel: "aus 12.400 Bewertungen",
      metrics: [
        { value: "2,1 Mio.+", label: "Tresore angelegt" },
        { value: "99,99 %", label: "Verfügbarkeit letztes Jahr" },
        { value: "0", label: "bekannte Leaks" },
        { value: "< 80 ms", label: "Median-Entsperrung" },
      ],
    },
    features: {
      eyebrow: "Tresor",
      title: "Ein Tresor. Jeder Login.",
      lead: "Passwörter, Passkeys, Karten und Notizen. Autofill auf der Seite, die du öffnest — Desktop, Handy oder Tablet.",
      items: [
        {
          title: "Unknackbarer Speicher",
          body: "Jedes Item wird auf dem Gerät verschlüsselt, bevor es das Haus verlässt. Klartext sehen wir nie.",
        },
        {
          title: "Autofill mit einem Tipp",
          body: "Erweiterung und Apps füllen Name, Passwort und 2FA in einem Tipp.",
        },
        {
          title: "Passkeys inklusive",
          body: "FIDO2-Passkeys anlegen und synchronisieren. Seiten ohne Passwort, wenn sie es können.",
        },
        {
          title: "Leak-Wächter",
          body: "Wir hashen deine E-Mails und prüfen öffentliche Dumps. Bei einem Treffer kommt ein stiller Hinweis.",
        },
        {
          title: "Geteilte Tresore",
          body: "WLAN oder ein Team-Login weitergeben — und am selben Nachmittag wieder entziehen.",
        },
        {
          title: "Offline entsperren",
          body: "Der Tresor liegt auf dem Gerät. Kein Netz? Das Master-Passwort reicht trotzdem.",
        },
      ],
      imageAlt: "Offener Tresor mit irisierenden Zugangsmarken auf beiger Studiofläche",
    },
    howItWorks: {
      eyebrow: "So geht's",
      title: "Drei Schritte. Dann vergisst du es.",
      lead: "Kein Import-Wizard, der eine Stunde dauert. Die meisten sind fertig, bevor der Kaffee kalt ist.",
      steps: [
        {
          number: "01",
          title: "Master-Passwort anlegen",
          body: "Zwölf Wörter oder ein langer Satz. Wir speichern es nicht. Wer es verliert, kann es bei uns nicht zurücksetzen — genau das ist der Punkt.",
        },
        {
          number: "02",
          title: "Logins holen",
          body: "Import aus Chrome, Safari, 1Password oder CSV. Duplikate fallen zusammen. Schwache werden markiert.",
        },
        {
          number: "03",
          title: "Installieren und weiter",
          body: "Erweiterung am Laptop, App am Handy. Neue Konten werden beim Registrieren erzeugt und gespeichert.",
        },
      ],
    },
    checker: {
      eyebrow: "Ausprobieren",
      title: "Wie lange hält dieses Passwort?",
      lead: "Tippe irgendetwas. Stärke, Entropie und Knackzeit bleiben im Browser — es geht nichts raus.",
      placeholder: "Passwort zum Testen eingeben",
      show: "Zeigen",
      hide: "Verbergen",
      privacy: "Nichts verlässt diese Seite. Die Prüfung läuft nur auf deinem Gerät.",
      empty: "Tippe, um eine Bewertung zu sehen.",
      entropy: "Geschätzte Entropie",
      crackTime: "Knackzeit (offline, 10¹¹ Versuche/s)",
      levels: ["Sehr schwach", "Schwach", "Mittel", "Stark"],
      tipsTitle: "So wird es härter",
    },
    security: {
      eyebrow: "Sicherheit",
      title: "Gebaut, damit wir dich nicht lesen können.",
      lead: "Zero-Knowledge ist hier kein Spruch: der Server hält nur Ciphertext. Entsperrt wird auf dem Gerät.",
      items: [
        {
          title: "AES-256-GCM",
          body: "Jedes Item hat einen eigenen Schlüssel. Ein geändertes Byte macht den Datensatz unlesbar.",
        },
        {
          title: "Argon2id",
          body: "Das Master-Passwort wird mit einem speicherharten KDF gestreckt, bevor ein Schlüssel entsteht.",
        },
        {
          title: "Zero-Knowledge",
          body: "Support kann die Rechnung zurücksetzen, nie den Tresor. Es gibt keine Hintertür.",
        },
        {
          title: "2FA / FIDO2",
          body: "Entsperren mit Hardware-Key oder Geräte-Passkey. SMS ist optional, nie Pflicht.",
        },
      ],
      imageAlt: "Glasschloss auf mattem weißem Schild, violettes Studioloicht",
    },
    plans: {
      eyebrow: "Tarife",
      title: "Kostenlos starten. Wechseln, wenn der Tresor voll wird.",
      lead: "Preise in Euro, Abrechnung in der EU. Jeden Monat kündbar. Keine Geräte-Steuer.",
      monthly: "Monatlich",
      yearly: "Jährlich",
      yearlyHint: "2 Monate geschenkt",
      popular: "Am beliebtesten",
      cta: "Diesen Tarif wählen",
      items: [
        {
          id: "free",
          name: "Free",
          monthly: "€0",
          yearly: "€0",
          periodMonthly: "dauerhaft",
          periodYearly: "dauerhaft",
          includes: [
            "Unbegrenzte Passwörter",
            "1 Gerätetyp gleichzeitig",
            "Passkeys auf diesem Gerät",
            "Leak-Check (wöchentlich)",
          ],
        },
        {
          id: "premium",
          name: "Premium",
          monthly: "€2,99",
          yearly: "€29,99",
          periodMonthly: "/ Monat",
          periodYearly: "/ Jahr",
          popular: true,
          includes: [
            "Unbegrenzte Geräte",
            "Passkeys + 2FA-Codes",
            "Notizen und Karten",
            "Sofort-Alerts bei Leaks",
            "1 geteilter Tresor",
          ],
        },
        {
          id: "family",
          name: "Familie",
          monthly: "€4,99",
          yearly: "€49,99",
          periodMonthly: "/ Monat",
          periodYearly: "/ Jahr",
          includes: [
            "Bis zu 6 Personen",
            "Jede Person hat einen privaten Tresor",
            "Ein Haushaltstresor",
            "Alles aus Premium",
          ],
        },
        {
          id: "business",
          name: "Business",
          monthly: "€6,99",
          yearly: "€69,99",
          periodMonthly: "/ Nutzer / Monat",
          periodYearly: "/ Nutzer / Jahr",
          includes: [
            "SSO (OIDC)",
            "Admin-Konsole + Audit-Log",
            "Geteilte Team-Tresore",
            "SCIM-Provisioning",
          ],
        },
      ],
    },
    testimonials: {
      eyebrow: "Stimmen",
      title: "Leute, die keine Passwörter mehr in Notizen schreiben.",
      lead: "Fiktive Zitate für dieses Konzept — so, als wäre das Produkt live.",
      items: [
        {
          quote:
            "340 Logins an einem Sonntag umgezogen. Autofill am Handy ist das Erste, das in Safari wirklich klappt.",
          name: "Mara K.",
          role: "Freie Designerin, Wien",
        },
        {
          quote:
            "WLAN der Beiz über einen geteilten Tresor. Als jemand gegangen ist, war der Zugang in zehn Sekunden weg.",
          name: "Jonas V.",
          role: "Wirt, kleines Lokal",
        },
        {
          quote:
            "Das Master-Passwort ist lang und ich mag, dass sie es nicht zurücksetzen können. Das Gegenteil von jeder anderen App.",
          name: "Elena R.",
          role: "Systemadmin",
        },
      ],
    },
    install: {
      eyebrow: "Installieren",
      title: "Auf den Geräten, die du schon hast.",
      lead: "Gleicher Tresor, gleiches Master-Passwort. Einmal entsperren; der Rest bleibt synchron.",
      platformsLabel: "Apps",
      browsersLabel: "Browser",
      platforms: ["iOS 16+", "Android 12+", "macOS 13+", "Windows 11", "Linux (deb / AppImage)"],
      browsers: ["Chrome", "Safari", "Firefox", "Edge"],
      imageAlt: "Handy, Laptop und Uhr auf beigem Tisch mit VaultShield-Zeichen",
    },
    news: {
      eyebrow: "News",
      title: "Was zuletzt rauskam.",
      lead: "Kurzes Changelog. Die Daten gehören zum Konzept, es ist kein Live-Feed.",
      items: [
        {
          date: "18. Aug 2026",
          title: "Passkeys im Familientresor",
          body: "Geteilte Passkeys kommen bei jedem Mitglied an, das den Tresor offen hat. Entzug wirkt sofort.",
        },
        {
          date: "2. Jul 2026",
          title: "Linux-Desktop, erste stabile",
          body: "deb und AppImage mit demselben Autofill-Protokoll wie macOS. Wayland inklusive.",
        },
        {
          date: "14. Mai 2026",
          title: "Offline-Unlock unter 80 ms",
          body: "Lokaler Key-Cache neu geschrieben. Median auf einem Handy von 2022: 210 ms auf 74 ms.",
        },
      ],
    },
    faq: {
      eyebrow: "Hilfe",
      title: "Fragen, die zuerst kommen.",
      lead: "Klare Antworten. Fehlt deine, geht der Kontakt dieser Demo an Santi — nicht an einen Support-Schalter.",
      items: [
        {
          id: "lost",
          question: "Was, wenn ich das Master-Passwort vergesse?",
          answer:
            "Wir können es nicht zurücksetzen. So funktioniert Zero-Knowledge. Schreib das Recovery-Kit am ersten Tag auf Papier und lege es offline weg.",
        },
        {
          id: "free",
          question: "Ist der Free-Tarif wirklich nutzbar?",
          answer:
            "Ja, für einen Gerätetyp. Unbegrenzte Logins, Passkeys auf dem Gerät, wöchentlicher Leak-Check. Du zahlst, wenn Handy und Laptop gleichzeitig sollen.",
        },
        {
          id: "import",
          question: "Kann ich aus einem anderen Manager importieren?",
          answer:
            "Chrome, Safari, Edge, Firefox, 1Password, Bitwarden und ein generisches CSV. Der Upload wird nach dem Job von unseren Servern gelöscht.",
        },
        {
          id: "family",
          question: "Sehen Familienmitglieder meine Logins?",
          answer:
            "Nein. Jede Person hat einen privaten Tresor. Geteilt wird nur, was du in den Haushaltstresor legst.",
        },
        {
          id: "offline",
          question: "Geht das im Flugzeug?",
          answer:
            "Ja. Der Tresor ist lokal. Sync wartet auf Netz. Autofill braucht keines.",
        },
        {
          id: "business",
          question: "Gibt es einen Admin-Kill-Switch?",
          answer:
            "Business kann Sitze entziehen und geteilte Tresore rotieren. Private Tresore bleiben privat, außer das Konto gehört der Firma.",
        },
        {
          id: "audit",
          question: "Wurde die Krypto geprüft?",
          answer:
            "In diesem Konzept stünde hier der Bericht (Scope, Datum, Firma). Beim echten Produkt wäre das PDF zum Download.",
        },
        {
          id: "gdpr",
          question: "Wo liegen die Daten?",
          answer:
            "Ciphertext in EU-Regionen (Frankfurt). Rechnungsdaten getrennt. Export und Löschung über die Einstellungen.",
        },
      ],
    },
    finalCta: {
      title: "Tresor zu. Dann ignorieren.",
      lead: "Free-Tarif, keine Karte. Später upgraden, wenn das zweite Gerät zählt.",
      button: "Gratis holen",
    },
    footer: {
      tagline: "Ein Passwort-Manager-Konzept — gebaut als Portfolio-Demo.",
      columns: [
        {
          title: "Produkt",
          links: [
            { label: "Tresor", href: "#vault" },
            { label: "Tarife", href: "#plans" },
            { label: "Installieren", href: "#install" },
            { label: "Sicherheit", href: "#security" },
          ],
        },
        {
          title: "Firma",
          links: [
            { label: "News", href: "#news" },
            { label: "Hilfe", href: "#help" },
            { label: "Santi Villa", href: "/de" },
          ],
        },
        {
          title: "Ressourcen",
          links: [
            { label: "Stärke-Check", href: "#checker" },
            { label: "So geht's", href: "#how" },
          ],
        },
      ],
      legalImpressum: "Impressum",
      legalPrivacy: "Datenschutz",
      legalTerms: "AGB",
    },
  },
  es: {
    locale: "es",
    langLabel: "Idioma",
    brand: "VaultShield",
    nav: {
      links: nav(["Bóveda", "Planes", "Instalar", "Novedades", "Ayuda"]),
      start: "Empieza gratis",
      signIn: "Iniciar sesión",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
    },
    heading: ["Blinda tus contraseñas", "con seguridad a prueba de todo"],
    subtext:
      "Cero estrés, control total. VaultShield te cubre con almacenamiento inquebrantable, acceso con un toque y herramientas profesionales para tu día a día sin pausa.",
    cta: "Consíguelo gratis",
    conceptNote:
      "Demo conceptual para el portfolio de Santi Villa — VaultShield no es un producto real.",
    trust: {
      rating: "4,9 / 5",
      ratingLabel: "en 12.400 reseñas",
      metrics: [
        { value: "2,1 M+", label: "bóvedas creadas" },
        { value: "99,99 %", label: "disponibilidad el último año" },
        { value: "0", label: "filtraciones conocidas" },
        { value: "< 80 ms", label: "desbloqueo mediano" },
      ],
    },
    features: {
      eyebrow: "Bóveda",
      title: "Una bóveda. Cada acceso.",
      lead: "Guarda contraseñas, passkeys, tarjetas y notas. Autocompleta en la web que abras — ordenador, móvil o tablet.",
      items: [
        {
          title: "Almacenamiento inquebrantable",
          body: "Cada ítem se cifra en tu dispositivo antes de salir. El texto en claro no lo vemos nunca.",
        },
        {
          title: "Autocompletar con un toque",
          body: "La extensión y las apps rellenan usuario, contraseña y 2FA de una vez.",
        },
        {
          title: "Passkeys incluidas",
          body: "Crea y sincroniza passkeys FIDO2. En sitios que las aceptan, la contraseña sobra.",
        },
        {
          title: "Vigilancia de filtraciones",
          body: "Hasheamos tu correo y cruzamos dumps públicos. Si un acceso sale, te avisamos en silencio.",
        },
        {
          title: "Bóvedas compartidas",
          body: "Pasa el wifi o un login de equipo. Lo retiras la misma tarde.",
        },
        {
          title: "Desbloqueo sin red",
          body: "La bóveda vive en el aparato. ¿Sin señal? Entras igual con la contraseña maestra.",
        },
      ],
      imageAlt: "Bóveda abierta con fichas iridiscentes sobre una mesa de estudio beige",
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos. Luego te olvidas.",
      lead: "Sin asistente de importación de una hora. La mayoría termina antes de que se enfríe el café.",
      steps: [
        {
          number: "01",
          title: "Crea la contraseña maestra",
          body: "Doce palabras o una frase larga. No la guardamos. Si la pierdes, no podemos resetearla — de eso se trata.",
        },
        {
          number: "02",
          title: "Trae tus accesos",
          body: "Importa desde Chrome, Safari, 1Password o un CSV. Los duplicados se juntan. Los débiles se marcan.",
        },
        {
          number: "03",
          title: "Instala y sigue",
          body: "Extensión en el portátil, app en el móvil. Las cuentas nuevas se generan y se guardan al registrarte.",
        },
      ],
    },
    checker: {
      eyebrow: "Pruébalo",
      title: "¿Cuánto aguantaría esta contraseña?",
      lead: "Escribe lo que quieras. La fuerza, la entropía y el tiempo de ataque se calculan en tu navegador — no se envía nada.",
      placeholder: "Escribe una contraseña para probar",
      show: "Mostrar",
      hide: "Ocultar",
      privacy: "Nada sale de esta página. El cálculo corre solo en tu dispositivo.",
      empty: "Empieza a escribir para ver una nota.",
      entropy: "Entropía estimada",
      crackTime: "Tiempo para romperla (offline, 10¹¹ intentos/s)",
      levels: ["Muy débil", "Débil", "Aceptable", "Fuerte"],
      tipsTitle: "Cómo endurecerla",
    },
    security: {
      eyebrow: "Seguridad",
      title: "Hecho para que no podamos leerte.",
      lead: "Zero-knowledge no es un eslogan: el servidor solo guarda cifrado. El desbloqueo ocurre en el dispositivo.",
      items: [
        {
          title: "AES-256-GCM",
          body: "Cada ítem tiene su propia clave. Si alguien cambia un byte, el registro queda ilegible.",
        },
        {
          title: "Argon2id",
          body: "La contraseña maestra se estira con un KDF que come memoria antes de derivar ninguna clave.",
        },
        {
          title: "Zero-knowledge",
          body: "Soporte puede tocar la factura, nunca la bóveda. No hay puerta trasera de recuperación.",
        },
        {
          title: "2FA / FIDO2",
          body: "Desbloquea con una llave física o un passkey del sistema. El SMS es opcional, no obligatorio.",
        },
      ],
      imageAlt: "Candado de cristal sobre un escudo blanco mate, luz violeta de estudio",
    },
    plans: {
      eyebrow: "Planes",
      title: "Empieza gratis. Sube cuando la bóveda se llene.",
      lead: "Precios en euros, cobro en la UE. Cancela cualquier mes. Sin recargo por aparato.",
      monthly: "Mensual",
      yearly: "Anual",
      yearlyHint: "2 meses de regalo",
      popular: "El más elegido",
      cta: "Elegir este plan",
      items: [
        {
          id: "free",
          name: "Gratis",
          monthly: "€0",
          yearly: "€0",
          periodMonthly: "para siempre",
          periodYearly: "para siempre",
          includes: [
            "Contraseñas ilimitadas",
            "1 tipo de dispositivo a la vez",
            "Passkeys en este aparato",
            "Filtraciones (semanal)",
          ],
        },
        {
          id: "premium",
          name: "Premium",
          monthly: "€2,99",
          yearly: "€29,99",
          periodMonthly: "/ mes",
          periodYearly: "/ año",
          popular: true,
          includes: [
            "Dispositivos ilimitados",
            "Passkeys + códigos 2FA",
            "Notas y tarjetas",
            "Alertas de filtración al momento",
            "1 bóveda compartida",
          ],
        },
        {
          id: "family",
          name: "Familia",
          monthly: "€4,99",
          yearly: "€49,99",
          periodMonthly: "/ mes",
          periodYearly: "/ año",
          includes: [
            "Hasta 6 personas",
            "Cada una con bóveda privada",
            "Una bóveda del hogar",
            "Todo lo de Premium",
          ],
        },
        {
          id: "business",
          name: "Business",
          monthly: "€6,99",
          yearly: "€69,99",
          periodMonthly: "/ usuario / mes",
          periodYearly: "/ usuario / año",
          includes: [
            "SSO (OIDC)",
            "Consola admin + registro",
            "Bóvedas de equipo",
            "Altas por SCIM",
          ],
        },
      ],
    },
    testimonials: {
      eyebrow: "Opiniones",
      title: "Gente que dejó de apuntar contraseñas en Notas.",
      lead: "Citas inventadas para este concepto — escritas como si el producto existiera.",
      items: [
        {
          quote:
            "Pasé 340 accesos un domingo. El autocompletar del móvil es lo primero que de verdad funciona en Safari.",
          name: "Mara K.",
          role: "Diseñadora freelance, Wien",
        },
        {
          quote:
            "El wifi del local va por una bóveda compartida. Cuando alguien se fue, lo quité en diez segundos.",
          name: "Jonas V.",
          role: "Dueño, restaurante pequeño",
        },
        {
          quote:
            "La maestra es larga y me gusta que no puedan resetearla. Es lo contrario de casi cualquier otra app.",
          name: "Elena R.",
          role: "Admin de sistemas",
        },
      ],
    },
    install: {
      eyebrow: "Instalar",
      title: "En los aparatos que ya usas.",
      lead: "La misma bóveda, la misma maestra. Desbloqueas una vez; el resto se sincroniza.",
      platformsLabel: "Apps",
      browsersLabel: "Navegadores",
      platforms: ["iOS 16+", "Android 12+", "macOS 13+", "Windows 11", "Linux (deb / AppImage)"],
      browsers: ["Chrome", "Safari", "Firefox", "Edge"],
      imageAlt: "Móvil, portátil y reloj sobre un escritorio beige con la marca VaultShield",
    },
    news: {
      eyebrow: "Novedades",
      title: "Lo que ha salido hace poco.",
      lead: "Un changelog corto. Las fechas son del concepto, no un feed en vivo.",
      items: [
        {
          date: "18 ago 2026",
          title: "Passkeys en la bóveda familiar",
          body: "Las passkeys compartidas llegan a quien tenga la bóveda abierta. Revocar sigue siendo instantáneo.",
        },
        {
          date: "2 jul 2026",
          title: "Escritorio Linux, primera estable",
          body: "deb y AppImage con el mismo protocolo de autocompletar que macOS. Incluye sesiones Wayland.",
        },
        {
          date: "14 may 2026",
          title: "Desbloqueo offline por debajo de 80 ms",
          body: "Reescribimos la caché local de claves. En un móvil de 2022 el mediano bajó de 210 ms a 74 ms.",
        },
      ],
    },
    faq: {
      eyebrow: "Ayuda",
      title: "Las preguntas que llegan primero.",
      lead: "Respuestas directas. Si falta la tuya, el contacto de esta demo es Santi — no un mostrador de soporte.",
      items: [
        {
          id: "lost",
          question: "¿Y si olvido la contraseña maestra?",
          answer:
            "No podemos resetearla. Así funciona el zero-knowledge. El primer día escribe el kit de recuperación en papel y guárdalo sin red.",
        },
        {
          id: "free",
          question: "¿El plan gratis se puede usar de verdad?",
          answer:
            "Sí, en un tipo de dispositivo. Accesos ilimitados, passkeys en ese aparato, revisión semanal de filtraciones. Pagas cuando quieres el móvil y el portátil a la vez.",
        },
        {
          id: "import",
          question: "¿Puedo importar de otro gestor?",
          answer:
            "Chrome, Safari, Edge, Firefox, 1Password, Bitwarden y un CSV genérico. El archivo se borra de nuestros servidores al terminar el trabajo.",
        },
        {
          id: "family",
          question: "¿La familia ve mis accesos?",
          answer:
            "No. Cada persona tiene una bóveda privada. Solo se comparte lo que dejas en la bóveda del hogar.",
        },
        {
          id: "offline",
          question: "¿Funciona en un avión?",
          answer:
            "Sí. La bóveda es local. La sincronización espera a tener red. El autocompletar no la necesita.",
        },
        {
          id: "business",
          question: "¿Hay un corte de admin?",
          answer:
            "Business puede quitar un asiento y rotar bóvedas compartidas. Las bóvedas privadas siguen privadas salvo que la cuenta sea de la empresa.",
        },
        {
          id: "audit",
          question: "¿Alguien ha auditado el cifrado?",
          answer:
            "En este concepto iría aquí el informe (alcance, fecha, firma). En un producto real el PDF se podría descargar.",
        },
        {
          id: "gdpr",
          question: "¿Dónde se guardan los datos?",
          answer:
            "El cifrado, en regiones de la UE (Fráncfort). La facturación va aparte. Exportar o borrar la cuenta: Ajustes.",
        },
      ],
    },
    finalCta: {
      title: "Cierra la bóveda. Luego ignórala.",
      lead: "Plan gratis, sin tarjeta. Sube después si el segundo aparato importa.",
      button: "Consíguelo gratis",
    },
    footer: {
      tagline: "Un concepto de gestor de contraseñas — hecho como demo de portfolio.",
      columns: [
        {
          title: "Producto",
          links: [
            { label: "Bóveda", href: "#vault" },
            { label: "Planes", href: "#plans" },
            { label: "Instalar", href: "#install" },
            { label: "Seguridad", href: "#security" },
          ],
        },
        {
          title: "Empresa",
          links: [
            { label: "Novedades", href: "#news" },
            { label: "Ayuda", href: "#help" },
            { label: "Santi Villa", href: "/es" },
          ],
        },
        {
          title: "Recursos",
          links: [
            { label: "Comprobador", href: "#checker" },
            { label: "Cómo funciona", href: "#how" },
          ],
        },
      ],
      legalImpressum: "Impressum",
      legalPrivacy: "Privacidad",
      legalTerms: "Términos",
    },
  },
};

export function getVaultshieldContent(locale: Locale): VaultshieldContent {
  return CONTENT[locale];
}
