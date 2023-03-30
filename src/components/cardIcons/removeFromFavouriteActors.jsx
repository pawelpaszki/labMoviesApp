import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAuth } from "../../contexts/AuthProvider";
import { supabase, removeFavouriteActor } from "../../supabase/client";

const RemoveFromFavouriteActorsIcon = ({ actor }) => {
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
    context.removeFromFavouriteActors(actor);
    console.log(actor);
    await removeFavouriteActor(user.user.id, actor.id);
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

export default RemoveFromFavouriteActorsIcon;
