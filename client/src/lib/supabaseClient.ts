import { createClient } from "@supabase/supabase-js";

// These two values are safe to be public — they only allow the kind of
// access you explicitly permit via Row Level Security policies.
const SUPABASE_URL = "https://vevlsnnkyulgpqddfyke.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_RgBuDwD2WPN_pE_2pcz5oA_BR85aMyf";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
