import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddCastMember from "../addCastMember";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
  avatar: {
    height: 80,
    // height: '100vw',
  },
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
};

const FantasyMovieDetails = ({ movie }) => {
  const [name, setName] = React.useState("");
  const [roleName, setRoleName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [outputDate, setOutputDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [displayedMovie, setDisplayedMovie] = React.useState(undefined);
  const [cast, setCast] = React.useState(undefined);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`name: ${name}`);
    console.log(`roleName: ${roleName}`);
    console.log(`avatar: ${avatar}`);
    console.log(`description: ${description}`);
    let castMember = {
      "name": name,
      "roleName": roleName,
      "avatar_url": avatar,
      "description": description,
    }
    let updatedCast = [...displayedMovie.cast];
    updatedCast.push(castMember);
    let updatedMovie = displayedMovie;
    updatedMovie.cast = updatedCast;
    setDisplayedMovie(updatedMovie);
    setCast(updatedCast);
    console.log('updatedMovie');
    console.log(updatedMovie);
    console.log('cast');
    console.log(updatedCast);
  };

  if (displayedMovie === undefined && movie !== undefined) {
    setDisplayedMovie(movie);
    let date = movie.release_date;
    setOutputDate(`${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`);
    setCast(movie.cast);
  }
  return (
    <>
      {displayedMovie === undefined ? (
        <></>
      ) : (
        <>
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                {displayedMovie.title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {/* <div sx={styles.gridListRoot}> */}
              {/* <ImageList cols={1}> */}
              <ImageListItem
                key={displayedMovie.file_path}
                sx={styles.gridListTile}
                cols={1}
              >
                <img
                  src={`${displayedMovie.poster_path}`}
                  alt={displayedMovie.poster_path}
                />
              </ImageListItem>
              {/* </ImageList> */}
              {/* </div> */}
            </Grid>
            <Grid item xs={9} style={{ paddingBottom: "0px", marginTop: "0px", marginBottom: "0px" }}>
              <Typography variant="h5" component="h3">
                Overview
              </Typography>

              <Typography variant="h6" component="p">
                {displayedMovie.overview}
              </Typography>

              <Paper component="ul" sx={styles.chipSet}>
                <li>
                  <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {displayedMovie.genres.map((g) => (
                  <li key={g}>
                    <Chip label={g} />
                  </li>
                ))}
              </Paper>
              <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${displayedMovie.runtime} min.`} />
                <Chip
                  icon={<CalendarIcon />}
                  label={`${outputDate}`}
                />
              </Paper>
            </Grid>
            <Grid item xs={3} style={{ paddingBottom: "0px", marginTop: "0px" }}> {/* empty placeholder */}

            </Grid>
            <Grid item xs={9} style={{ paddingTop: "0px", marginTop: "0px" }}>
              {cast.map((c) => (
                <Grid container>
                  <Grid item xs={3} style={{ padding: "20px" }}>
                    <ImageListItem
                      key={displayedMovie.file_path}
                      sx={styles.avatar}
                      cols={1}
                    >
                      <img
                        src={`${c.avatar_url}`}
                        alt={c.avatar_url}
                      />
                    </ImageListItem>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid item xs={12}>
                      <h2>
                        {c.name} as &nbsp; {c.roleName}
                      </h2>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <h3>
                      {c.description}
                    </h3>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={3}> {/* empty placeholder */}

            </Grid>
            <Grid item xs={9}>
              <AddCastMember
                handleNameChange={handleNameChange}
                handleRoleNameChange={handleRoleNameChange}
                handleAvatarChange={handleAvatarChange}
                handleDescriptionChange={handleDescriptionChange}
                handleSubmit={handleSubmit}
              />
            </Grid>
          </Grid>
        </>
      )};
    </>
  );
};
export default FantasyMovieDetails;
