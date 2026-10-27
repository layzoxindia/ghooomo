import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { adminConfigured } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";

/** Setup check without exposing secrets: is the database reachable and is admin configured? */
export async function GET() {
  const client = db();
  let database: "ok" | "not-configured" | "error" = "not-configured";
  let detail = "";
  if (client) {
    const { error } = await client.from("leads").select("id", { count: "exact", head: true });
    database = error ? "error" : "ok";
    if (error) detail = error.code || "query-failed";
  }
  return NextResponse.json(
    {
      database,
      detail,
      databaseSource: process.env.GHOOOMO_DB_URL && process.env.GHOOOMO_DB_SERVICE_KEY ? "ghooomo" : process.env.SUPABASE_URL ? "vercel-addon" : "none",
      databaseHost: (process.env.GHOOOMO_DB_URL && process.env.GHOOOMO_DB_SERVICE_KEY ? process.env.GHOOOMO_DB_URL : process.env.SUPABASE_URL || "").replace(/^https:\/\/([a-z0-9]{6})[a-z0-9]*(\.supabase\.co).*$/, "$1…$2"),
      admin: adminConfigured() ? "ok" : "not-configured",
      spamCheck: process.env.TURNSTILE_SECRET_KEY ? "on" : "off",
    },
    { headers: { "cache-control": "no-store" } },
  );
}
