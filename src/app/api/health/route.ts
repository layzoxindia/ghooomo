import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { adminConfigured, isAdmin } from "@/lib/server/admin-auth";
import { turnstileConfigured } from "@/lib/server/security";
import { alertChannels } from "@/lib/server/notify";

export const dynamic = "force-dynamic";

/**
 * Setup check. Public callers only learn that the site is up; the details
 * (database, admin, spam check) are shown to a signed-in admin only.
 */
export async function GET() {
  const headers = { "cache-control": "no-store" };
  if (!(await isAdmin())) return NextResponse.json({ ok: true }, { headers });

  const client = db();
  let database: "ok" | "not-configured" | "error" = "not-configured";
  let detail = "";
  if (client) {
    const { error } = await client.from("leads").select("id", { count: "exact", head: true });
    database = error ? "error" : "ok";
    if (error) detail = [error.code, error.message].filter(Boolean).join(": ").slice(0, 200) || "query-failed";
  }
  let rateLimit: "ok" | "local-only" = "local-only";
  if (client) {
    const { error } = await client.rpc("hit_rate_limit", { p_key: "health", p_limit: 1000, p_window_seconds: 60 });
    if (!error) rateLimit = "ok";
  }
  return NextResponse.json(
    {
      database,
      detail,
      databaseSource: process.env.GHOOOMO_DB_URL && process.env.GHOOOMO_DB_SERVICE_KEY ? "ghooomo" : process.env.SUPABASE_URL ? "vercel-addon" : "none",
      admin: adminConfigured() ? "ok" : "not-configured",
      spamCheck: turnstileConfigured() ? "on" : "off",
      rateLimit,
      alerts: alertChannels(),
    },
    { headers },
  );
}
