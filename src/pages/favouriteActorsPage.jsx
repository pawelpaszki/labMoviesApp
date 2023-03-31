import React, { useEffect } from "react";
import ActorsListPage from "../components/actorsListPage";
import Spinner from "../components/spinner";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import { getFavouriteActor } from "../api/tmdb-api";
import { getFavouriteActors, updateFavouriteActorOrder } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";

const FavouriteActorsPage = () => {
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();
  const [displayedActors, setDisplayedActors] = React.useState([]);

  async function getFavourites(userId) {
    const favourites = await getFavouriteActors(userId);
    let actors = [];
    for (const favourite of favourites) {
      const actor = await getFavouriteActor(favourite.actor_id);
      actors.push(actor);
    }
    setDisplayedActors(actors);
    setFetched(true);
  }

  useEffect(() => {
    if (!loading) {
      if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
        getFavourites(user.user.id);
      } else {
        setTimeout(() => getFavourites(user.user.id), 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  const rearrangeFavourites = async (swapA, swapB) => {
    const actorA = displayedActors[swapA];
    const actorB = displayedActors[swapB];
    setFetched(false);
    await updateFavouriteActorOrder(user.user.id, actorA.id, actorB.id);
    setTimeout(async () => await getFavourites(user.user.id), 500);
  }

  return (
    <>
      <ActorsListPage
        title="Favourite Actors"
        actors={displayedActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFavouriteActors actor={actor} />
            </>
          );
        }}
        rearrangeFavourites={rearrangeFavourites}
        listSize={displayedActors.length}
      />
    </>
  );
};

export default FavouriteActorsPage;
