import "server-only";
import { db } from "./db";

// Per-instance sliding window. On Vercel every serverless instance has its own copy,
// so this is only a first, cheap filter. globalLimited() below is the real limit.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > windowMs)) hits.delete(k);
  }
  return arr.length > limit;
}

/**
 * Limit shared by all server instances, stored in Supabase (hit_rate_limit function,
 * see supabase/migrations/20261028_global_rate_limit.sql). Falls back to the
 * per-instance limiter if the database or the function is not available yet.
 */
export async function globalLimited(key: string, limit: number, windowMs: number) {
  const local = rateLimited(key, limit, windowMs);
  const client = db();
  if (!client) return local;
  try {
    const { data, error } = await client.rpc("hit_rate_limit", {
      p_key: key.slice(0, 200),
      p_limit: limit,
      p_window_seconds: Math.round(windowMs / 1000),
    });
    if (error) return local;
    return local || data === true;
  } catch {
    return local;
  }
}

export function clientIp(req: Request) {
  // On Vercel, x-forwarded-for is set by the platform and cannot be spoofed by the client.
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

// Block cross-site form posts.
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function turnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  // Half configured is a mistake: the widget shows but nothing is checked (or the reverse). Refuse.
  if (Boolean(secret) !== Boolean(siteKey)) {
    console.error("Turnstile is half configured: set both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY");
    return false;
  }
  if (!secret) {
    // Not set up yet. The honeypot and the global rate limit still apply.
    if (process.env.VERCEL_ENV === "production") console.warn("Turnstile not configured: forms are protected by rate limit only");
    return true;
  }
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT || "ghooomo";
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ip));
  return Buffer.from(buf).toString("hex").slice(0, 32);
}
