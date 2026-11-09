import { NextResponse } from 'next/server';

// Route prefixes that require active authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/exam-prep',
  '/exams',
  '/tutor',
  '/workspaces',
  '/study-planner',
  '/study-groups'
];

// Route prefixes for authentication (redirect if already logged in)
const AUTH_ROUTES = ['/login', '/register'];

export default function proxy(request) {
  const { pathname } = request.nextUrl;

  // Better-Auth stores session tokens in these standard cookie names
  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value ||
    request.cookies.get('icaw_auth_session')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // 1. Unauthenticated user trying to access protected routes -> redirect to /login
  if (isProtectedRoute && !sessionToken) {
    const callbackUrl = encodeURIComponent(pathname);
    const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated user trying to access /login or /register -> redirect to /dashboard
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (/api/*)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, public assets (.png, .jpg, .svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
