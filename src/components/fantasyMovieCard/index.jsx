import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromFantasyMovies } from "../../api/tmdb-api";
import img from '../../images/film-poster-placeholder.png';

const styles = {
  header: {
    lineHeight: "2.5ex",
    height: "5ex",
    display: "flex",
  },
  card: { 
    maxWidth: 345,
    margin: "6px"
  },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function FantasyMovieCard({ movie }) {

  let date = new Date(movie.releaseDate);
  let outputDate = "";
  try {
    outputDate = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
  } catch {
    outputDate = "2000 / 01 / 01";
  }
  const remove = async (e) => {
    e.preventDefault();
    await removeFromFantasyMovies(movie._id);
    window.location.reload(false);
  };
  return (
    <Card sx={styles.card}>
      <CardHeader 
        sx={{lineHeight: 2}}
        title={
          <Typography variant="h5" component="p" sx={{lineHeight: 2}}>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w500/${movie.posterPath}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              &nbsp; {outputDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <AvTimerIcon fontSize="small" />
              {movie.runtime} &nbsp; minutes
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <Link to={`/fantasy/${movie._id}`}>
              <Button style={{ marginTop: "6px" }} variant="outlined" size="large" color="primary">
                More Info
              </Button>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <IconButton
              aria-label="remove from fantasy movies"
              onClick={remove}
            >
              <DeleteIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
