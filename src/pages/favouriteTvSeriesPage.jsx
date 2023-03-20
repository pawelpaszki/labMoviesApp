import React, { useContext } from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTvSeriesById } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouriteTvSeries";

const FavouriteTvSeriesPage = () => {
  const { favouriteTvSeries: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run them in parallel.
  const favouriteTvSeriesQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getTvSeriesById,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvSeriesQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const displayTvSeries = favouriteTvSeriesQueries.map((q) => q.data);

  return (
    <>
      <PageTemplate
        title="Favourite Tv Series"
        tvSeries={displayTvSeries}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
            </>
          );
        }}
      />
    </>
  );
};

export default FavouriteTvSeriesPage;
