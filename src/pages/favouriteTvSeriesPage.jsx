import React, { useContext } from "react";
import PageTemplate from "../components/templateTvSeriesListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTvSeriesById } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouriteTvSeries";
import { sortCollection, tvSeriesSortKeys } from "../util";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie, value) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteTvSeriesPage = () => {
  const [displayedTvSeries, setDisplayedTvSeries] = React.useState([]);
  const { favouriteTvSeries: movieIds } = useContext(MoviesContext);
  const [loadingFinished, setLoadingFinished] = React.useState(false);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteTvSeriesQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["tvSeriesById", { id: movieId }],
        queryFn: getTvSeriesById,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvSeriesQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvSeriesQueries.map((q) => q.data);
  const displayTvSeries = allFavourites
    ? filterFunction(allFavourites)
    : [];

  if (!loadingFinished && displayTvSeries.length > 0) {
    setDisplayedTvSeries(filterFunction(displayTvSeries));
    setLoadingFinished(true);
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "original_name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const titleKey = "original_name";

  const onSortChange = (key, ascending, numeric) => {
    let unsortedMovies = [...displayedTvSeries];
    let sortedMovies = unsortedMovies.sort(sortCollection(key, ascending, numeric));
    setDisplayedTvSeries(sortedMovies);
  }

  return (
    <>
      <PageTemplate
        title="Favourite Tv Series"
        tvSeries={displayedTvSeries}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
            </>
          );
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
    </>
  );
};

export default FavouriteTvSeriesPage;
