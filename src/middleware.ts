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

const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 30;
const TIME_WINDOW = 60000;

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

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const url = request.nextUrl.pathname + request.nextUrl.search;

  // Block suspicious bots (allow legitimate search engines)
  if (isBot(userAgent) && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Block suspicious URL patterns
  if (isSuspicious(url)) {
    return new NextResponse('Invalid Request', { status: 400 });
  }

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Add fingerprinting protection
  response.headers.set('X-Robots-Tag', 'noarchive, nosnippet');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};