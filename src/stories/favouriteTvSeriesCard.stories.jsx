import React from "react";
import MovieCard from "../components/tvSeriesCard"
import SampleTv from "./sampleTv";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Favourite Tv Series/TvSeriesCard",
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <MovieCard
      movie={SampleTv}
      action={(movie) => null}
    />
  );
};
Basic.storyName = "Default";

export const Arrangeable = () => {
  return (
    <MovieCard
      movie={SampleTv} listSize={5} index={3}
      action={(movie) => null}
    />
  );
};
Arrangeable.storyName = "rearrange";

export const ArrangeableLeftDisabled = () => {
  return (
    <MovieCard
      movie={SampleTv} listSize={5} index={0}
      action={(movie) => null}
    />
  );
};
ArrangeableLeftDisabled.storyName = "rearrangeLeftDisabled";

export const ArrangeableRightDisabled = () => {
  return (
    <MovieCard
      movie={SampleTv} listSize={5} index={4}
      action={(movie) => null}
    />
  );
};
ArrangeableRightDisabled.storyName = "rearrangeRightDisabled";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleTv, poster_path: undefined };
  return (
    <MovieCard
      movie={sampleNoPoster}
      action={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
