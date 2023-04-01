import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FantasyMovieDetails from '../components/fantasyMovieDetails';
import Spinner from '../components/spinner'
import { getFantasyMovieById, getFantasyMovieCast } from "../supabase/client";

const FantasyMovieDetailsPage = () => {
  const [movie, setMovie] = React.useState(undefined);
  const [cast, setCast] = React.useState([]);

  const { id } = useParams();
  const [fetched, setFetched] = React.useState(false);

  async function getMovie(id) {
    const fetchedMovie = await getFantasyMovieById(id);
    setMovie(fetchedMovie);
    const fetchedCast = await getFantasyMovieCast(fetchedMovie.id);
    setCast(fetchedCast);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(async () => getMovie(id), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
