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

export async function POST(request: NextRequest) {
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, image_url, author } = body;

    if (!title || !content || !author || typeof title !== 'string' || typeof content !== 'string' || typeof author !== 'string') {
      return NextResponse.json({ error: 'Invalid input: Author is required' }, { status: 400 });
    }

    if (title.length > 255 || content.length > 10000) {
      return NextResponse.json({ error: 'Content too long' }, { status: 400 });
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
        image_url: image_url || null,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}