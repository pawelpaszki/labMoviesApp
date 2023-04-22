import React, { useEffect } from "react";
import Movie from "../tvSeriesCard";
import Grid from "@mui/material/Grid";
import { getFavouriteCollection } from "../../api/tmdb-api";

const TvSeriesList = ({ tvSeries, action, rearrangeFavourites, listSize, disableReload }) => {
  // const { user, loading } = useAuth();
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  useEffect(() => {
    if (!window.location.pathname.includes("favourites") && !disableReload) {
      setTimeout(async () => getFavourites(), 100);
    } else {
      setDisplayedMovies(tvSeries)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getFavourites() {
    const favourites = await getFavouriteCollection("tv");
    let movieList = [];
      for (const movie of tvSeries) {
        if(favourites.some(f => f.toString() === movie.id.toString())) {
          movie.favourite = true;
        } else {
          movie.favourite = false
        }
        movieList.push(movie);
      }
    setDisplayedMovies(movieList);
    setFetched(true);
  }
  if (displayedMovies.length > 0 && tvSeries.length > 0 && displayedMovies[0].id !== tvSeries[0].id) {
    getFavourites();
  }
  let movieCards = displayedMovies.map((m, index) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie
        key={m.id}
        movie={m}
        action={action}
        rearrangeFavourites={rearrangeFavourites}
        listSize={listSize}
        index={index}
      />
    </Grid>
  ));
  return movieCards;
};

export default TvSeriesList;
