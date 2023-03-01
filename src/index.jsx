import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages//upcomingMoviesPage"
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'

const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />      {/* New Header  */}
      <Routes>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
