import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export function authenticateAdmin(req: NextRequest): NextResponse | null {
    const apiKey = req.headers.get('x-admin-key');
    const secret = process.env.ADMIN_SECRET;

    if (!apiKey || !secret) {
        return NextResponse.json({ error: '⛔ Unauthorized: Key missing.' }, { status: 401 });
    }

    // FIX: Use hashing to ensure constant length for comparison
    // This prevents timing attacks that leak the length of the secret
    const hashKey = crypto.createHash('sha256').update(apiKey).digest();
    const hashSecret = crypto.createHash('sha256').update(secret).digest();

    if (crypto.timingSafeEqual(hashKey, hashSecret)) {
        return null; // Auth success
    } else {
        // Safe to log IP here
        const ip = (req as any).ip || req.headers.get('x-forwarded-for') || 'unknown';
        console.warn(`Failed admin access attempt from ${ip}`);
        return NextResponse.json({ error: '⛔ Unauthorized: Invalid Key.' }, { status: 401 });
    }
}
