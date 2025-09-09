import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from './auth';

export async function assertAdminOrRedirect(nextPath: string = '/admin') {
  const token = cookies().get('auth_token')?.value;
  if (!token) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  const payload = await verifyAuthToken(token);
  if (!payload) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return payload;
}

