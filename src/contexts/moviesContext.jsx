import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [favouriteMovies, setFavouriteMoviess] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  const addReview = (movie, review) => {   // NEW
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToFavouriteMovies = (movie) => {
    let updatedFavourites = [...favouriteMovies];
    if (!favouriteMovies.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavouriteMoviess(updatedFavourites);
  };

  const addToMustWatch = (movie) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch.push(movie.id);
    }
    setMustWatch(updatedMustWatch);
    console.log(`updatedMustWatch" ${updatedMustWatch}`);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavouriteMovies(favouriteMovies.filter((mId) => mId !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favouriteMovies,
        mustWatch,
        addToFavouriteMovies,
        addToMustWatch,
        removeFromFavourites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
