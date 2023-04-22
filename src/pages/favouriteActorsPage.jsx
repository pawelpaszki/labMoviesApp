import React, { useEffect } from "react";
import ActorsListPage from "../components/actorsListPage";
import Spinner from "../components/spinner";
import { getFavouriteCollection, getActorDetails } from "../api/tmdb-api";

const FavouriteActorsPage = () => {
  const [fetched, setFetched] = React.useState(false);
  const [displayedActors, setDisplayedActors] = React.useState([]);

  async function getFavourites() {
    const favourites = await getFavouriteCollection("actors");
    let actors = [];
    for (const favourite of favourites) {
      const actor = await getActorDetails({ id: favourite });
      actors.push(actor);
    }
    setDisplayedActors(actors);
    setFetched(true);
  }

  useEffect(() => {
    setTimeout(async () => getFavourites(), 100);
  }, []);

  if (!fetched) {
    return <Spinner />;
  }

  return (
    <>
      <ActorsListPage
        title="Favourite Actors"
        actors={displayedActors}
        action={(actor) => null}
        listSize={displayedActors.length}
      />
    </>
  );
};

export default FavouriteActorsPage;
