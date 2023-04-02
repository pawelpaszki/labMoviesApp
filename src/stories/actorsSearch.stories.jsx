import React from "react";
import ActorsSearchPage from "../pages/actorsSearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient } from "react-query";
import MoviesContextProvider from "../contexts/moviesContext";
import sampleActor from "./sampleActor";
import Grid from "@mui/material/Grid";
import ActorsList from "../components/actorsList";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default {
  title: "actors Search/ActorsList",
  component: ActorsSearchPage,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <Grid container>
      <ActorsSearchPage/>
    </Grid>
  );
};
Basic.storyName = "search not populated";

export const Populated = () => {
  const actors = [
    { ...sampleActor, id: 1 },
    { ...sampleActor, id: 2 },
    { ...sampleActor, id: 3 },
    { ...sampleActor, id: 4 },
    { ...sampleActor, id: 5 },
  ];
  return (
    <Grid container>
      <ActorsList
        actors={actors}
        searchResultLoaded={true}
        action={(actor) => <AddToFavouriteActorsIcon actor={actor} />}
      />
    </Grid>
  );
};
Populated.storyName = "search populated";