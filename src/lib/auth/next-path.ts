/**
 * Validates a post-login redirect target against an allowlist so `next`
 * params can't be abused as open redirects to arbitrary sites.
 */
const ALLOWED_NEXT = /^\/(admin|portal)(\/|$)/;

export function safeNextPath(next: string | null | undefined, fallback = "/admin"): string {
  if (next && ALLOWED_NEXT.test(next)) return next;
  return fallback;
}
