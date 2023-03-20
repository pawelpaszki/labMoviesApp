import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavouriteTvSeriesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromFavouriteTvSeries(movie);
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
