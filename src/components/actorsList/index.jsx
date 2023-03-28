import React from "react";
import Actor from "../actorCard";

import Grid from "@mui/material/Grid";

const ActorsList = ({ actors, action, rearrangeFavourites, listSize }) => {
  let actorCards = actors.map((m, index) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Actor
        key={m.id}
        actor={m}
        action={action}
        rearrangeFavourites={rearrangeFavourites}
        listSize={listSize}
        index={index} />
    </Grid>
  ));
  return actorCards;
};

export default ActorsList;
