import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { rearrangeList } from "../util";

const FavouriteMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const { favouriteMovies: movieIds } = useContext(MoviesContext);
  const [loadingFinished, setLoadingFinished] = React.useState(false);

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  
  if (!loadingFinished && allFavourites.length > 0) {
    setDisplayedMovies(allFavourites);
    setLoadingFinished(true);
  }

  const rearrangeFavourites = (swapA, swapB) => {
    const rearranged = [...rearrangeList(displayedMovies, swapA, swapB)];
    setDisplayedMovies(rearranged);
  }

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
        rearrangeFavourites={rearrangeFavourites}
        listSize={displayedMovies.length}
      />
    </>
  );
};

export default FavouriteMoviesPage;
