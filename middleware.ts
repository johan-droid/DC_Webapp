import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const adminKey = process.env.ADMIN_KEY || process.env.ADMIN_SECRET;
const ADMIN_SECRET = process.env.JWT_SECRET || adminKey || 'fallback-secret-for-dev-only-do-not-use-in-prod';
const SECRET_KEY = new TextEncoder().encode(ADMIN_SECRET);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Security Headers
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://vercel.live https://*.vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://res.cloudinary.com https://i.ytimg.com blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://res.cloudinary.com https://*.supabase.co https://vercel.live https://*.vercel.live wss://*.vercel.live;"
    );

    // 2. Protect Admin Routes
    if (pathname.startsWith('/admin')) {
        // Allow access to login page
        if (pathname === '/admin/login') {
            return response;
        }

        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, SECRET_KEY);
            return response;
        } catch (error) {
            // Invalid token
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
