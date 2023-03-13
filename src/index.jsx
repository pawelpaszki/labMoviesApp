import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages//upcomingMoviesPage"
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import AuthProvider from "./contexts/AuthProvider";
import AuthRoute from "./components/auth";
import Register from "./pages/register";
import Login from "./pages/login";

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
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route element={<AuthRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>

          </MoviesContextProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
