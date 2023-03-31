import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FantasyMovieDetails from '../components/fantasyMovieDetails';
import Spinner from '../components/spinner'
import { getFantasyMovieById } from "../supabase/client";

const FantasyMovieDetailsPage = () => {
  const [movie, setMovie] = React.useState(undefined);

  const { id } = useParams();
  const [fetched, setFetched] = React.useState(false);

  async function getMovie(id) {
    const fetchedMovie = await getFantasyMovieById(id);
    setMovie(fetchedMovie);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(async () => getMovie(id), 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!fetched) {
    return <Spinner />;
  }

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
