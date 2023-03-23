import React, { useContext } from "react";
import { useQueries } from "react-query";
import List from "../components/fantasyMovieList";
import { MoviesContext } from "../contexts/moviesContext";
import Spinner from "../components/spinner";

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