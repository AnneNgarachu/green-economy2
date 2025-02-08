// src/pages/api/auth/callback.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query

  if (!code) return res.redirect('/login?error=No code provided')

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(String(code))
    if (error) throw error
    return res.redirect('/dashboard')
  } catch (error) {
    console.error('Auth callback error:', error)
    return res.redirect('/login?error=Authentication failed')
  }
}