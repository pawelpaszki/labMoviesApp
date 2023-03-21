import React from "react";
import ActorsListPage from "../components/actorsListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getPopularActors } from "../api/tmdb-api";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";
import Pagination from "../components/pagination";

const PopularActorsPage = (props) => {
  const [page, setPage] = React.useState(1)
  const { isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['popularActors', page],
    queryFn: () => getPopularActors(page),
    keepPreviousData: true
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];

  return (
    <>
      <ActorsListPage
        title="Popular actors"
        actors={actors}
        action={(actor) => {
          return <AddToFavouriteActorsIcon actor={actor} />
        }}
      />
      <Pagination data={data} page={page} setPage={setPage}/>
    </>
  );
};

export default PopularActorsPage;
