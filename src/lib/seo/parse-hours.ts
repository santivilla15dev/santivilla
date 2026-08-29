const DAY_MAP: Record<string, string> = {
  mo: "Monday",
  mon: "Monday",
  montag: "Monday",
  lun: "Monday",
  di: "Tuesday",
  tue: "Tuesday",
  dienstag: "Tuesday",
  mar: "Tuesday",
  mi: "Wednesday",
  wed: "Wednesday",
  mittwoch: "Wednesday",
  mie: "Wednesday",
  do: "Thursday",
  thu: "Thursday",
  donnerstag: "Thursday",
  jue: "Thursday",
  fr: "Friday",
  fri: "Friday",
  freitag: "Friday",
  vie: "Friday",
  sa: "Saturday",
  sat: "Saturday",
  samstag: "Saturday",
  sab: "Saturday",
  so: "Sunday",
  sun: "Sunday",
  sonntag: "Sunday",
  dom: "Sunday",
};

const WEEK_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function normalizeTime(raw: string): string | null {
  const m = raw.trim().match(/^(\d{1,2})[:.](\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

function dayTokenToSchema(token: string): string | null {
  const key = token.toLowerCase().replace(/\./g, "").slice(0, 6);
  return DAY_MAP[key] || null;
}

function expandDayRange(start: string, end: string): string[] {
  const a = dayTokenToSchema(start);
  const b = dayTokenToSchema(end);
  if (!a || !b) return a ? [a] : b ? [b] : [];
  const ai = WEEK_ORDER.indexOf(a);
  const bi = WEEK_ORDER.indexOf(b);
  if (ai < 0 || bi < 0) return [a];
  if (ai <= bi) return WEEK_ORDER.slice(ai, bi + 1);
  return [...WEEK_ORDER.slice(ai), ...WEEK_ORDER.slice(0, bi + 1)];
}

function parseSingleLine(line: string): Record<string, unknown> | null {
  const cleaned = line.replace(/\s+/g, " ").trim();
  if (!cleaned) return null;

  const timeRe =
    /(\d{1,2}[:.]\d{2})\s*[-–]\s*(\d{1,2}[:.]\d{2})/;
  const timeMatch = cleaned.match(timeRe);
  if (!timeMatch) return null;

  const opens = normalizeTime(timeMatch[1]);
  const closes = normalizeTime(timeMatch[2]);
  if (!opens || !closes) return null;

  const beforeTime = cleaned.slice(0, timeMatch.index).trim();
  const dayPart = beforeTime.replace(/[:.]\s*$/, "").trim();

  let days: string[] = [];
  if (dayPart) {
    const rangeMatch = dayPart.match(
      /([A-Za-zäöüÄÖÜß.]{2,12})\s*[-–bisàto]+\s*([A-Za-zäöüÄÖÜß.]{2,12})/i,
    );
    if (rangeMatch) {
      days = expandDayRange(rangeMatch[1], rangeMatch[2]);
    } else {
      const tokens = dayPart.split(/[,/&]+|\s+/).filter(Boolean);
      for (const t of tokens) {
        const d = dayTokenToSchema(t);
        if (d && !days.includes(d)) days.push(d);
      }
    }
  }

  const spec: Record<string, unknown> = {
    "@type": "OpeningHoursSpecification",
    opens,
    closes,
  };
  if (days.length === 1) spec.dayOfWeek = days[0];
  else if (days.length > 1) spec.dayOfWeek = days;
  return spec;
}

export function parseOpeningHoursSpecifications(
  hoursLines: string[],
): Record<string, unknown>[] {
  const specs: Record<string, unknown>[] = [];
  const seen = new Set<string>();

  for (const line of hoursLines) {
    const spec = parseSingleLine(line);
    if (!spec) continue;
    const key = JSON.stringify(spec);
    if (seen.has(key)) continue;
    seen.add(key);
    specs.push(spec);
  }

  return specs.slice(0, 14);
}
