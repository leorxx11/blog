import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';
import fs from 'fs';
import { verifyAuthToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = cookies().get('auth_token')?.value;
  if (!token || !(await verifyAuthToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const orig = (file as File).name || 'upload.bin';
  const ext = path.extname(orig) || '.bin';
  const base = path.basename(orig, ext).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'file';
  const name = `${Date.now()}-${base}${ext}`;
  const dest = path.join(uploadDir, name);
  fs.writeFileSync(dest, buffer);

  const url = `/uploads/${name}`;
  return NextResponse.json({ url });
}

