import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToFavouriteMoviesIcon from '../components/cardIcons/addToFavouriteMovies';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import "./footerStyle/styles.css";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage = (props) => {
  const [page, setPage] = React.useState(1)
  const { isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['discover', page],
    queryFn: () => getMovies(page),
    keepPreviousData: true
  });
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouriteMoviesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
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

export default HomePage;
