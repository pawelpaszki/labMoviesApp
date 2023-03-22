import React from "react";
import { searchActors } from "../api/tmdb-api";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";
import ActorsListPage from "../components/actorsListPage";

const ActorsSearchPage = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchQueryHeader, setSearchQueryHeader] = React.useState("");
  const [searchResultLoaded, setSearchResultLoaded] = React.useState(false);

  const handleTypeQuery = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  }

  const performSearch = () => {
    console.log(searchQuery);
    searchActors(searchQuery).then(result => {
      console.log(result);
      setSearchResults(result);
      setSearchResultLoaded(true);
      setSearchQueryHeader(`Top search results for: ${searchQuery}`)
    })
  };

  return (
    <>
      <TextField  
        id="outlined-helperText"
        label="Keywords"
        helperText="Type your search string query and press SEARCH button to display the search results"
        onChange={handleTypeQuery}
      />
      <Button onClick={() => performSearch()} style={{ display: "inline", marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }} variant="contained">Search</Button>

      {searchResultLoaded ? (
        <> 
        <ActorsListPage
        title={searchQueryHeader}
        actors={searchResults.results}
        action={(actor) => {
          return <AddToFavouriteActorsIcon actor={actor} />
        }}
      />
        </>
      ) : ( <> </>)}
    </>
  );
};

export default ActorsSearchPage;