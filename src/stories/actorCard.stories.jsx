import React from "react";
import ActorCard from "../components/actorCard";
import sampleActor from "./sampleActor";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";

export default {
  title: "Popular Actors/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <ActorCard
      actor={sampleActor}
      action={(actor) => <AddToFavouriteActorsIcon actor={sampleActor} />}
      taging={(actor) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...sampleActor, profile_path: undefined };
  return (
    <ActorCard
      actor={sampleNoPoster}
      action={(actor) => <AddToFavouriteActorsIcon actor={sampleActor} />}
      taging={(actor) => null}
    />
  );
};
Exceptional.storyName = "exception";
