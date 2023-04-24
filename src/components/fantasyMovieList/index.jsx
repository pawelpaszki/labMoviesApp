import React from "react";
import Movie from "../fantasyMovieCard";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

const FantasyMovieList = ({ title, movies }) => {
  return (
    <>
      <Grid container sx={styles.root}>
        <Grid key={title} item xs={12}>
          <Header title={title} />
        </Grid>
        {movies.map((m) => (
          <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Movie key={m.id} movie={m} />
          </Grid>
        ))}
      </Grid>
    </>
  )
};

export default FantasyMovieList;
