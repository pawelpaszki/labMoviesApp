import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import AddCastMember from "../addCastMember";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CastMemberCard from "../castMemberCard";
import Spinner from '../spinner';
import Alert from '@mui/material/Alert';
import img from '../../images/film-poster-placeholder.png';
import { addCastToFantasyMovie, removeFromFantasyMoviesCast } from "../../api/tmdb-api";

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

const FantasyMovieDetails = ({ movie, movieCast, reload }) => {
  const [imagePath, setImagePath] = React.useState("");
  const [name, setName] = React.useState("");
  const [roleName, setRoleName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [outputDate, setOutputDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [displayedMovie, setDisplayedMovie] = React.useState(undefined);
  const [cast, setCast] = React.useState([]);
  const [addCastEnabled, setAddCastEnabled] = React.useState(false);
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = React.useState("");
  const [createInitiated, setCreateInitiated] = React.useState(false);
  const [createFailed, setCreateFailed] = React.useState(false);
  const [alertText, setAlertText] = React.useState("cast addition failed! Try again.");
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    console.log(movie);
    if (movie.moviePoster) {
      setImagePath(`${import.meta.env.VITE_REACT_APP_SUPABASE_URL}/storage/v1/object/public/tmdb/${movie.moviePoster}`);
    } else {
      setImagePath(img);
    }
    // if (movieCast.length > 0) {
    //   movieCast.forEach(c => {
    //     if (!c.avatar_url.startsWith("http")) {
    //       c.avatar_url = `${import.meta.env.VITE_REACT_APP_SUPABASE_URL}/storage/v1/object/public/tmdb/${c.avatar_url}`;
    //     }
    //   });
    // }
    setCast(movieCast);
    setLoaded(true);
  });

  if (uploading || createInitiated) {
    return <Spinner />;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreateInitiated(true);
    const { data, error } = await addCastToFantasyMovie(
      movie._id,
      name.trim(),
      roleName.trim(),
      // avatar.trim(),
      description.trim(),
      // fileName
    );
    setCreateInitiated(false);
    if (error !== null) {
      setAlertText("movie creation failed! Try again.")
      setCreateFailed(true);
    }
    await reload();
    setAddCastEnabled(false);
  };

  const removeCastMember = async (id) => {
    await removeFromFantasyMoviesCast(movie._id, id);
    await reload();
  }

  if (displayedMovie === undefined && movie !== undefined) {
    setDisplayedMovie(movie);
    let date = new Date(movie.releaseDate);
    let outputDate = "";
    try {
      outputDate = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
    } catch {
      outputDate = "2000 / 01 / 01";
    }
    setOutputDate(outputDate);
    setCast(movie.cast);
  }

  const handleSetAvatar = async (event) => {
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
      setAvatar(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
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
                {displayedMovie.productionCompanies.map((p) => (
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
              {loaded ? (
                <>
                  {cast.map((c) => (
                    <CastMemberCard
                      member={c}
                      removeCastMember={removeCastMember}
                      key={c.avatar_url} />
                  ))}
                </>
              ) : (
                <>
                </>
              )}
            </Grid>
            <Grid item xs={3}> {/* empty placeholder */}

            </Grid>
            {addCastEnabled ? (
              <Grid item xs={9}>
                <AddCastMember
                  handleNameChange={handleNameChange}
                  handleRoleNameChange={handleRoleNameChange}
                  handleSetAvatar={handleSetAvatar}
                  handleDescriptionChange={handleDescriptionChange}
                  handleSubmit={handleSubmit}
                  uploading={uploading}
                />
              </Grid>
            ) : (
              <>
                {createFailed ? (
                  <Alert severity="error">{alertText}</Alert>
                ) : (
                  <></>
                )}
                <Grid item xs={9} sx={styles.chipSet}>
                  <IconButton
                    aria-label="enable add cast"
                    onClick={enableCastAddition}
                  >
                    <AddCircleIcon color="primary" fontSize="large" />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )};
    </>
  );
};
export default FantasyMovieDetails;
