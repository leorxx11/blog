import { SignJWT, jwtVerify } from 'jose';

const encoder = new TextEncoder();

export function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }
  return encoder.encode(secret);
}

export async function createAuthToken(username: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const secret = getAuthSecret();
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + maxAgeSeconds)
    .sign(secret);
}

export async function verifyAuthToken(token: string) {
  const secret = getAuthSecret();
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

