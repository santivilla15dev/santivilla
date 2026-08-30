export const CONSENT_COOKIE = "sv_consent";
export const CONSENT_STORAGE_KEY = "sv_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SEC = 60 * 60 * 24 * 365;

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentState = {
  v: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

export function defaultConsentDenied(): ConsentState {
  return {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    ts: new Date().toISOString(),
  };
}

export function consentAll(): ConsentState {
  return {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: true,
    marketing: true,
    ts: new Date().toISOString(),
  };
}
