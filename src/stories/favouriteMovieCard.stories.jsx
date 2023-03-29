import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleMovie";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouriteMoviesIcon from "../components/cardIcons/addToFavouriteMovies";

export default {
  title: "Favourite Movies/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => null}
    />
  );
};
Basic.storyName = "Default";

export const Arrangeable = () => {
  return (
    <MovieCard
      movie={SampleMovie} listSize={5} index={3}
      action={(movie) => null}
    />
  );
};
Arrangeable.storyName = "rearrange";

export const ArrangeableLeftDisabled = () => {
  return (
    <MovieCard
      movie={SampleMovie} listSize={5} index={0}
      action={(movie) => null}
    />
  );
};
ArrangeableLeftDisabled.storyName = "rearrangeLeftDisabled";

export const ArrangeableRightDisabled = () => {
  return (
    <MovieCard
      movie={SampleMovie} listSize={5} index={4}
      action={(movie) => null}
    />
  );
};
ArrangeableRightDisabled.storyName = "rearrangeRightDisabled";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
  return (
    <MovieCard
      movie={sampleNoPoster}
      action={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
