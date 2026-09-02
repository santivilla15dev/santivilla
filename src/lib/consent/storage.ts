import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SEC,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  defaultConsentDenied,
  type ConsentState,
} from "./types";

function isConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    o.v === CONSENT_VERSION &&
    o.necessary === true &&
    typeof o.analytics === "boolean" &&
    typeof o.marketing === "boolean" &&
    typeof o.ts === "string"
  );
}

export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(decodeURIComponent(raw));
    return isConsentState(data) ? data : null;
  } catch {
    try {
      const data: unknown = JSON.parse(raw);
      return isConsentState(data) ? data : null;
    } catch {
      return null;
    }
  }
}

// useSyncExternalStore exige un snapshot referencialmente estable: memoizamos
// por la cadena cruda para no devolver un objeto nuevo en cada lectura.
let cachedRaw: string | null = null;
let cachedParsed: ConsentState | null = null;

export function readConsentFromDocument(): ConsentState | null {
  if (typeof document === "undefined") return null;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    /* private mode */
  }
  if (!raw) {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
    raw = match ? match.slice(CONSENT_COOKIE.length + 1) : null;
  }

  if (raw === cachedRaw) return cachedParsed;
  const parsed = parseConsent(raw);
  if (parsed) {
    cachedRaw = raw;
    cachedParsed = parsed;
  }
  return parsed;
}

export function writeConsent(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const payload = JSON.stringify(state);
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(payload)}; path=/; max-age=${CONSENT_MAX_AGE_SEC}; samesite=lax`;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, payload);
  } catch {
    /* ignore */
  }
}

export function readOrDefaultConsent(): ConsentState {
  return readConsentFromDocument() ?? defaultConsentDenied();
}
