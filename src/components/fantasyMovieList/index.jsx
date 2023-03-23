import React from "react";
import Movie from "../fantasyMovieCard";
import Grid from "@mui/material/Grid";

const FantasyMovieList = ({ movies }) => {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} />
    </Grid>
  ));
  return movieCards;
};

export default FantasyMovieList;
