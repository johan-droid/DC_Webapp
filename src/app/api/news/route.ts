import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdmin } from '@/lib/auth';

const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, 300000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;

  record.count++;
  return true;
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    // Use public client for GET
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// ... imports
import { uploadToCloudinary } from '@/lib/cloudinary-server';

import { revalidatePath } from 'next/cache';

// Force dynamic behavior to prevent caching of the GET route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // VALIDATION: Check for required environment variables
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: 'Server Misconfiguration: Missing Cloudinary Keys' }, { status: 500 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server Misconfiguration: Missing Supabase Service Key' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('image_url') as string; // Keep legacy support or fallback

    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Invalid input: Title, Content, and Author are required' }, { status: 400 });
    }

    if (title.length > 255 || content.length > 10000) {
      return NextResponse.json({ error: 'Content too long' }, { status: 400 });
    }

    let finalImageUrl = imageUrl;

    // Handle File Upload
    if (imageFile && imageFile.type.startsWith('image/')) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      try {
        const uploadResult = await uploadToCloudinary(buffer, 'dc_webapp_news');
        finalImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
      }
    }

    const sanitizedTitle = title.trim().substring(0, 255);
    const sanitizedContent = content.trim().substring(0, 10000);
    const sanitizedAuthor = author.trim().substring(0, 100);

    // Use admin client for POST
    const { data, error } = await supabaseAdmin
      .from('news')
      .insert([{
        title: sanitizedTitle,
        content: sanitizedContent,
        author: sanitizedAuthor,
        image: finalImageUrl || null,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    // Revalidate paths to reflect new content immediately
    revalidatePath('/news');
    revalidatePath('/');

    return NextResponse.json(data[0]);
    // ...
  } catch (error: any) {
    console.error('News creation error:', error);
    return NextResponse.json({
      error: 'Failed to create news',
      details: error.message || String(error)
    }, { status: 500 });
  }
}