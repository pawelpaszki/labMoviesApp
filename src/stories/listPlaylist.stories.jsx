import React from "react";
import ListPlaylist from "../components/playlistList";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Playlist list/list",
  component: ListPlaylist,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const playlists = [
    { id: "123", title: "scary movies to see", theme: "scary", movies: [12345, 23456] },
    { id: "123", title: "funny movies to see", theme: "comedies", movies: [12345, 23456] },
  ];
  return (
    <Grid container>
      <ListPlaylist
        playlists={playlists}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
