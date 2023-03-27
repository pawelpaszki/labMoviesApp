import React from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddToFavouriteTvSeriesIcon from "../components/cardIcons/addToFavouriteTvSeries";
import Pagination from "../components/pagination";
import { sortCollection, tvSeriesSortKeys } from "../util";

const titleFiltering = {
  name: "original_name",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TvSeriesPage = (props) => {
  const [page, setPage] = React.useState(1)
  const [displayedTvSeries, setDisplayedTvSeries] = React.useState([]);
  const [loadingFinished, setLoadingFinished] = React.useState(false);
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
      type === "original_name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const onSortChange = (key, ascending, numeric) => {
    let unsortedMovies = [...displayedTvSeries];
    let sortedMovies = unsortedMovies.sort(sortCollection(key, ascending, numeric));
    setDisplayedTvSeries(sortedMovies);
  }

  const titleKey="original_name"

  const tvSeries = data ? data.results : [];
  if (!loadingFinished && tvSeries.length > 0) {
    setDisplayedTvSeries(filterFunction(tvSeries));
    setLoadingFinished(true);
  }

  const handleSetPage = async (number) => {
    setPage(number);
    let moviesResults = await getSeries(number);
    if (moviesResults && moviesResults.results.length > 0) {
      setDisplayedTvSeries(moviesResults.results);
    }
  }

  return (
    <>
      <PageTemplate
        title="Discover Tv series"
        tvSeries={displayedTvSeries}
        action={(movie) => {
          return <AddToFavouriteTvSeriesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={onSortChange}
        sortKeys={tvSeriesSortKeys}
        titleKey={titleKey}
      />
      <Pagination data={data} page={page} setPage={handleSetPage} />
    </>
  );
};

export default TvSeriesPage;
