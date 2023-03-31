import React, { useEffect } from "react";
import List from "../components/fantasyMovieList";
import { getFantasyMovies } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";
import Spinner from "../components/spinner";

const ListFantasyMoviesPage = () => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        async function getFavourites(userId) {
          const favourites = await getFantasyMovies(userId);
          setDisplayedMovies(favourites);
          setFetched(true);
        }
        getFavourites(user.user.id);
      } else {
        setTimeout(() => getFavourites(user.user.id), 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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