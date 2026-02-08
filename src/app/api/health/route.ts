import { NextResponse } from 'next/server';


export async function GET() {
    const isDbConnected = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;

    return NextResponse.json({
        status: 'OK',
        db: !!isDbConnected,
        framework: 'Next.js 15 (Enterprise)',
        timestamp: new Date().toISOString()
    });
}
