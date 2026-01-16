import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export function authenticateAdmin(req: NextRequest): NextResponse | null {
    const apiKey = req.headers.get('x-admin-key');
    const secret = process.env.ADMIN_SECRET;

    if (!apiKey || !secret) {
        return NextResponse.json({ error: '⛔ Unauthorized: Key missing.' }, { status: 401 });
    }

    // Convert to buffers for timingSafeEqual
    const bufferKey = Buffer.from(apiKey);
    const bufferSecret = Buffer.from(secret);

    if (bufferKey.length !== bufferSecret.length) {
        return NextResponse.json({ error: '⛔ Unauthorized: Invalid Key.' }, { status: 401 });
    }

    if (crypto.timingSafeEqual(bufferKey, bufferSecret)) {
        return null; // Auth success
    } else {
        console.warn(`Failed admin access attempt from ${req.ip}`);
        return NextResponse.json({ error: '⛔ Unauthorized: Invalid Key.' }, { status: 401 });
    }
}
