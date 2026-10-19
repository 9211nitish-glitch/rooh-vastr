import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured =
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project") &&
  !supabaseUrl.includes("placeholder") &&
  Boolean(supabaseAnonKey && supabaseAnonKey !== "your-anon-key");

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseReady = isConfigured;
