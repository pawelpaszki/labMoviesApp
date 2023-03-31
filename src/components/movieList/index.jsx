import React, { useEffect } from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";
import { getFavouriteMovies, } from "../../supabase/client";
import { useAuth } from "../../contexts/AuthProvider";

const MovieList = ({ movies, action, rearrangeFavourites, listSize, disableReload }) => {
  const { user, loading } = useAuth();
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  useEffect(() => {
    if (!window.location.pathname.includes("favourites") && !disableReload) {
      if (!disableReload && !loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        setTimeout(async () => getFavourites(user?.user.id), 100);
      } else {
        setTimeout(async () => getFavourites(user?.user.id), 200);
      }
    } else {
      setDisplayedMovies(movies)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getFavourites(userId) {
    const favourites = await getFavouriteMovies(userId);
    let movieList = [];
      for (const movie of movies) {
        if(favourites.some(f => f.movie_id === movie.id)) {
          movie.favourite = true;
        } else {
          movie.favourite = false
        }
        movieList.push(movie);
      }
    setDisplayedMovies(movieList);
    setFetched(true);
  }
  if (displayedMovies.length > 0 && movies.length > 0 && displayedMovies[0].id !== movies[0].id && user !== null && !loading) {
    getFavourites(user?.user.id);
  }
  let movieCards = displayedMovies.map((m, index) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie
        key={m.id}
        movie={m}
        action={action}
        rearrangeFavourites={rearrangeFavourites}
        listSize={listSize}
        index={index}
      />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;
