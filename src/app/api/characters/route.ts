import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { authenticateAdmin } from '@/lib/auth';
import { CharacterSchema } from '@/lib/validators';

export async function GET() {
    const { data, error } = await supabase.from('characters').select('*').order('created_at', { ascending: true });
    if (error) return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const authError = authenticateAdmin(req);
    if (authError) return authError;

    try {
        const body = await req.json();
        const validatedData = CharacterSchema.parse(body);

        const { data, error } = await supabaseAdmin.from('characters').insert([validatedData]).select();
        if (error) throw new Error(error.message);

        return NextResponse.json({ message: 'Character added', character: data[0] }, { status: 201 });
    } catch (error: any) {
        const msg = error.issues ? error.issues[0].message : error.message;
        return NextResponse.json({ error: msg }, { status: 400 });
    }
}
