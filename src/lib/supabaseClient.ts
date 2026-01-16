import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase environment variables are missing. Database connections will fail.");
}

// Client-side safe client
// We use fallback values to prevent the app from crashing on startup/build if env vars are missing.
// Requests will simply fail gracefully instead of a 500 Internal Server Error during module loading.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// FIX: Server-side admin client
// Only initialize this if we are on the server to avoid leaking secrets or errors on client
export const supabaseAdmin = (typeof window === 'undefined' && supabaseServiceKey)
    ? createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey)
    : ({} as any); // Fallback to empty object on client
