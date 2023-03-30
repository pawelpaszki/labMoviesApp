import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAuth } from "../../contexts/AuthProvider";
import { supabase, removeFavouriteTvSeries } from "../../supabase/client";

const RemoveFromFavouriteTvSeriesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { user, loading } = useAuth();
  const [loggedIn, setLoggedIn] = React.useState(false);

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

  const onUserRequest = async (e) => {
    e.preventDefault();
    context.removeFromFavouriteTvSeries(movie);
    await removeFavouriteTvSeries(user.user.id, movie.id);
    window.location.reload(false);
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={onUserRequest}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouriteTvSeriesIcon;
