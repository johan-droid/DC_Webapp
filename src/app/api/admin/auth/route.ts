import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { SignJWT } from 'jose';

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
const loginAttempts = new Map<string, { count: number; lockoutUntil?: number }>();

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const now = Date.now();

  // Check if IP is locked out
  const attempts = loginAttempts.get(clientIP);
  if (attempts?.lockoutUntil && now < attempts.lockoutUntil) {
    const remainingTime = Math.ceil((attempts.lockoutUntil - now) / 1000 / 60);
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${remainingTime} minutes.` },
      { status: 429 }
    );
  }

  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const adminSecret = process.env.ADMIN_TOKEN;
    if (!adminSecret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const hashedInput = hashPassword(token);
    const hashedSecret = hashPassword(adminSecret);

    if (hashedInput === hashedSecret) {
      // Success - reset attempts
      loginAttempts.delete(clientIP);

      // Generate session token (JWT)
      const secretKey = new TextEncoder().encode(adminSecret);
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secretKey);

      const response = NextResponse.json({ success: true, token });

      // Set secure cookie
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7200 // 2 hours
      });

      return response;
    } else {
      // Failed attempt
      const currentAttempts = attempts?.count || 0;
      const newCount = currentAttempts + 1;

      if (newCount >= MAX_ATTEMPTS) {
        loginAttempts.set(clientIP, {
          count: newCount,
          lockoutUntil: now + LOCKOUT_TIME
        });
        return NextResponse.json(
          { error: `Too many failed attempts. Locked out for 15 minutes.` },
          { status: 429 }
        );
      }

      loginAttempts.set(clientIP, { count: newCount });
      return NextResponse.json(
        { error: `Invalid password. ${MAX_ATTEMPTS - newCount} attempts remaining.` },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}