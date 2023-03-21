import React from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getSeries } from "../api/tmdb-api";
import AddToFavouriteTvSeriesIcon from "../components/cardIcons/addToFavouriteTvSeries";
import Pagination from "../components/pagination";

const TvSeriesPage = (props) => {
  const [page, setPage] = React.useState(1)
  const { isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['discoverTv', page],
    queryFn: () => getSeries(page),
    keepPreviousData: true
  });

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
      <Pagination data={data} page={page} setPage={setPage}/>
    </>
  );
};

export default TvSeriesPage;
