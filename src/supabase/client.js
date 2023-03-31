import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

const viteKey = import.meta.env.VITE_TMDB_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function createFantasyMovie(
  user_id,
  title,
  overview,
  runtime,
  poster_path,
  production_companies,
  genres,
  release_date
) {
  const { data, error } = await supabase
    .from('fantasyMovies')
    .insert({ "id": uuidv4(), "user_id": user_id, "title": title, "overview": overview, "runtime": runtime,
    "poster_path": poster_path, "production_companies": production_companies, "genres": genres, "release_date": release_date
   });
   return {data, error};
}

async function getFavouriteTvSeries(user_id) {
  const { data } = await supabase.from("favouriteTvSeries").select().eq('user_id', user_id).order('order_id', { ascending: true });
  return data
}

async function addToFavouriteTvSeries(user_id, movie_id) {
  const movies = await getFavouriteTvSeries(user_id);
  const orderId = Math.max(...movies.map(m => m.order_id), 0) + 1;

  if (!movies.filter(e => e.movie_id === movie_id).length > 0) {
    await supabase
      .from('favouriteTvSeries')
      .insert({ "id": uuidv4(), "user_id": user_id, "movie_id": movie_id, "order_id": orderId });
  }
}

async function removeFavouriteTvSeries(user_id, movie_id) {
  await supabase
    .from('favouriteTvSeries')
    .delete()
    .eq('user_id', user_id)
    .eq('movie_id', movie_id)
}

async function updateFavouriteTvSeriesOrder(user_id, swapA, swapB) {
  const moviesA = await supabase
    .from('favouriteTvSeries')
    .select()
    .eq('user_id', user_id)
    .eq('movie_id', swapA);
  const moviesB = await supabase
    .from('favouriteTvSeries')
    .select()
    .eq('user_id', user_id)
    .eq('movie_id', swapB);
  await supabase
    .from('favouriteTvSeries')
    .update({ "order_id": moviesB.data[0].order_id })
    .eq('user_id', user_id)
    .eq('movie_id', swapA);
  await supabase
    .from('favouriteTvSeries')
    .update({ "order_id": moviesA.data[0].order_id })
    .eq('user_id', user_id)
    .eq('movie_id', swapB);
}

async function getFavouriteMovies(user_id) {
  const { data } = await supabase.from("favouriteMovies").select().eq('user_id', user_id).order('order_id', { ascending: true });
  return data
}

async function addToFavouriteMovies(user_id, movie_id) {
  const movies = await getFavouriteMovies(user_id);
  const orderId = Math.max(...movies.map(m => m.order_id), 0) + 1;

  if (!movies.filter(e => e.movie_id === movie_id).length > 0) {
    await supabase
      .from('favouriteMovies')
      .insert({ "id": uuidv4(), "user_id": user_id, "movie_id": movie_id, "order_id": orderId });
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

async function getFavouriteActors(user_id) {
  const { data } = await supabase.from("favouriteActors").select().eq('user_id', user_id).order('order_id', { ascending: true });
  return data
}

async function addToFavouriteActors(user_id, actor_id) {
  const actors = await getFavouriteActors(user_id);
  const orderId = Math.max(...actors.map(m => m.order_id), 0) + 1;

  if (!actors.filter(e => e.actor_id === actor_id).length > 0) {
    await supabase
      .from('favouriteActors')
      .insert({ "id": uuidv4(), "user_id": user_id, "actor_id": actor_id, "order_id": orderId });
  }
}

async function removeFavouriteActor(user_id, actor_id) {
  await supabase
    .from('favouriteActors')
    .delete()
    .eq('user_id', user_id)
    .eq('actor_id', actor_id)
}

async function updateFavouriteActorOrder(user_id, swapA, swapB) {
  const actorsA = await supabase
    .from('favouriteActors')
    .select()
    .eq('user_id', user_id)
    .eq('actor_id', swapA);
  const actorsB = await supabase
    .from('favouriteActors')
    .select()
    .eq('user_id', user_id)
    .eq('actor_id', swapB);
  await supabase
    .from('favouriteActors')
    .update({ "order_id": actorsB.data[0].order_id })
    .eq('user_id', user_id)
    .eq('actor_id', swapA);
  await supabase
    .from('favouriteActors')
    .update({ "order_id": actorsA.data[0].order_id })
    .eq('user_id', user_id)
    .eq('actor_id', swapB);
}

export {
  supabase,
  getFavouriteMovies,
  addToFavouriteMovies,
  removeFavouriteMovie,
  updateFavouriteMovieOrder,
  getFavouriteTvSeries,
  addToFavouriteTvSeries,
  removeFavouriteTvSeries,
  updateFavouriteTvSeriesOrder,
  getFavouriteActors,
  addToFavouriteActors,
  removeFavouriteActor,
  updateFavouriteActorOrder,
  createFantasyMovie
}