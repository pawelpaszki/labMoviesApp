import React, { useState, useEffect } from "react";
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
import { getGenres, addToFantasyMovies } from "../../api/tmdb-api";
import Spinner from '../spinner';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const CreateFantasyMovie = () => {
  const navigate = useNavigate();
  const [genresLoaded, setGenresLoaded] = React.useState(false);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenresDisplayValue, setSelectedGenresDisplayValue] = useState("");
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [genres, setGenres] = React.useState([]);
  const [runtime, setRuntime] = React.useState(1);
  const [moviePoster, setMoviePoster] = React.useState("");
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = React.useState("");
  const [productionCompanies, setProductionCompanies] = React.useState("");
  const [createInitiated, setCreateInitiated] = React.useState(false);
  const [createFailed, setCreateFailed] = React.useState(false);
  const [alertText, setAlertText] = React.useState("movie creation failed! Try again.");

  useEffect(() => {
    setTimeout(async () => loadGenres(), 100);
  }, []);

  const loadGenres = async () => {
    const loadedGenres = await getGenres();
    setGenres(loadedGenres);
    setGenresLoaded(true);
  }

  if (createInitiated) {
    return <Spinner />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handle submit");
    setCreateInitiated(true);
    const account = await addToFantasyMovies(
      title.trim(),
      overview.trim(),
      runtime,
      // moviePoster.trim(),
      productionCompanies.split(',').map(item => item.trim()),
      selectedGenres,
      releaseDate
    );
    setCreateInitiated(false);
    if (account === undefined || account.fantasyMovies?.length < 1) {
      setAlertText("movie creation failed! Try again.")
      setCreateFailed(true);
    } else {
      navigate("/fantasy");
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOverviewChange = (event) => {
    setOverview(event.target.value);
  };

  const handleSetRuntime = (event) => {
    setRuntime(event.target.value);
  };

  const handleSetMoviePoster = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      setFileName(file);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setMoviePoster(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const handleSetProductionCompanies = (event) => {
    setProductionCompanies(event.target.value);
  }

  return (
    <>
    {genresLoaded ? (
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
                      <MenuItem onClick={(genre) => updateSelectedGenres(genre)} key={genre.tmdbID} value={genre}>
                        {genre.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              {/* <Grid item xs={12}>
              <FormLabel id="poster" style={{ display: "block", marginBottom: "6px", fontSize: "12px" }}>{uploading ? 'Uploading poster...' : 'Upload poster'}</FormLabel>
              <TextField
                type="file"
                id="moviePosterUrl"
                accept="image/*"
                onChange={handleSetMoviePoster}
                disabled={uploading}
              />
            </Grid> */}
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
    ) : (
      <></>
    )
  }
  </>
    
  )
}

export default CreateFantasyMovie;