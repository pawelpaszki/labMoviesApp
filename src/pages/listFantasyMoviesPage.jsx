import React, { useContext } from "react";
import List from "../components/fantasyMovieList";
import { MoviesContext } from "../contexts/moviesContext";

const ListFantasyMoviesPage = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  return (
    <>
      <List
        title="Fantasy movies list"
        movies={fantasyMovies}
      />
    </>
  );
};

export default ListFantasyMoviesPage;