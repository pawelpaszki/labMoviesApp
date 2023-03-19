import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorsList from "../actorslist";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

function ActorsListPage({ actors, title, action }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <ActorsList action={action} actors={actors} />
      </Grid>
    </Grid>
  );
}
export default ActorsListPage;
