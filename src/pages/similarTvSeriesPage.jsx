import React from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateTvSeriesListPage";
import { getTvSeriesById, getSimilarTvSeries } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import AddToFavouriteTvSeriesIcon from '../components/cardIcons/addToFavouriteTvSeries';
import "./footerStyle/styles.css";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

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
      <div className="footerFill">
      </div>
      <div className="footer">
        <div className="footerCol">
          <Button variant="contained"
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous Page
          </Button>{' '}
        </div>
        <div className="footerCol">
          <Chip label="Current Page" color="primary" /> <Chip label={page} />
          <Chip label="Total # of Pages" color="primary" /> <Chip label={data?.total_pages} />
        </div>
        <div className="footerCol">
          <Button variant="contained"
            onClick={() => {
              if (!data?.total_pages <= page) {
                setPage(old => old + 1)
              }
            }}
          >
            Next Page
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimilarTvSeriesPage;
