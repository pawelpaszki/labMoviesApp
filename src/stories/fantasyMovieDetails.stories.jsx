import React from "react";
import MovieDetails from "../components/fantasyMovieDetails";
import SampleMovie from "./sampleFantasyMovie";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Fantasy Movie Details Page/MovieDetails",
  component: MovieDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <MovieDetails movie={SampleMovie} />;

Basic.storyName = "Default";
