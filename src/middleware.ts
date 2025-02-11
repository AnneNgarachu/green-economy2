import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that need to be public
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function middleware(request: NextRequest) {
  // Create an empty response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    // Refresh session if expired - required for Server Components
    const { data: { session }} = await supabase.auth.getSession()

    // OPTIONAL: Only protect specific routes
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/protected') || 
                           request.nextUrl.pathname.startsWith('/dashboard')

    // Redirect unauthenticated users trying to access protected routes
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Redirect authenticated users away from auth pages
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  } catch (e) {
    // Handle any errors
    console.error('Middleware error:', e)
  }

  return response
}