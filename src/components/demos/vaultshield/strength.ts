const COMMON = [
  "password",
  "passwort",
  "contraseña",
  "contrasena",
  "123456",
  "qwerty",
  "admin",
  "welcome",
  "vault",
  "shield",
  "letmein",
  "iloveyou",
];

export type StrengthResult = {
  level: 0 | 1 | 2 | 3;
  bits: number;
  crack: string;
  tips: string[];
};

function charsetSize(value: string): number {
  let size = 0;
  if (/[a-z]/.test(value)) size += 26;
  if (/[A-Z]/.test(value)) size += 26;
  if (/\d/.test(value)) size += 10;
  if (/[^A-Za-z0-9]/.test(value)) size += 33;
  return size || 1;
}

function hasSequence(value: string): boolean {
  const lower = value.toLowerCase();
  const rows = ["abcdefghijklmnopqrstuvwxyz", "0123456789", "qwertyuiop", "asdfghjkl"];
  for (const row of rows) {
    for (let i = 0; i <= row.length - 3; i++) {
      const slice = row.slice(i, i + 3);
      if (lower.includes(slice) || lower.includes([...slice].reverse().join(""))) return true;
    }
  }
  return false;
}

function repeatPenalty(value: string): number {
  const uniq = new Set(value).size;
  if (uniq <= 2 && value.length >= 4) return 18;
  if (/(.)\1{2,}/.test(value)) return 8;
  return 0;
}

function formatCrack(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 1) return "< 1 s";
  const units: [number, string][] = [
    [60, "s"],
    [60, "min"],
    [24, "h"],
    [365, "d"],
    [100, "yr"],
  ];
  let n = seconds;
  let label = "s";
  for (const [div, next] of units) {
    if (n < div) return `${n < 10 ? n.toFixed(1) : Math.round(n)} ${label}`;
    n /= div;
    label = next;
  }
  return `${Math.round(n)} centuries`;
}

export function scorePassword(value: string, tipsCatalog: string[]): StrengthResult {
  if (!value) {
    return { level: 0, bits: 0, crack: "—", tips: [] };
  }

  const size = charsetSize(value);
  let bits = value.length * Math.log2(size);
  bits -= repeatPenalty(value);
  if (hasSequence(value)) bits -= 12;
  const lowered = value.toLowerCase();
  if (COMMON.some((w) => lowered.includes(w))) bits -= 16;
  if (/(19|20)\d{2}/.test(value)) bits -= 10;
  bits = Math.max(0, Math.round(bits * 10) / 10);

  const guesses = 2 ** Math.max(bits - 1, 0);
  const seconds = guesses / 1e11;

  const tips: string[] = [];
  if (value.length < 12) tips.push(tipsCatalog[0]);
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) tips.push(tipsCatalog[1]);
  if (!/\d/.test(value)) tips.push(tipsCatalog[2]);
  if (!/[^A-Za-z0-9]/.test(value)) tips.push(tipsCatalog[3]);
  if (hasSequence(value) || COMMON.some((w) => lowered.includes(w))) tips.push(tipsCatalog[4]);

  const level: 0 | 1 | 2 | 3 = bits < 28 ? 0 : bits < 40 ? 1 : bits < 60 ? 2 : 3;
  return { level, bits, crack: formatCrack(seconds), tips };
}

export const CHECKER_TIPS = {
  en: [
    "Use 12 or more characters.",
    "Mix upper and lower case.",
    "Add a number.",
    "Add a symbol.",
    "Avoid sequences and common words.",
  ],
  de: [
    "Nimm 12 Zeichen oder mehr.",
    "Groß- und Kleinbuchstaben mischen.",
    "Eine Zahl dazu.",
    "Ein Sonderzeichen dazu.",
    "Keine Folgen und keine Standardwörter.",
  ],
  es: [
    "Usa 12 caracteres o más.",
    "Mezcla mayúsculas y minúsculas.",
    "Añade un número.",
    "Añade un símbolo.",
    "Evita secuencias y palabras típicas.",
  ],
} as const;
