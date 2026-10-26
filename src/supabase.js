import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL:', supabaseUrl);
  console.error('Supabase anon key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
  console.error('Supabase publishable key:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
  throw new Error(
    'Supabase URL and anon key are required. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file, then restart the dev server.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);