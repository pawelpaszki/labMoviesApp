import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { createFantasyMovie } from "../../supabase/client";
import Alert from '@mui/material/Alert';

const CreateFantasyMovie = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenresDisplayValue, setSelectedGenresDisplayValue] = useState("");
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [runtime, setRuntime] = React.useState(1);
  const [moviePoster, setMoviePoster] = React.useState("");
  const [productionCompanies, setProductionCompanies] = React.useState("");
  const [createInitiated, setCreateInitiated] = React.useState(false);
  const [createFailed, setCreateFailed] = React.useState(false);
  const [alertText, setAlertText] = React.useState("movie creation failed! Try again.");

  if (isLoading || createInitiated) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
      setCreateInitiated(true);
      const { data, error } = await createFantasyMovie(
        user.user.id,
        title.trim(),
        overview.trim(),
        runtime,
        moviePoster.trim(),
        productionCompanies.split(',').map(item => item.trim()),
        selectedGenres,
        releaseDate
      );
      setCreateInitiated(false);
      if (error !== null) {
        setAlertText("movie creation failed! Try again.")
        setCreateFailed(true);
      } else {
        navigate("/fantasy");
      }
    } else {
      setAlertText("Unable to get user details. Please logout and log back in.")
    }
  };

  const updateSelectedGenres = (genre) => {
    let chosenGenre = genre.target.textContent;
    let updatedSelectedGenres = [...selectedGenres];
    if (!selectedGenres.includes(chosenGenre)) {
      updatedSelectedGenres.push(chosenGenre);
      setSelectedGenres(updatedSelectedGenres);
    } else {
      updatedSelectedGenres = updatedSelectedGenres.filter(value => value !== chosenGenre)
      setSelectedGenres(updatedSelectedGenres);
    }
    setSelectedGenresDisplayValue(`[ ${updatedSelectedGenres.toString()} ]`)
  }

  const genres = data.genres;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOverviewChange = (event) => {
    setOverview(event.target.value);
  };

  const handleSetRuntime = (event) => {
    setRuntime(event.target.value);
  };

  const handleSetMoviePoster = (event) => {
    setMoviePoster(event.target.value);
  }

  const handleSetProductionCompanies = (event) => {
    setProductionCompanies(event.target.value);
  }

  return (
    <Container component="main" maxWidth="s">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Create fantasy movie record
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                autoComplete="none"
                inputProps={{ minLength: 2 }}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="overview"
                label="Overview"
                name="overview"
                autoComplete="none"
                inputProps={{ minLength: 80 }}
                onChange={handleOverviewChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel id="release" style={{ display: "block", marginBottom: "6px", fontSize: "12px" }}>Release date*</FormLabel>
              <DatePicker selected={releaseDate} onChange={(date) => setReleaseDate(date)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                InputProps={{ inputProps: { min: 1, max: 600 } }}
                type="number"
                id="runtime"
                label="Runtime in minutes"
                name="runtime"
                autoComplete="none"
                onChange={handleSetRuntime}
              />
            </Grid>
            <Grid item xs={12}> {/* TODO - use file upload when implementing persistence */}
              <TextField
                required
                fullWidth
                name="moviePosterUrl"
                label="Movie poster url"
                id="moviePosterUrl"
                autoComplete="none"
                inputProps={{ minLength: 12 }}
                onChange={handleSetMoviePoster}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="companies"
                label="Production company(ies) separated by commas"
                id="companies"
                autoComplete="none"
                onChange={handleSetProductionCompanies}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="release" style={{ display: "block", marginBottom: "6px", fontSize: "12px" }}>Select genres* {selectedGenresDisplayValue}</FormLabel>
              <Select
                fullWidth
                labelId="genre-label"
                id="genre-select"
                value=""
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem onClick={(genre) => updateSelectedGenres(genre)} key={genre.id} value={genre}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
          {createFailed ? (
            <Alert severity="error">{alertText}</Alert>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default CreateFantasyMovie;