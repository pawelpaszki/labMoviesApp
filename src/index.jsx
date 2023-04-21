import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages//upcomingMoviesPage"
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import FavouriteTvSeriesPage from "./pages/favouriteTvSeriesPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import AuthProvider from "./contexts/AuthProvider";
import AuthContextProvider from "./contexts/AuthenticationContext";
import AuthRoute from "./components/authRoute";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import SearchPage from "./pages/searchPage";
import TvSeriesPage from "./pages/tvSeriesPage";
import TvSeriesDetailsPage from "./pages/tvSeriesDetailsPage";
import PopularActorsPage from "./pages/popularActors";
import ActorDetailsPage from "./pages/actorDetailsPage";
import SimilarMoviesPage from "./pages/similarMoviesPage";
import SimilarTvSeriesPage from "./pages/similarTvSeriesPage";
import ActorsSearchPage from "./pages/actorsSearchPage";
import CreateFantasyMoviePage from "./pages/createFantasyMoviePage";
import ListFantasyMoviesPage from "./pages/listFantasyMoviesPage";
import FantasyMovieDetailsPage from "./pages/fantasyMovieDetailsPage";
import CreatePlaylistPage from "./pages/createPlaylistPage";
import PlaylistPage from "./pages/playlistPage";
import ListPlaylistsPage from './pages/listPlaylistsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AuthContextProvider>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route element={<AuthRoute />}>
                  <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/movies/:id/similar" element={<SimilarMoviesPage />} />
                  <Route path="/fantasy/create" element={<CreateFantasyMoviePage />} />
                  <Route path="/fantasy" element={<ListFantasyMoviesPage />} />
                  <Route path="/fantasy/:id" element={<FantasyMovieDetailsPage />} />
                  <Route path="/reviews/:id" element={<MovieReviewPage />} />
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                  <Route path="/upcoming" element={<UpcomingMoviesPage />} />
                  <Route path="/tv" element={<TvSeriesPage />} />
                  <Route path="/tv/favourites" element={<FavouriteTvSeriesPage />} />
                  <Route path="/tv/:id" element={< TvSeriesDetailsPage />} />
                  <Route path="/tv/:id/similar" element={<SimilarTvSeriesPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/actors" element={<PopularActorsPage />} />
                  <Route path="/actors/search" element={<ActorsSearchPage />} />
                  <Route path="/actors/favourites" element={<FavouriteActorsPage />} />
                  <Route path="/actors/:id" element={< ActorDetailsPage />} />
                  <Route path="/playlists/create/:id" element={< CreatePlaylistPage />} />
                  <Route path="/playlists/:id" element={< PlaylistPage />} />
                  <Route path="/playlists" element={< ListPlaylistsPage />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                  <Route path="/" element={<HomePage />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>

            </MoviesContextProvider>
          </AuthContextProvider>
        </AuthProvider>

      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
