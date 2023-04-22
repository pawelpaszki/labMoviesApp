import React, { useEffect } from "react";
import Actor from "../actorCard";
import Grid from "@mui/material/Grid";
import { getFavouriteActors } from "../../api/tmdb-api";

const ActorsList = ({ actors, action, rearrangeFavourites, listSize, disableReload }) => {
  const [displayedActors, setDisplayedActors] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  useEffect(() => {
    if (!window.location.pathname.includes("favourites") && !disableReload) {
      setTimeout(async () => getFavourites(), 100);
    } else {
      setDisplayedActors(actors)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getFavourites() {
    const favourites = await getFavouriteActors();
    let actorList = [];
      for (const actor of actors) {
        if(favourites.some(f => f === actor.id)) {
          actor.favourite = true;
        } else {
          actor.favourite = false
        }
        actorList.push(actor);
      }
    setDisplayedActors(actorList);
    setFetched(true);
  }
  if (displayedActors.length > 0 && actors.length > 0 && displayedActors[0].id !== actors[0].id) {
    getFavourites();
  }
  let actorCards = displayedActors.map((m, index) => (
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
