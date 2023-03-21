import React from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateTvSeriesListPage";
import { getTvSeriesById, getSimilarTvSeries } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import AddToFavouriteTvSeriesIcon from '../components/cardIcons/addToFavouriteTvSeries';
import Pagination from "../components/pagination";

const SimilarTvSeriesPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["tvSeriesById", { id: id }],
    getTvSeriesById
  );
  const [page, setPage] = React.useState(1)
  const { isL,
    isE,
    e,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['similarTv', page],
    queryFn: () => getSimilarTvSeries(page, id),
    keepPreviousData: true
  });

  if (isLoading || isL) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isE) {
    return <h1>{e.message}</h1>;
  }

  const tvSeries = data ? data.results : [];

  const title = `Series similar to: ${movie.name}`;

  return (
    <>
      {movie && tvSeries ? (
        <>
          <PageTemplate
            title={title}
            tvSeries={tvSeries}
            action={(movie) => {
              return <AddToFavouriteTvSeriesIcon movie={movie} />
            }}
          />
        </>
      ) : (
        <p>Waiting for tv series details</p>
      )}
      <Pagination data={data} page={page} setPage={setPage}/>
    </>
  );
};

export default SimilarTvSeriesPage;
