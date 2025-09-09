import { NextRequest, NextResponse } from 'next/server';
import { createAuthToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  const AUTH_SECRET = process.env.AUTH_SECRET;

  if (!ADMIN_USER || !ADMIN_PASS || !AUTH_SECRET) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 500 });
  }

  let username = '';
  let password = '';
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    username = body.username || '';
    password = body.password || '';
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await req.formData();
    username = (form.get('username') as string) || '';
    password = (form.get('password') as string) || '';
  } else if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    username = (form.get('username') as string) || '';
    password = (form.get('password') as string) || '';
  } else {
    const body = await req.json().catch(() => ({}));
    username = body.username || '';
    password = body.password || '';
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createAuthToken(username);
  const res = NextResponse.json({ ok: true });

  res.cookies.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}

