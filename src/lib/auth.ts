import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Use a strong secret for JWT signing/verification
const ADMIN_SECRET = process.env.ADMIN_TOKEN || 'fallback-secret-for-dev-only-do-not-use-in-prod';
const SECRET_KEY = new TextEncoder().encode(ADMIN_SECRET);

export async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const tokenCookie = request.cookies.get('admin_token')?.value;
  const authHeader = request.headers.get('authorization');

  let token = tokenCookie;
  if (!token && authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.role === 'admin';
  } catch (error) {
    return false;
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized Access - Black Org Detected' }, { status: 401 });
    }
    return handler(request);
  };
}