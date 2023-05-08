import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";

const styles = {
  infoHeader: {
    margin: "1em",
  }
};

function EmptyRecommendedPageTemplate({ title }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container sx={styles.infoHeader}>
        <h2>You either don't have any favourites or they are not suitable for generating recommended movies</h2>
      </Grid>
    </Grid>
  );
}
export default EmptyRecommendedPageTemplate;
