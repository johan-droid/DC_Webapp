import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { authenticateAdmin } from '@/lib/auth';
import { NewsSchema } from '@/lib/validators';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const authError = authenticateAdmin(req);
    if (authError) return authError;

    try {
        const body = await req.json();
        // Zod Validation
        const validatedData = NewsSchema.parse(body);

        const { data, error } = await supabaseAdmin.from('news').insert([validatedData]).select();

        if (error) throw new Error(error.message);

        revalidatePath('/news');
        return NextResponse.json({ message: 'News published!', article: data[0] }, { status: 201 });
    } catch (error: any) {
        // Handle Zod or DB errors
        const msg = error.issues ? error.issues[0].message : error.message;
        return NextResponse.json({ error: msg }, { status: 400 });
    }
}
