import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export function authenticateAdmin(req: NextRequest): NextResponse | null {
    // Check headers for the key
    const apiKey = req.headers.get('x-admin-key');
    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
        console.error("❌ ADMIN_SECRET is not set in environment variables.");
        return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

    if (!apiKey) {
        return NextResponse.json({ error: '⛔ Unauthorized: Key missing.' }, { status: 401 });
    }

    // Timing-safe comparison
    const hashKey = crypto.createHash('sha256').update(apiKey).digest();
    const hashSecret = crypto.createHash('sha256').update(secret).digest();

    if (!crypto.timingSafeEqual(hashKey, hashSecret)) {
        // Robust IP Logging for Next.js
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
        console.warn(`⚠️ Failed admin access attempt from IP: ${ip}`);

        return NextResponse.json({ error: '⛔ Unauthorized: Invalid Key.' }, { status: 401 });
    }

    return null; // Auth success
}
