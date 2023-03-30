import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../contexts/AuthProvider";
import { supabase, addToFavouriteMovies } from "../../supabase/client";

const AddToFavouriteMoviesIcon = ({ movie }) => {
  const { user, loading } = useAuth();
  const [loggedIn, setLoggedIn] = React.useState(false)
  const context = useContext(MoviesContext);

  React.useEffect(() => {
    if (!loading) {
      setLoggedIn(user !== null);
    }
  });

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, _session) => {
        setLoggedIn(_session !== null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  const onUserSelect = async (e) => {
    e.preventDefault();
    context.addToFavouriteMovies(movie);
    await addToFavouriteMovies(user.user.id, movie.id);
    window.location.reload(false);
  };
  return (
    <>
      {loggedIn ? (
        <>
          <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon color="primary" fontSize="large" />
          </IconButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddToFavouriteMoviesIcon;
