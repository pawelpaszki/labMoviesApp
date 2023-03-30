import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

const viteKey = import.meta.env.VITE_TMDB_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function getFavouriteMovies(user_id) {
  const { data } = await supabase.from("favouriteMovies").select().eq('user_id', user_id).order('order_id', { ascending: true });
  return data
}

async function addToFavouriteMovies(user_id, movie_id) {
  const movies = await getFavouriteMovies(user_id);
  const orderId = Math.max(...movies.map(m => m.order_id), 0) + 1;

  if (!movies.filter(e => e.movie_id === movie_id).length > 0) {
    let resp = await supabase
      .from('favouriteMovies')
      .insert({ "id": uuidv4(), "user_id": user_id, "movie_id": movie_id, "order_id": orderId });
    console.log(resp);
  }
}

async function removeFavouriteMovie(user_id, movie_id) {
  await supabase
    .from('favouriteMovies')
    .delete()
    .eq('user_id', user_id)
    .eq('movie_id', movie_id)
}

async function updateFavouriteMovieOrder(user_id, swapA, swapB) {
  const moviesA = await supabase
    .from('favouriteMovies')
    .select()
    .eq('user_id', user_id)
    .eq('movie_id', swapA);
  const moviesB = await supabase
    .from('favouriteMovies')
    .select()
    .eq('user_id', user_id)
    .eq('movie_id', swapB);
  await supabase
    .from('favouriteMovies')
    .update({ "order_id": moviesB.data[0].order_id })
    .eq('user_id', user_id)
    .eq('movie_id', swapA);
  await supabase
    .from('favouriteMovies')
    .update({ "order_id": moviesA.data[0].order_id })
    .eq('user_id', user_id)
    .eq('movie_id', swapB);
}

export { supabase, getFavouriteMovies, addToFavouriteMovies, removeFavouriteMovie, updateFavouriteMovieOrder }