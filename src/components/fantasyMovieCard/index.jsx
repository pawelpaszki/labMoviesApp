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
import img from '../../images/film-poster-placeholder.png'
import AvTimerIcon from '@mui/icons-material/AvTimer';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFantasyMovie } from "../../supabase/client";

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
  const [imagePath, setImagePath] = React.useState("");

  let date = new Date(movie.release_date);
  let outputDate = "";
  try {
    outputDate = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
  } catch {
    outputDate = "2000 / 01 / 01";
  }
  useEffect(() => {
    if (movie.poster_path !== undefined && !movie.poster_path.startsWith("http")) {
      setImagePath(`${import.meta.env.VITE_REACT_APP_SUPABASE_URL}/storage/v1/object/public/tmdb/${movie.poster_path}`);
    } else {
      setImagePath(movie.poster_path);
    }
  });
  const remove = async (e) => {
    e.preventDefault();
    await deleteFantasyMovie(movie.id, movie.poster_path);
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
      {imagePath !== "" ? (
        <CardMedia
          sx={styles.media}
          image={imagePath}
        />
      ) : (
        <CardMedia
          sx={styles.media}
          image={img}
        />
      )}
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
            <Link to={`/fantasy/${movie.id}`}>
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
