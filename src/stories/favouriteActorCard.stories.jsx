import React from "react";
import ActorCard from "../components/actorCard";
import sampleActor from "./sampleActor";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Favourite Actors/ActorCard",
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
      action={(actor) => null }
    />
  );
};
Basic.storyName = "Default";

export const Arrangeable = () => {
  return (
    <ActorCard
      actor={sampleActor} listSize={5} index={3}
      action={(actor) => null }
    />
  );
};
Arrangeable.storyName = "rearrange";

export const ArrangeableLeftDisabled = () => {
  return (
    <ActorCard
      actor={sampleActor} listSize={5} index={0}
      action={(actor) => null }
    />
  );
};
ArrangeableLeftDisabled.storyName = "rearrangeLeftDisabled";

export const ArrangeableRightDisabled = () => {
  return (
    <ActorCard
      actor={sampleActor} listSize={5} index={4}
      action={(actor) => null }
    />
  );
};
ArrangeableRightDisabled.storyName = "rearrangeRightDisabled";

export const Exceptional = () => {
  const sampleNoPoster = { ...sampleActor, profile_path: undefined };
  return (
    <ActorCard
      actor={sampleNoPoster}
      action={(actor) => null }
    />
  );
};
Exceptional.storyName = "exception";
