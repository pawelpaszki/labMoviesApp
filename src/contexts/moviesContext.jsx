import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteTvSeries, setFavouriteTvSeries] = useState([]);
  const [favouriteActors, setFavouriteActors] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  const addReview = (movie, review) => {   // NEW
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToFavouriteMovies = (movie) => {
    let updatedFavourites = [...favouriteMovies];
    if (!favouriteMovies.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavouriteMovies(updatedFavourites);
  };

  const addToFavouriteTvSeries = (movie) => {
    let updatedFavouriteTvSeries = [...favouriteTvSeries];
    if (!favouriteTvSeries.includes(movie.id)) {
      updatedFavouriteTvSeries.push(movie.id);
    }
    setFavouriteTvSeries(updatedFavouriteTvSeries);
  };

  const addToFavouriteActors = (actor) => {
    let updatedActors = [...favouriteActors];
    if (!favouriteActors.includes(actor.id)) {
      updatedActors.push(actor.id);
    }
    setFavouriteActors(updatedActors);
  };

  const addToMustWatch = (movie) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch.push(movie.id);
    }
    setMustWatch(updatedMustWatch);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavouriteMovies(favouriteMovies.filter((mId) => mId !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favouriteMovies,
        favouriteTvSeries,
        favouriteActors,
        mustWatch,
        addToFavouriteMovies,
        addToFavouriteTvSeries,
        addToMustWatch,
        addToFavouriteActors,
        removeFromFavourites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
