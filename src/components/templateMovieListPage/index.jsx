import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

function MovieListPageTemplate({ movies, title, selectFavourite }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          selectFavourite={selectFavourite}
          movies={movies}
        ></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
