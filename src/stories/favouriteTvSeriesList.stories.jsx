import React from "react";
import MovieList from "../components/tvSeriesList";
import sampleTv from "./sampleTv";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Favourite Tv Series List/TvSeriesList",
  component: MovieList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const movies = [
    { ...sampleTv, id: 1 },
    { ...sampleTv, id: 2 },
    { ...sampleTv, id: 3 },
    { ...sampleTv, id: 4 },
    { ...sampleTv, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        tvSeries={movies}
        action={(movie) => null}
        disableReload={true}
        listSize={5}
        index={3}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
