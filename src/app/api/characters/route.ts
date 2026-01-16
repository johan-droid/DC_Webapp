import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabaseClient';
import { authenticateAdmin } from '@/lib/auth';

export async function GET() {
    // Fetch all characters
    const { data, error } = await supabase.from('characters').select('*').order('created_at', { ascending: true });

    if (error) {
        // If table doesn't exist or is empty, we could fall back to static data or return error.
        // For now, let's return error so we know to fix DB.
        // Actually, for "Robustness", if DB fails, we can return empty array or handled error.
        console.error("DB Fetch Error:", error);
        return NextResponse.json({ error: 'Failed to fetch characters', details: error.message }, { status: 500 });
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

    if (!body.name || !body.description) {
        return NextResponse.json({ error: 'Name and description required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('characters').insert([
        {
            name: body.name,
            description: body.description,
            image: body.image || null,
            faction: body.faction || 'main'
        }
    ]).select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Character added', character: data[0] }, { status: 201 });
}
