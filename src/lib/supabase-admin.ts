import 'server-only'; // 🛡️ CRITICAL: Prevents this file from ever importing to the client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("❌ Missing SUPABASE_SERVICE_ROLE_KEY for Admin Client");
}

// Service role client (Bypasses RLS - careful!)
export const supabaseAdmin = createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);
