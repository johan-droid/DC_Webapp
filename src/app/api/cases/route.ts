import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabaseClient';
import { authenticateAdmin } from '@/lib/auth';

export async function GET() {
    const { data, error } = await supabase.from('cases').select('*').order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const authResponse = authenticateAdmin(req);
    if (authResponse) return authResponse;

    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Simple validation
    if (!body.title || !body.description) {
        return NextResponse.json({ error: 'Title and Description required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('cases').insert([body]).select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: 'Case filed!', case: data[0] }, { status: 201 });
}
