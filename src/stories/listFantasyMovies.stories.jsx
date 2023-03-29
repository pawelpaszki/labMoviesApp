import React from "react";
import MovieList from "../components/fantasyMovieList";
import SampleMovie from "./sampleFantasyMovie";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Fantasy Movies/MovieList",
  component: MovieList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
      />
    </Grid>
  );
};
Basic.storyName = "Default";

export const Exception = () => {
  const movies = [
    { ...SampleMovie, id: 1, poster_path: undefined },
    { ...SampleMovie, id: 2, poster_path: undefined },
    { ...SampleMovie, id: 3, poster_path: undefined },
    { ...SampleMovie, id: 4, poster_path: undefined },
    { ...SampleMovie, id: 5, poster_path: undefined },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
      />
    </Grid>
  );
};
Exception.storyName = "exception";
