import { Database } from '@supabase/supabase-js';

declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row'];