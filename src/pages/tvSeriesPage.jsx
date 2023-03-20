import React from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getSeries } from "../api/tmdb-api";
import AddToFavouriteTvSeriesIcon from "../components/cardIcons/addToFavouriteTvSeries";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import "./footerStyle/styles.css";

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

export default TvSeriesPage;
