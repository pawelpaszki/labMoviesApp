import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

const viteKey = import.meta.env.VITE_TMDB_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }