import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorsList from "../actorsList";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

function ActorsListPage({ actors, title, action, listSize }) {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <ActorsList
          action={action}
          actors={actors}
          listSize={listSize}
        />
      </Grid>
    </Grid>
  );
}
export default ActorsListPage;
