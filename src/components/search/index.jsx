import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// date picker and its styling
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getGenres, getSearchResults } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { constructQuery } from "../../api/searchQuery";
import PageTemplate from "../templateMovieListPage";

const Search = () => {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [discoverCategory, setDiscoverCategory] = React.useState("movie");
  const [keywords, setKeywords] = React.useState("");
  const [useDateRangeChecked, setUseDateRangeChecked] = React.useState(false);
  const [releaseStartDate, setReleaseStartDate] = useState(new Date());

  const [releaseEndDate, setReleaseEndDate] = useState(new Date());
  const [genre, setGenre] = React.useState('');
  const [minRating, setMinRating] = React.useState(-1);
  const [maxRating, setMaxRating] = React.useState(-1);
  const [movies, setMovies] = React.useState([]);

  const [searchResultLoaded, setSearchResultLoaded] = React.useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setDiscoverCategory(event.target.value);
  };

  const handleMinRating = (event) => {
    setMinRating(event.target.value);
  };

  const handleMaxRating = (event) => {
    setMaxRating(event.target.value);
  };

  const handleUseKeywords = (event) => {
    setKeywords(event.target.value);
  }

  const handleUseReleaseDateChange = (event) => {
    setUseDateRangeChecked(event.target.checked);
  };

  let query = "";

  const sendSearchQUery = () => {
    query = "";
    // console.log(`discoverCategory: ${discoverCategory}`);
    // console.log(`useDateRangeChecked: ${useDateRangeChecked}`);
    // console.log(`minRating: ${minRating}`);
    // console.log(`maxRating: ${maxRating}`);
    // console.log(`releaseStartDate: ${releaseStartDate}`);
    // console.log(`releaseEndDate: ${releaseEndDate}`);
    // console.log(`genre: ${genre}`);
    // console.log(`keywords: ${keywords}`);
    query = constructQuery(
      discoverCategory,
      useDateRangeChecked,
      minRating,
      maxRating,
      releaseStartDate,
      releaseEndDate,
      genre.id,
      keywords
    );
    let resource = discoverCategory === "movie" ? "movie" : "tv";

    getSearchResults(resource, query).then(result => {
      console.log(result.results);
      setMovies(result.results);
      setSearchResultLoaded(true);
    })
  };

  return (
    <>
      {searchResultLoaded ?
        <PageTemplate
          title="Search results"
          movies={movies}
          action={(movie) => null}
        />
        :
        <>
          <h4>Provide search criteria. None of them are mandatory (apart from the "Category"). Skipping criteria will exclude it from the search</h4>
          <FormControl style={{ display: "inline" }}>
            <FormLabel id="category">Category*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="category"
              name="category"
              value={discoverCategory}
              onChange={handleCategoryChange}
            >
              <FormControlLabel value="movie" control={<Radio />} label="movie" />
              <FormControlLabel value="tv series" control={<Radio />} label="tv series" />
            </RadioGroup>
          </FormControl>

          <FormControl style={{ display: "inline" }}>
            <FormLabel id="rating" style={{ display: "block" }}>Choose Rating</FormLabel>
            <TextField style={{ marginTop: "10px", width: "12ch" }}
              onChange={handleMinRating}
              id="outlined-number"
              label="Minimum"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: 10, min: 1
                }
              }}
            />
            <TextField style={{ marginTop: "10px", marginLeft: "10px", width: "12ch" }}
              onChange={handleMaxRating}
              id="outlined-number"
              label="Maximum"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: 10, min: 1
                }
              }}
            />
          </FormControl>

          <FormControl style={{ display: "block" }}>
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  checked={useDateRangeChecked}
                  onChange={handleUseReleaseDateChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Use release dates range"
              labelPlacement="end"
            />
            <FormLabel id="release" style={{ display: "block", marginTop: "10px", marginBottom: "10px" }}>Select release date range</FormLabel>
            <DatePicker disabled={!useDateRangeChecked} selected={releaseStartDate} onChange={(date) => setReleaseStartDate(date)} />

            <DatePicker disabled={!useDateRangeChecked} selected={releaseEndDate} onChange={(date) => setReleaseEndDate(date)} />
          </FormControl>

          <FormLabel id="keywords" style={{ display: "block", marginTop: "10px", marginBottom: "10px" }}>Define keywords</FormLabel>
          <TextField
            id="outlined-helperText"
            label="Keywords"
            helperText="Use comma separated string values or leave empty."
            onChange={handleUseKeywords}
          />

          <FormLabel component="legend">Select genre
          </FormLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genre}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button onClick={() => sendSearchQUery()} style={{ display: "block", marginTop: "10px", marginBottom: "10px" }} variant="contained">Search</Button>
        </>
      }
    </>
  )
};

export default Search;