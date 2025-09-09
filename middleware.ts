import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  const AUTH_SECRET = process.env.AUTH_SECRET;

  if (!ADMIN_USER || !ADMIN_PASS || !AUTH_SECRET) {
    return new NextResponse('Admin auth not configured', { status: 500 });
  }

  // Allow access to login/logout APIs and the login page itself
  if (
    url.pathname.startsWith('/api/login') ||
    url.pathname.startsWith('/api/logout') ||
    url.pathname === '/login'
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get('auth_token')?.value;
  if (!token) {
    url.pathname = '/login';
    url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(AUTH_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    url.pathname = '/login';
    url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
}
