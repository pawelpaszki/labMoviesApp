import React, { useEffect } from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouriteTvSeries";
import { getFavouriteTvSeriesById } from "../api/tmdb-api";
import { getFavouriteTvSeries, updateFavouriteTvSeriesOrder } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";

const FavouriteTvSeriesPage = () => {
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();
  const [displayedTvSeries, setDisplayedTvSeries] = React.useState([]);

  async function getFavourites(userId) {
    const favourites = await getFavouriteTvSeries(userId);
    let movies = [];
    for (const favourite of favourites) {
      const movie = await getFavouriteTvSeriesById(favourite.movie_id);
      movie.order_id = favourite.order_id;
      movies.push(movie);
    }
    setDisplayedTvSeries(movies);
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
    const movieA = displayedTvSeries[swapA];
    const movieB = displayedTvSeries[swapB];
    setFetched(false);
    await updateFavouriteTvSeriesOrder(user.user.id, movieA.id, movieB.id);
    setTimeout(async () => await getFavourites(user.user.id), 500);
  }

  return (
    <>
      <PageTemplate
        title="Favourite Tv Series"
        tvSeries={displayedTvSeries}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
            </>
          );
        }}
        rearrangeFavourites={rearrangeFavourites}
        listSize={displayedTvSeries.length}
      />
    </>
  );
};

export default FavouriteTvSeriesPage;
