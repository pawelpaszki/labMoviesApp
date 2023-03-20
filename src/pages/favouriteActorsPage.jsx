import React, { useContext } from "react";
import ActorsListPage from "../components/actorsListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";

const FavouriteActorsPage = () => {
  const { favouriteActors: actorIds } = useContext(MoviesContext);

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

  return (
    <>
      <ActorsListPage
        title="Favourite Actors"
        actors={displayActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFavouriteActors actor={actor} />
            </>
          );
        }}
      />
    </>
  );
};

export default FavouriteActorsPage;
