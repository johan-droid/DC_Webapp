import { NextRequest, NextResponse } from 'next/server';

// Updated to use environment variables for actual security
const ADMIN_SECRET = process.env.ADMIN_TOKEN || 'your-fallback-secret';

export function verifyAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  const authHeader = request.headers.get('authorization');

  // Validation: Check if the token matches the secret exactly
  if (token === ADMIN_SECRET) return true;
  if (authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1] === ADMIN_SECRET) return true;

  return false;
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized Access - Black Org Detected' }, { status: 401 });
    }
    return handler(request);
  };
}