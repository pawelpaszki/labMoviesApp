import React, { useEffect } from "react";
import ActorsListPage from "../components/actorsListPage";
import Spinner from "../components/spinner";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import { rearrangeList } from "../util";
import { getFavouriteActor } from "../api/tmdb-api";
import { getFavouriteActors, updateFavouriteActorOrder } from "../supabase/client";
import { useAuth } from "../contexts/AuthProvider";

const FavouriteActorsPage = () => {
  const [fetched, setFetched] = React.useState(false);
  const { user, loading } = useAuth();
  const [displayedActors, setDisplayedActors] = React.useState([]);

  useEffect(() => {
    if (!loading) {
      if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
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
        getFavourites(user.user.id);
      } else {
        setTimeout(() => window.location.reload(false), 200);
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
    console.log();
    const rearranged = [...rearrangeList(displayedActors, swapA, swapB)];
    setDisplayedActors(rearranged);
    await updateFavouriteActorOrder(user.user.id, actorA.id, actorB.id);
    window.location.reload(false);
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
