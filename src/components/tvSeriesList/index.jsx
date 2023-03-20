import React from "react";
import Movie from "../tvSeriesCard";
import Grid from "@mui/material/Grid";

const TvSeriesList = ({ tvSeries, action }) => {
  let movieCards = tvSeries.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
  ));
  return movieCards;
};

export default TvSeriesList;
