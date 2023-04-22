import React, { useEffect } from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";
// import { getPlaylists} from "../../supabase/client";
import { getFavouriteMovies } from "../../api/tmdb-api";

const MovieList = ({ movies, action, rearrangeFavourites, listSize, disableReload }) => {
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [playlistArray, setPlaylistArray] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  useEffect(() => {
    if (!window.location.pathname.includes("favourites") && !disableReload) {
      setTimeout(async () => getUserData(), 100);
    } else {
      setDisplayedMovies(movies)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getUserData() {
    const favourites = await getFavouriteMovies();
    // const playlists = await getPlaylists(userId);
    // setPlaylistArray(playlists);
    let movieList = [];
      for (const movie of movies) {
        if(favourites.some(f => f.toString() === movie.id.toString())) {
          movie.favourite = true;
        } else {
          movie.favourite = false
        }
        movieList.push(movie);
      }
    setDisplayedMovies(movieList);
    setFetched(true);
  }
  if (displayedMovies.length > 0 && movies.length > 0 && displayedMovies[0].id !== movies[0].id) {
    getUserData();
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
        playlistsArray={playlistArray}
      />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;
