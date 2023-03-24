import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import FantasyMovieDetails from '../components/fantasyMovieDetails';
import PageTemplate from "../components/templateActorPage";
import { getActorDetails } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { MoviesContext } from "../contexts/moviesContext";

const FantasyMovieDetailsPage = () => {
  const { id } = useParams();
  const { fantasyMovies } = useContext(MoviesContext);
  const [movie, setMovie] = React.useState(undefined);
  if (movie === undefined && fantasyMovies !== undefined && fantasyMovies.length !== 0) {
    fantasyMovies.forEach(movie => {
      if (movie.id === id) {
        setMovie(movie);
      }
    })
  };

  console.log(movie);

  // let movie = undefined;

  // const { data: actor, error, isLoading, isError } = useQuery(
  //   ["actor", { id: id }],
  //   getActorDetails
  // );

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>;
  // }

  return (
    <>
      {movie ? (
        <>
          <FantasyMovieDetails movie={movie} />
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default FantasyMovieDetailsPage;
