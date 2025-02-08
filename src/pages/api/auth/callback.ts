// src/pages/api/auth/callback.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabase/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query

  if (code) {
    try {
      const supabase = createClient()
      await supabase.auth.exchangeCodeForSession(String(code))
      return res.redirect('/dashboard')
    } catch (error) {
      console.error('Error:', error)
      return res.redirect('/login?error=Something went wrong')
    }
  }

  return res.redirect('/login?error=No code provided')
}