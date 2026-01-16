import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabaseClient';
import { authenticateAdmin } from '@/lib/auth';
import Joi from 'joi';
import { revalidatePath } from 'next/cache';

// Validation Schema
const newsValidation = Joi.object({
    title: Joi.string().min(5).max(150).required().trim(),
    category: Joi.string().valid('Fan Theory', 'Merchandise', 'Interview', 'Breaking News').default('General'),
    image: Joi.string().uri().allow(''),
    content: Joi.string().min(10).required(),
    link: Joi.string().uri().allow('')
});

export const dynamic = 'force-dynamic'; // Ensure API is always fresh

export async function GET() {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    // 1. Security Check
    const authResponse = authenticateAdmin(req);
    if (authResponse) return authResponse;

    // 2. Body Parsing
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // 3. Validation
    const { error: valError, value } = newsValidation.validate(body);
    if (valError) return NextResponse.json({ error: valError.details[0].message }, { status: 400 });

    // 4. Database Insert
    const { data, error } = await supabaseAdmin.from('news').insert([value]).select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // 5. Revalidate cache
    revalidatePath('/news');
    revalidatePath('/');

    return NextResponse.json({ message: 'News published!', article: data[0] }, { status: 201 });
}
