import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const Search = () => {
  let discoverCategory = "movie";
  let useRating = false;
  // let ratingMin = 1;
  // let ratingMax = 10;
  const [value, setValue] = React.useState("movie");

  const handleCategoryChange = (event) => {
    setValue(event.target.value);
    discoverCategory = event.target.value
    console.log(discoverCategory);
  };

  const [ratingChecked, setUseRating] = React.useState(false);

  const handleUseRatingChange = (event) => {
    setUseRating(event.target.checked);
    useRating = event.target.checked;
    console.log(useRating);
  };

  const handleMinRating = (event) => {
    // console.log(event.target.value);
    // ratingMin = event.target.value;
    // if (ratingMax < ratingMin) {
    //   ratingMax = ratingMin;
    // }
  };

  const handleMaxRating = (event) => {
    // console.log(event.target.value);
    // ratingMax = event.target.value;
    // if (ratingMax < ratingMin) {
    //   ratingMin = ratingMax;
    // }
  };

  return (
    <>
      <FormControl style={{ display: "inline" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleCategoryChange}
        >
          <FormControlLabel value="movie" control={<Radio />} label="movie" />
          <FormControlLabel value="tv" control={<Radio />} label="tv series" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        value="start"
        control={
          <Checkbox
            checked={ratingChecked}
            onChange={handleUseRatingChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Use rating"
        labelPlacement="end"
      />
      <TextField type="number" onChange={handleMinRating}
        InputProps={{
          inputProps: {
            max: 10, min: 1
          }
        }} />
      <TextField type="number" onChange={handleMaxRating}
        InputProps={{
          inputProps: {
            max: 10, min: 1
          }
        }} />
    </>
  )
};

export default Search;