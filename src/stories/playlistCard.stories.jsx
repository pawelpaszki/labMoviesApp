import React from "react";
import PlaylistCard from "../components/playlistCard";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Playlist/PlaylistCard",
  component: PlaylistCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const playlist =
    { id: "123", title: "scary movies to see", theme: "scary", movies: [12345, 23456] };
  return (
    <PlaylistCard
      playlist={playlist} />
  );
};
Basic.storyName = "Default";
