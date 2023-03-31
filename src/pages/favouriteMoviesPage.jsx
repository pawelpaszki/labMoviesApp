import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getFavouriteMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import WriteReview from "../components/cardIcons/writeReview";
import { getFavouriteMovies, updateFavouriteMovieOrder } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";

const FavouriteMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();

  async function getFavourites(userId) {
    const favourites = await getFavouriteMovies(userId);
    let movies = [];
    for (const favourite of favourites) {
      const movie = await getFavouriteMovie(favourite.movie_id);
      movies.push(movie);
    }
    setDisplayedMovies(movies);
    setFetched(true);
  }

  useEffect(() => {
    if (!loading) {
      if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        setTimeout(async () => getFavourites(user?.user.id), 100);
      } else {
        setTimeout(async () => getFavourites(user?.user.id), 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  const rearrangeFavourites = async (swapA, swapB) => {
    const movieA = displayedMovies[swapA];
    const movieB = displayedMovies[swapB];
    setFetched(false);
    await updateFavouriteMovieOrder(user.user.id, movieA.id, movieB.id);
    setTimeout(async () => await getFavourites(user.user.id), 500);
  }

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => null}
        rearrangeFavourites={rearrangeFavourites}
        listSize={displayedMovies.length}
      />
    </>
  );
};

export default FavouriteMoviesPage;
