import React from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateMovieListPage";
import { getMovie, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import AddToFavouriteMoviesIcon from '../components/cardIcons/addToFavouriteMovies';
import Pagination from "../components/pagination";

const SimilarMoviesPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );
  const [page, setPage] = React.useState(1)
  const { isL,
    isE,
    e,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['similar', page],
    queryFn: () => getSimilarMovies(page, id),
    keepPreviousData: true
  });

  if (isLoading || isL) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isE) {
    return <h1>{e.message}</h1>;
  }

  const movies = data ? data.results : [];

  const title = `Movies similar to: ${movie.title}`;

  return (
    <>
      {movie && movies ? (
        <>
          <PageTemplate
            title={title}
            movies={movies}
            action={(movie) => {
              return <AddToFavouriteMoviesIcon movie={movie} />
            }}
          />
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
      <Pagination data={data} page={page} setPage={setPage}/>
    </>
  );
};

export default SimilarMoviesPage;
