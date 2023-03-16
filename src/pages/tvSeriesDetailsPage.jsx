import React from "react";
import { useParams } from "react-router-dom";
import TvSeriesDetails from "../components/tvSeriesDetails";
import PageTemplate from "../components/templateTvSeriesPage";
import { getTvSeriesById } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const TvSeriesDetailsPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["tvSeries", { id: id }],
    getTvSeriesById
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <TvSeriesDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for tv series details</p>
      )}
    </>
  );
};

export default TvSeriesDetailsPage;
