import React, { useContext } from "react";
import ActorsListPage from "../components/actorsListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import { rearrangeList } from "../util";

const FavouriteActorsPage = () => {
  const [displayedActors, setDisplayedActors] = React.useState([]);
  const { favouriteActors: actorIds } = useContext(MoviesContext);
  const [loadingFinished, setLoadingFinished] = React.useState(false);

  // Create an array of queries and run them in parallel.
  const favouriteActorsQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["movie", { id: actorId }],
        queryFn: getActorDetails,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteActorsQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const displayActors = favouriteActorsQueries.map((q) => q.data);

  if (!loadingFinished && displayActors.length > 0) {
    setDisplayedActors(displayActors);
    setLoadingFinished(true);
  }

  const rearrangeFavourites = (swapA, swapB) => {
    const rearranged = [...rearrangeList(displayedActors, swapA, swapB)];
    setDisplayedActors(rearranged);
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
        listSize={displayActors.length}
      />
    </>
  );
};

export default FavouriteActorsPage;
