import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FantasyMovieDetails from '../components/fantasyMovieDetails';
import Spinner from '../components/spinner'
import { getFantasyMovie } from "../api/tmdb-api";

const FantasyMovieDetailsPage = () => {
  const [movie, setMovie] = React.useState(undefined);
  const [cast, setCast] = React.useState([]);

  const { id } = useParams();
  const [fetched, setFetched] = React.useState(false);

  async function getMovie() {
    const fetchedMovie = await getFantasyMovie(id);
    setMovie(fetchedMovie);
    setCast(fetchedMovie.cast);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(async () => getMovie(), 50);
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  async function reload() {
    setFetched(false);
    await getMovie(id);
    setFetched(true);
  }

  return (
    <>
      {movie ? (
        <>
          <FantasyMovieDetails movie={movie} movieCast={cast} reload={reload}/>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default FantasyMovieDetailsPage;
