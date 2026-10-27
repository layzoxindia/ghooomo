import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null = null;

/** Service-role client. Server only: never import from a client component. */
export function db(): SupabaseClient | null {
  // GHOOOMO_* names come first so a hosting add-on that sets its own SUPABASE_* values
  // can never point the site at the wrong database.
  // URL and key are always taken as a pair from the same source.
  const own = process.env.GHOOOMO_DB_URL && process.env.GHOOOMO_DB_SERVICE_KEY;
  const url = own ? process.env.GHOOOMO_DB_URL : process.env.SUPABASE_URL;
  const key = own ? process.env.GHOOOMO_DB_SERVICE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!admin) admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return admin;
}
