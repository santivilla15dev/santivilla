import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const PSI_MAX_PER_WINDOW = 3;
const PSI_WINDOW_MS = 60_000;
const MENU_MAX_PER_WINDOW = 5;
const MENU_WINDOW_MS = 60 * 60_000;
const BOT_MAX_PER_WINDOW = 15;
const BOT_WINDOW_MS = 60 * 60_000;
const COPY_MAX_PER_WINDOW = 10;
const COPY_WINDOW_MS = 60 * 60_000;
const MAPS_KONZEPT_MAX = 5;
const MAPS_KONZEPT_WINDOW_MS = 60 * 60_000;
const DIAGNOSE_MAX = 5;
const DIAGNOSE_WINDOW_MS = 60 * 60_000;
const BRIEF_MAX = 8;
const BRIEF_WINDOW_MS = 60 * 60_000;
const BRIEF_REVISE_MAX = 20;
const BRIEF_REVISE_WINDOW_MS = 60 * 60_000;

type Bucket = { count: number; resetAt: number };
const memoryBuckets = new Map<string, Bucket>();

function memoryCheck(
  key: string,
  maxPerWindow: number,
  windowMs: number,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const current = memoryBuckets.get(key);

  if (!current || now >= current.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  if (current.count >= maxPerWindow) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  memoryBuckets.set(key, current);
  return { ok: true, retryAfterSec: 0 };
}

async function checkBucket(
  bucketKey: string,
  maxPerWindow: number,
  windowMs: number,
): Promise<{ ok: boolean; retryAfterSec: number }> {
  if (!isSupabaseConfigured()) {
    return memoryCheck(bucketKey, maxPerWindow, windowMs);
  }

  try {
    const supabase = getSupabaseAdmin();
    const now = new Date();
    const resetAt = new Date(now.getTime() + windowMs);

    const { data: existing } = await supabase
      .from("rate_limit_buckets")
      .select("count, reset_at")
      .eq("bucket_key", bucketKey)
      .maybeSingle();

    if (!existing || new Date(existing.reset_at) <= now) {
      await supabase.from("rate_limit_buckets").upsert({
        bucket_key: bucketKey,
        count: 1,
        reset_at: resetAt.toISOString(),
      });
      return { ok: true, retryAfterSec: 0 };
    }

    if (existing.count >= maxPerWindow) {
      const retryAfterSec = Math.max(
        1,
        Math.ceil(
          (new Date(existing.reset_at).getTime() - now.getTime()) / 1000,
        ),
      );
      return { ok: false, retryAfterSec };
    }

    await supabase
      .from("rate_limit_buckets")
      .update({ count: existing.count + 1 })
      .eq("bucket_key", bucketKey);

    return { ok: true, retryAfterSec: 0 };
  } catch {
    return memoryCheck(bucketKey, maxPerWindow, windowMs);
  }
}

export async function checkRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`audit:${key}`, MAX_PER_WINDOW, WINDOW_MS);
}

export async function checkMenuRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`menu:${key}`, MENU_MAX_PER_WINDOW, MENU_WINDOW_MS);
}

export async function checkPsiRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`psi:${key}`, PSI_MAX_PER_WINDOW, PSI_WINDOW_MS);
}

export async function checkBotRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`bot:${key}`, BOT_MAX_PER_WINDOW, BOT_WINDOW_MS);
}

export async function checkCopyRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`copy:${key}`, COPY_MAX_PER_WINDOW, COPY_WINDOW_MS);
}

export async function checkMapsKonzeptRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(
    `maps-konzept:${key}`,
    MAPS_KONZEPT_MAX,
    MAPS_KONZEPT_WINDOW_MS,
  );
}

export async function checkDiagnoseRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`diagnose:${key}`, DIAGNOSE_MAX, DIAGNOSE_WINDOW_MS);
}

export async function checkBriefRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`brief:${key}`, BRIEF_MAX, BRIEF_WINDOW_MS);
}

export async function checkBriefReviseRateLimit(key: string): Promise<{
  ok: boolean;
  retryAfterSec: number;
}> {
  return checkBucket(`brief-revise:${key}`, BRIEF_REVISE_MAX, BRIEF_REVISE_WINDOW_MS);
}
