import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getFavouriteMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { getPlaylist } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";
import { useParams } from "react-router-dom";

const PlaylistPage = () => {
  const { id } = useParams();
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const { user, loading } = useAuth();

  async function getFavourites(userId) {
    const playlist = await getPlaylist(userId, id);
    console.log(playlist);
    if (playlist.length > 0) {
      setTitle(`Playlist: ${playlist[0].title}. Theme: ${playlist[0].theme}`);
      console.log(playlist);
      let movies = [];
      for (const m of playlist[0].movies) {
        const movie = await getFavouriteMovie(m);
        movies.push(movie);
      }
      setDisplayedMovies(movies);
      setFetched(true);
    } else {
      setTitle('Playlist not found!');
      setFetched(true);
      setDisplayedMovies([]);
    }
  }

  useEffect(() => {
    if (!loading) {
      if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        setTimeout(async () => getFavourites(user?.user.id), 100);
      } else {
        setTimeout(async () => getFavourites(user?.user.id), 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  return (
    <>
      <PageTemplate
        title={title}
        movies={displayedMovies}
        action={(movie) => null}
      />
    </>
  );
};

export default PlaylistPage;
