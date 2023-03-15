import React, { useState, useEffect } from "react";
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

import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const Search = () => {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [discoverCategory, setDiscoverCategory] = React.useState("movie");
  const [useDateRangeChecked, setUseRating] = React.useState(false);
  const [releaseStartDate, setReleaseStartDate] = useState(new Date());

  const [releaseEndDate, setReleaseEndDate] = useState(new Date());
  const [genre, setGenre] = React.useState('');

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    console.log(genre);
  };

  let keywords = "";
  let useReleaseDateRange = false;
  let minRating = -1;
  let maxRating = -1;

  const handleCategoryChange = (event) => {
    setDiscoverCategory(event.target.value);
  };

  const handleMinRating = (event) => {
    minRating = event.target.value;
  };

  const handleMaxRating = (event) => {
    maxRating = event.target.value;
  };

  const handleUseKeywords = (event) => {
    keywords = event.target.value;
  }

  const handleUseReleaseDateChange = (event) => {
    setUseRating(event.target.checked);
    useReleaseDateRange = event.target.checked;
  };

  const sendSearchQUery = () => {
    console.log(`discoverCategory: ${discoverCategory}`);
    console.log(`useReleaseDateRange: ${useReleaseDateRange}`);
    console.log(`minRating: ${minRating}`);
    console.log(`maxRating: ${maxRating}`);
    console.log(`releaseStartDate: ${releaseStartDate}`);
    console.log(`releaseEndDate: ${releaseEndDate}`);
    console.log(`genre: ${genre}`);
    console.log(`keywords: ${keywords}`);
  };

  return (
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
          <FormControlLabel value="tv" control={<Radio />} label="tv series" />
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
      <Button onClick={sendSearchQUery} style={{ display: "block", marginTop: "10px", marginBottom: "10px" }} variant="contained">Search</Button>
    </>
  )
};

export default Search;