import React, { useEffect } from "react";
import Actor from "../actorCard";
import Grid from "@mui/material/Grid";
import { getFavouriteActors } from "../../supabase/client";
import { useAuth } from "../../contexts/AuthProvider";

const ActorsList = ({ actors, action, rearrangeFavourites, listSize, disableReload }) => {
  const { user, loading } = useAuth();
  const [displayedActors, setDisplayedActors] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  useEffect(() => {
    if (!window.location.pathname.includes("favourites") && !disableReload) {
      if (!disableReload && !loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        getFavourites(user?.user.id);
      } else {
        setTimeout(() => window.location.reload(false), 200);
      }
    } else {
      setDisplayedActors(actors)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getFavourites(userId) {
    const favourites = await getFavouriteActors(userId);
    let actorList = [];
      for (const actor of actors) {
        if(favourites.some(f => f.actor_id === actor.id)) {
          actor.favourite = true;
        } else {
          actor.favourite = false
        }
        actorList.push(actor);
      }
    setDisplayedActors(actorList);
    setFetched(true);
  }
  if (displayedActors.length > 0 && actors.length > 0 && displayedActors[0].id !== actors[0].id && user !== null) {
    getFavourites(user?.user.id);
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
