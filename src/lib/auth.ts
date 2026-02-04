import { NextRequest, NextResponse } from 'next/server';

export function verifyAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  const authHeader = request.headers.get('authorization');
  
  return !!(token || authHeader?.startsWith('Bearer '));
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(request);
  };
}