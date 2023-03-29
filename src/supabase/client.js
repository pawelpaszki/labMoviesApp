import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

const viteKey = import.meta.env.VITE_TMDB_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function getFavouriteMovies(user_id) {
  const { data } = await supabase.from("favouriteMovies").select().eq('user_id', user_id);
  return data
}

export { supabase, getFavouriteMovies }