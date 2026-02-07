import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BOT_USER_AGENTS = [
  'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python-requests',
  'scrapy', 'selenium', 'phantomjs', 'headless', 'postman'
];

const SUSPICIOUS_PATTERNS = [
  /\.\.|\/\.\./,
  /<script/i,
  /javascript:/i,
  /on\w+=/i,
  /eval\(/i,
  /union.*select/i,
  /drop.*table/i
];

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://localhost:3000',
  process.env.NEXT_PUBLIC_SITE_URL || '',
  'https://your-domain.com' // Replace with actual domain
].filter(Boolean);

const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 30;
const TIME_WINDOW = 60000;
const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour
function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function isSuspicious(url: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(url));
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now - record.timestamp > TIME_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function validateOrigin(origin: string | null): boolean {
  if (!origin) return true; // Same-origin requests

  // Allow all localhost/127.0.0.1 in development
  if (process.env.NODE_ENV === 'development') {
    if (origin.startsWith('http://localhost') ||
      origin.startsWith('https://localhost') ||
      origin.startsWith('http://127.0.0.1') ||
      origin.startsWith('https://127.0.0.1')) {
      return true;
    }
  }

  // Allow Vercel preview deployments
  if (origin.endsWith('.vercel.app')) {
    return true;
  }

  return ALLOWED_ORIGINS.includes(origin);
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const url = request.nextUrl.pathname + request.nextUrl.search;
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // Block suspicious bots (allow legitimate search engines)
  if (isBot(userAgent) && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Block suspicious URL patterns
  if (isSuspicious(url)) {
    return new NextResponse('Invalid Request', { status: 400 });
  }

  // Validate origin for API routes
  if (url.startsWith('/api/') && !validateOrigin(origin)) {
    return new NextResponse('Invalid Origin', { status: 403 });
  }

  // Validate referer for sensitive routes
  if ((url.startsWith('/admin/') || url.startsWith('/api/')) && referer) {
    const refererOrigin = new URL(referer).origin;
    if (!validateOrigin(refererOrigin)) {
      return new NextResponse('Invalid Referer', { status: 403 });
    }
  }

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': RATE_LIMIT.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + TIME_WINDOW).toISOString()
      }
    });
  }

  // Add security headers
  const response = NextResponse.next();

  // Advanced security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block; report=https://your-domain.com/csp-report');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://*.vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live",
    "img-src 'self' data: https: blob: https://vercel.live https://*.vercel.live",
    "font-src 'self' https://fonts.gstatic.com https://vercel.live https://*.vercel.live",
    "connect-src 'self' https://www.google-analytics.com https://api.supabase.co https://vercel.live https://*.vercel.live",
    "frame-src 'self' https://vercel.live https://*.vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self' https://vercel.live https://*.vercel.live",
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Add CSRF token for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfToken = generateCSRFToken();
    response.headers.set('X-CSRF-Token', csrfToken);
    response.headers.set('Set-Cookie', `csrf-token=${csrfToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${CSRF_TOKEN_EXPIRY}`);
  }

  // Add fingerprinting protection
  response.headers.set('X-Robots-Tag', 'noarchive, nosnippet, notranslate, noimageindex');

  // Remove server information
  response.headers.set('Server', '');
  response.headers.set('X-Powered-By', '');

  // Add performance headers
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Expect-CT', '');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};