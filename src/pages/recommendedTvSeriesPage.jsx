import React, { useEffect } from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import Spinner from "../components/spinner";
import { getFavouriteCollection, getRecommendedTvSeries } from "../api/tmdb-api";
import EmptyRecommendedPageTemplate from "../components/emptyRecommendedMovieListPage";
import AddToFavouriteTvSeriesIcon from "../components/cardIcons/addToFavouriteTvSeries";

const RecommendedTvSeriesPage = () => {
  const [fetched, setFetched] = React.useState(false);
  const [displayedTvSeries, setDisplayedTvSeries] = React.useState([]);

  async function getFavourites() {
    const favourites = await getFavouriteCollection("tv");
    const movies = await getRecommendedTvSeries(favourites);
    setDisplayedTvSeries(movies);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(async () => getFavourites(), 100);
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  return (
    <>
      {fetched ? (
        <>
          {displayedTvSeries.length > 0 ? (
            <PageTemplate
              title="Recommended Tv Series"
              tvSeries={displayedTvSeries}
              action={(movie) => {
                return <AddToFavouriteTvSeriesIcon movie={movie} />
              }}
            />
          ) : (
            <>
              <EmptyRecommendedPageTemplate
                title="Recommended Tv Series"
              />
            </>
          )}
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default RecommendedTvSeriesPage;
