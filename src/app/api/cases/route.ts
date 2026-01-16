import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabaseClient';
import { authenticateAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

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

    // FIX: Robust Validation
    if (!body.title || typeof body.title !== 'string' || body.title.length > 200) {
        return NextResponse.json({ error: 'Title required (max 200 chars)' }, { status: 400 });
    }
    if (!body.description || typeof body.description !== 'string') {
        return NextResponse.json({ error: 'Description required' }, { status: 400 });
    }

    // FIX: Prevent Mass Assignment by explicitly constructing the object
    const newCase = {
        title: body.title,
        description: body.description,
        type: body.type || 'canon', // Default fallback
        image: body.image || null,
    };

    const { data, error } = await supabaseAdmin.from('cases').insert([newCase]).select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    revalidatePath('/investigations');
    revalidatePath('/');

    return NextResponse.json({ message: 'Case filed!', case: data[0] }, { status: 201 });
}
