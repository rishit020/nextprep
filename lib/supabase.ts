import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for the waitlist.
 *
 * Uses the anon key on purpose, not the service role key: the waitlist table's
 * RLS policy grants INSERT and nothing else, so this client physically cannot
 * read the signup list back. See supabase/migrations for the policy.
 */
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
