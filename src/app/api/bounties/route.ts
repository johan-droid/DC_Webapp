import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdmin } from '@/lib/auth';
import { z } from 'zod';

const BountySchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    reward: z.string().min(1),
    status: z.enum(['open', 'closed', 'claimed']).optional(),
});

export async function GET() {
    const { data, error } = await supabase
        .from('bounties')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: 'Failed to fetch bounties' }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = BountySchema.parse(body);

        const { data, error } = await supabaseAdmin
            .from('bounties')
            .insert([validatedData])
            .select();

        if (error) throw new Error(error.message);
        return NextResponse.json({ message: 'Bounty posted', bounty: data[0] }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.issues ? error.issues[0].message : error.message }, { status: 400 });
    }
}
