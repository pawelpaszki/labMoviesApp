import React from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getSeries } from "../api/tmdb-api";
import AddToFavouriteTvSeriesIcon from "../components/cardIcons/addToFavouriteTvSeries";

const TvSeriesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discoverTv", getSeries);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title="Discover Tv series"
        tvSeries={tvSeries}
        action={(movie) => {
          return <AddToFavouriteTvSeriesIcon movie={movie} />
        }}
      />
      {/* <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      /> */}
    </>
  );
};

export default TvSeriesPage;
