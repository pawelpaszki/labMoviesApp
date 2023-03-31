import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from "../../contexts/AuthProvider";
import { supabase, addToFavouriteActors, removeFavouriteActor } from "../../supabase/client";

const AddToFavouriteActorsIcon = ({ actor }) => {
  const { user, loading } = useAuth();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [favourite, setFavourite] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    if (!loading) {
      setLoggedIn(user !== null);
      setFavourite(actor?.favourite ? true : false);
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

  const add = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await addToFavouriteActors(user.user.id, actor.id);
    setFavourite(true);
    actor.favourite=true;
    setUpdating(false);
  };

  const remove = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await removeFavouriteActor(user.user.id, actor.id);
    setFavourite(false);
    actor.favourite = false;
    setUpdating(false);
  };

  return (
    <>
      {loggedIn && !updating? (
        <>
          {favourite ? (
            <IconButton aria-label="favourite" onClick={remove}>
              <FavoriteIcon color="primary" fontSize="large" />
            </IconButton>
          ) : (
            <IconButton aria-label="add to favorites" onClick={add}>
              <FavoriteBorderIcon color="primary" fontSize="large" />
            </IconButton>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddToFavouriteActorsIcon;
