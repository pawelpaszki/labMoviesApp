import React from "react";
import ActorsList from "../components/actorsList";
import sampleActor from "./sampleActor";
import { MemoryRouter } from "react-router";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Popular Actors/ActorsList",
  component: ActorsList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const actors = [
    { ...sampleActor, id: 1 },
    { ...sampleActor, id: 2 },
    { ...sampleActor, id: 3 },
    { ...sampleActor, id: 4 },
    { ...sampleActor, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <ActorsList
        actors={actors}
        action={(actor) => <AddToFavouriteActorsIcon actor={actor} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";