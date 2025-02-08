// src/pages/api/auth/callback.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query

  if (code) {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(String(code))
      
      if (error) throw error

      return res.redirect('/dashboard') // or wherever you want to redirect after login
    } catch (error) {
      console.error('Error:', error)
      return res.redirect('/login?error=Something went wrong')
    }
  }

  return res.redirect('/login?error=No code provided')
}
