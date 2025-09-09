import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/lib/auth';
import { getAboutData, saveAboutData } from '@/lib/about';

export async function GET() {
  try {
    const data = getAboutData();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load about data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Simple auth guard similar to admin usage
  const token = cookies().get('auth_token')?.value;
  if (!token || !(await verifyAuthToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await req.json();
    const saved = saveAboutData(payload);
    return NextResponse.json(saved);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save about data' }, { status: 500 });
  }
}

