import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

const viteKey = import.meta.env.VITE_TMDB_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function getFavouriteMovies(user_id) {
  const { data } = await supabase.from("favouriteMovies").select().eq('user_id', user_id);
  return data
}

async function addToFavouriteMovies(user_id, movie_id) {
  const movies = await getFavouriteMovies(user_id);

  if (!movies.filter(e => e.movie_id === movie_id).length > 0) {
    let resp = await supabase
      .from('favouriteMovies')
      .insert({ "id": uuidv4(), "user_id": user_id, "movie_id": movie_id, "order_id": movies.length });
      console.log(resp);
  }

}

export { supabase, getFavouriteMovies, addToFavouriteMovies }