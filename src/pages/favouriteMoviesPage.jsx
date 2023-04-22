import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getFavouriteCollection, getMovie } from "../api/tmdb-api";

const FavouriteMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  async function getFavourites() {
    const favourites = await getFavouriteCollection("movies");
    let movies = [];
    for (const favourite of favourites) {
      const movie = await getMovie({ id: favourite });
      movies.push(movie);
    }
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
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => null}
      />
    </>
  );
};

export default FavouriteMoviesPage;
