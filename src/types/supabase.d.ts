// src/types/supabase.d.ts
import { Database } from '@supabase/supabase-js';

declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    }
  }
}

// Add metrics table type
interface MetricsTable {
  id: number
  facility: string
  metric: string
  unit: string
  value: number
  notes?: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: Database['public']['Tables']['profiles']
      metrics: {
        Row: MetricsTable
        Insert: Omit<MetricsTable, 'id' | 'created_at'>
        Update: Partial<Omit<MetricsTable, 'id' | 'created_at'>>
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row'];