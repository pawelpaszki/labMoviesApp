import React from "react";
import MovieList from "../components/movieList";
import SampleMovie from "./sampleMovie";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Favourite Movies List/MovieList",
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
        disableReload={true}
        action={(movie) => null}
        listSize={5}
        index={3}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
