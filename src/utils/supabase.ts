// src/utils/supabase.ts
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) 
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) 
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')

// Browser client for client-side operations
export const createClientBrowser = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Regular client for server-side operations
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Type definitions
export type AuthSession = {
  user: {
    id: string
    email?: string
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  }
}

export type Session = {
  user: {
    id: string
    email?: string
    user_metadata: {
      avatar_url?: string
      full_name?: string
    }
  }
  access_token: string
  refresh_token: string
}

export type User = {
  id: string
  email?: string
  user_metadata: {
    avatar_url?: string
    full_name?: string
  }
}