import React from "react";
import CastMemberCard from "../components/castMemberCard";
import sampleFantasyMovie from "./sampleFantasyMovie";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Fantasy Movie Details Page/CastMemberCard",
  component: CastMemberCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <CastMemberCard
      member={sampleFantasyMovie.cast[0]}
    />
  );
};
Basic.storyName = "Default";

// export const Exceptional = () => {
//   const sampleNoPoster = { ...sampleActor, profile_path: undefined };
//   return (
//     <ActorCard
//       actor={sampleNoPoster}
//       action={(actor) => <AddToFavouriteActorsIcon actor={sampleActor} />}
//       taging={(actor) => null}
//     />
//   );
// };
// Exceptional.storyName = "exception";
