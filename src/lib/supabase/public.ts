import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-free Supabase client for PUBLIC pages.
 *
 * `@/lib/supabase/server`'daki createClient `cookies()` kullandığı için
 * Next.js o route'u dinamik (ƒ) render'a zorlar — `revalidate` (ISR)
 * etkisiz kalır. Public sayfalarda cookie gerekmez (yalnızca herkese açık
 * veri + RLS). Bu client `cookies()` çağırmaz → Next fetch'leri cache'ler
 * ve `export const revalidate = 300` route'ları statik (○ ISR) yapar.
 * Sonuç: TTFB ~0 (CDN önbelleği), mobil Performans 100'e kritik katkı.
 *
 * Admin/auth route'ları yine `@/lib/supabase/server` (cookie'li) kullanır.
 */
export function createPublicClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase URL or Anon Key is missing. Check your environment variables.");
    }
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
