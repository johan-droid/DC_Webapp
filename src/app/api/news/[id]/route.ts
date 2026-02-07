import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: 'News item not found' }, { status: 404 });
            }
            throw error;
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news item' }, { status: 500 });
    }
}
// ... existing code ...
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdmin } from '@/lib/auth';
import { deleteFromCloudinary, extractPublicIdFromUrl } from '@/lib/cloudinary-server';
import { revalidatePath } from 'next/cache';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await verifyAdmin(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        // 1. Fetch the news item to get the image URL
        const { data: newsItem, error: fetchError } = await supabaseAdmin
            .from('news')
            .select('image')
            .eq('id', id)
            .single();

        if (fetchError) {
            return NextResponse.json({ error: 'News item not found' }, { status: 404 });
        }

        // 2. Delete image from Cloudinary if it exists
        if (newsItem.image && (newsItem.image.includes('cloudinary') || newsItem.image.includes('res.cloudinary.com'))) {
            const publicId = extractPublicIdFromUrl(newsItem.image);
            if (publicId) {
                await deleteFromCloudinary(publicId);
            }
        }

        // 3. Delete record from Supabase
        const { error: deleteError } = await supabaseAdmin
            .from('news')
            .delete()
            .eq('id', id);

        if (deleteError) {
            throw deleteError;
        }

        // 4. Revalidate paths
        revalidatePath('/news');
        revalidatePath('/');

        return NextResponse.json({ message: 'News deleted successfully' });
    } catch (error: any) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete news', details: error.message }, { status: 500 });
    }
}
