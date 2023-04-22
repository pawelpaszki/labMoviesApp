import React, { useEffect } from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import Spinner from "../components/spinner";
import { getFavouriteCollection, getTvSeriesById } from "../api/tmdb-api";

const FavouriteTvSeriesPage = () => {
  const [fetched, setFetched] = React.useState(false);
  const [displayedTvSeries, setDisplayedTvSeries] = React.useState([]);

  async function getFavourites() {
    const favourites = await getFavouriteCollection("tv");
    let movies = [];
    for (const favourite of favourites) {
      const movie = await getTvSeriesById({ id: favourite });
      movies.push(movie);
    }
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
      <PageTemplate
        title="Favourite Tv Series"
        tvSeries={displayedTvSeries}
        action={(movie) => null}
        listSize={displayedTvSeries.length}
      />
    </>
  );
};

export default FavouriteTvSeriesPage;
