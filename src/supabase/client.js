import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
console.log(`supabaseUrl: ${supabaseUrl}`);

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
console.log(`supabaseKey: ${supabaseKey}`);

const viteKey = import.meta.env.VITE_TMDB_KEY
console.log(`viteKey: ${viteKey}`);

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }