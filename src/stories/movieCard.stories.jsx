import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { action } from "@storybook/addon-actions";
import AddToFavouriteMoviesIcon from "../components/cardIcons/addToFavouriteMovies";

export default {
  title: "Home Page/MovieCard",
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
      action={(movie) => <AddToFavouriteMoviesIcon movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
  return (
    <MovieCard
      movie={sampleNoPoster}
      action={(movie) => <AddToFavouriteMoviesIcon movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
