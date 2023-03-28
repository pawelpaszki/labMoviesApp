import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action, rearrangeFavourites, listSize }) => {
  let movieCards = movies.map((m, index) => (
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
