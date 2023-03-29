import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getFavouriteMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { rearrangeList } from "../util";
import { getFavouriteMovies } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";

const FavouriteMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user !== null) {
        async function getFavourites(userId) {
          if (!loading) {
            const favourites = await getFavouriteMovies(userId);
            let movies = [];
            for (const favourite of favourites) {
              const movie = await getFavouriteMovie(favourite.movie_id);
              movies = [...[movie]];
            }
            setDisplayedMovies(movies);
            setFetched(true);
          }
        }
        getFavourites(user.user.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  const rearrangeFavourites = (swapA, swapB) => {
    const rearranged = [...rearrangeList(displayedMovies, swapA, swapB)];
    setDisplayedMovies(rearranged);
  }

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
        rearrangeFavourites={rearrangeFavourites}
        listSize={displayedMovies.length}
      />
    </>
  );
};

export default FavouriteMoviesPage;
