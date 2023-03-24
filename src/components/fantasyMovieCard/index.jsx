import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { MoviesContext } from "../../contexts/moviesContext";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function FantasyMovieCard({ movie }) {
  const context = useContext(MoviesContext);
  let date = movie.release_date;
  let outputDate = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
  const remove = (e) => {
    e.preventDefault();
    context.removeFromFantasyMovies(movie);
  };
  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? movie.poster_path
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
        {/* <CardActions> */}
          <Grid container>
            <Grid item xs={9}>
              <Link to={`/fantasy/${movie.id}`}>
                <Button style={{marginTop: "6px"}} variant="outlined" size="large" color="primary">
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
        {/* </CardActions> */}
      </CardContent>
    </Card>
  );
}
