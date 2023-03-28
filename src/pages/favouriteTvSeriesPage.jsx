import React, { useContext } from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTvSeriesById } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouriteTvSeries";
import { rearrangeList } from "../util";

const FavouriteTvSeriesPage = () => {
  const [displayedTvSeries, setDisplayedTvSeries] = React.useState([]);
  const { favouriteTvSeries: movieIds } = useContext(MoviesContext);
  const [loadingFinished, setLoadingFinished] = React.useState(false);

  // Create an array of queries and run them in parallel.
  const favouriteTvSeriesQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["tvSeriesById", { id: movieId }],
        queryFn: getTvSeriesById,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvSeriesQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvSeriesQueries.map((q) => q.data);

  if (!loadingFinished && allFavourites.length > 0) {
    setDisplayedTvSeries(allFavourites);
    setLoadingFinished(true);
  }

  const rearrangeFavourites = (swapA, swapB) => {
    const rearranged = [...rearrangeList(displayedTvSeries, swapA, swapB)];
    setDisplayedTvSeries(rearranged);
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
