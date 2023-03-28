import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TvSeriesList from "../tvSeriesList";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

function TvSeriesListPageTemplate({ tvSeries, title, action, rearrangeFavourites, listSize }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TvSeriesList
          action={action}
          tvSeries={tvSeries}
          rearrangeFavourites={rearrangeFavourites}
          listSize={listSize} />
      </Grid>
    </Grid>
  );
}
export default TvSeriesListPageTemplate;