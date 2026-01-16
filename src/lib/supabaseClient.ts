import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client-side safe client (restricted by RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'placeholder');

// Server-side admin client (bypasses RLS) - Use ONLY in API Routes/Server Components
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || 'placeholder');
