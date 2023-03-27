import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import useFiltering from "../hooks/useFiltering";
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import Pagination from "../components/pagination";
import { sortCollection, movieSortKeys } from "../util";

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

const UpcomingMoviesPage = (props) => {
  const [page, setPage] = React.useState(1);
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [loadingFinished, setLoadingFinished] = React.useState(false);
  const { isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['upcoming', page],
    queryFn: () => getUpcomingMovies(page),
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
    setLoadingFinished(false);
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const onSortChange = (key, ascending, numeric) => {
    let unsortedMovies = [...displayedMovies];
    let sortedMovies = unsortedMovies.sort(sortCollection(key, ascending, numeric));
    setDisplayedMovies(sortedMovies);
  }

  const movies = data ? data.results : [];
  if (!loadingFinished && movies.length > 0) {
    setDisplayedMovies(filterFunction(movies));
    setLoadingFinished(true);
  }

  const handleSetPage = async (number) => {
    setPage(number);
    let moviesResults = await getMovies(number);
    if (moviesResults && moviesResults.results.length > 0) {
      setDisplayedMovies(moviesResults.results);
    }
  }

  const titleKey = "title";

  return (
    <>
      <PageTemplate
        title='Upcoming Movies'
        movies={displayedMovies}
        action={(movie) => {
          return <AddToMustWatchIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        titleKey={titleKey}
        onSortChange={onSortChange}
        sortKeys={movieSortKeys}
      />
      <Pagination data={data} page={page} setPage={handleSetPage} />
    </>
  );
};
export default UpcomingMoviesPage;
