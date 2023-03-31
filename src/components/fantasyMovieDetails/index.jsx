import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import AddCastMember from "../addCastMember";
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CastMemberCard from "../castMemberCard";

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
  const [imagePath, setImagePath] = React.useState("");
  const [name, setName] = React.useState("");
  const [roleName, setRoleName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [outputDate, setOutputDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [displayedMovie, setDisplayedMovie] = React.useState(undefined);
  const [cast, setCast] = React.useState(undefined);
  const [addCastEnabled, setAddCastEnabled] = React.useState(false);

  useEffect(() => {
    if (!movie.poster_path.startsWith("http")) {
      setImagePath(`${import.meta.env.VITE_REACT_APP_SUPABASE_URL}/storage/v1/object/public/tmdb/${movie.poster_path}`);
    } else {
      setImagePath(movie.poster_path);
    }
  });

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
    let castMember = {
      "id": uuidv4(),
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
    setAddCastEnabled(false);
  };

  const removeCastMember = (id) => {
    let updatedCast = [...displayedMovie.cast.filter((item) => item.id !== id)]
    let updatedMovie = displayedMovie;
    updatedMovie.cast = updatedCast;
    setDisplayedMovie(updatedMovie);
    setCast(updatedCast);
  }

  if (displayedMovie === undefined && movie !== undefined) {
    setDisplayedMovie(movie);
    let date = new Date(movie.release_date);
    let outputDate = "";
    try {
      outputDate = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
    } catch {
      outputDate = "2000 / 01 / 01";
    }
    setOutputDate(outputDate);
    setCast(movie.cast);
  }

  const enableCastAddition = (event) => {
    event.preventDefault();
    setAddCastEnabled(true);
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
              <ImageListItem
                key={imagePath}
                sx={styles.gridListTile}
                cols={1}
              >
                <img
                  src={imagePath}
                  alt={imagePath}
                />
              </ImageListItem>
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
                  <Chip label="Production companies" sx={styles.chipLabel} color="primary" />
                </li>
                {displayedMovie.production_companies.map((p) => (
                  <li key={p}>
                    <Chip label={p} />
                  </li>
                ))}
              </Paper>

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
            <Grid item xs={9} sx={styles.chipSet}>
              <h2 style={{ fontWeight: 600, marginTop: "-1em" }}>
                Cast
              </h2>
            </Grid>
            <Grid item xs={3} style={{ paddingBottom: "0px", marginTop: "0px" }}> {/* empty placeholder */}

            </Grid>
            <Grid item xs={9} style={{ paddingTop: "0px", marginTop: "0px" }}>
              {/* {cast.map((c) => ( TODO - uncomment
                <CastMemberCard member={c} removeCastMember={removeCastMember}/>
              ))} */}
            </Grid>
            <Grid item xs={3}> {/* empty placeholder */}

            </Grid>
            {addCastEnabled ? (
              <Grid item xs={9}>
                <AddCastMember
                  handleNameChange={handleNameChange}
                  handleRoleNameChange={handleRoleNameChange}
                  handleAvatarChange={handleAvatarChange}
                  handleDescriptionChange={handleDescriptionChange}
                  handleSubmit={handleSubmit}
                />
              </Grid>
            ) : (
              <Grid item xs={9} sx={styles.chipSet}>
                <IconButton
                  aria-label="enable add cast"
                  onClick={enableCastAddition}
                >
                  <AddCircleIcon color="primary" fontSize="large" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </>
      )};
    </>
  );
};
export default FantasyMovieDetails;
