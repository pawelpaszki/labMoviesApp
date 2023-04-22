import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToFavouriteCollection, removeFromFavouriteCollection } from "../../api/tmdb-api";

const AddToFavouriteMoviesIcon = ({ movie }) => {
  const [favourite, setFavourite] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    setFavourite(movie?.favourite ? true : false);
  });

  const add = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await addToFavouriteCollection({movieId: movie.id}, "movies");
    setFavourite(true);
    movie.favourite = true;
    setUpdating(false);
  };

  const remove = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await removeFromFavouriteCollection(movie.id, "movies");
    setFavourite(false);
    movie.favourite = false;
    setUpdating(false);
  };

  return (
    <>
      {!updating ? (
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

export default AddToFavouriteMoviesIcon;
