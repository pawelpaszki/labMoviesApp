import React, { useEffect } from "react";
import List from "../components/fantasyMovieList";
import Spinner from "../components/spinner";
import { getFantasyMovies } from "../api/tmdb-api";

const ListFantasyMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  async function fetchFantasyMovies() {
    const movies = await getFantasyMovies();
    setDisplayedMovies(movies);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(() => fetchFantasyMovies(), 200);
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  return (
    <>
      <List
        title="Fantasy movies list"
        movies={displayedMovies}
      />
    </>
  );
};

export default ListFantasyMoviesPage;