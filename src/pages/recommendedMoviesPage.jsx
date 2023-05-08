import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import EmptyRecommendedPageTemplate from "../components/emptyRecommendedMovieListPage";
import Spinner from "../components/spinner";
import { getFavouriteCollection, getRecommendedMovies } from "../api/tmdb-api";
import AddToFavouriteMoviesIcon from '../components/cardIcons/addToFavouriteMovies';

const RecommendedMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  async function getFavourites() {
    const favourites = await getFavouriteCollection("movies");
    const movies = await getRecommendedMovies(favourites);
    setDisplayedMovies(movies);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(async () => getFavourites(), 100);
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  return (
    <>
      {fetched ? (
        <>
          {displayedMovies.length > 0 ? (
            <PageTemplate
              title="Recommended Movies"
              movies={displayedMovies}
              action={(movie) => {
                return <AddToFavouriteMoviesIcon movie={movie} />
              }}
            />
          ) : (
            <>
              <EmptyRecommendedPageTemplate
                title="Recommended Movies"
              />
            </>
          )}
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default RecommendedMoviesPage;
