import React from "react";
import ActorsListPage from "../components/actorsListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getPopularActors } from "../api/tmdb-api";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import "./footerStyle/styles.css";

const PopularActorsPage = (props) => {
  const [page, setPage] = React.useState(1)
  const { isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['popularActors', page],
    queryFn: () => getPopularActors(page),
    keepPreviousData: true
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];

  return (
    <>
      <ActorsListPage
        title="Popular actors"
        actors={actors}
        action={(actor) => {
          return <AddToFavouriteActorsIcon actor={actor} />
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

export default PopularActorsPage;
