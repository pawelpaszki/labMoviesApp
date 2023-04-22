import { Link } from "react-router-dom";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RearrangeFooter from '../rearrangeFavourites';
import Tooltip from "@mui/material/Tooltip";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function TvSeriesCard({ movie, action, rearrangeFavourites, listSize, index }) {
  const [title, setTitle] = React.useState("");
  React.useEffect(() => {
    if (movie) {
      setTitle(movie.original_name);
    }
  });
  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <Tooltip title={title} placement="top">
            <Typography variant="h5" component="p">
              {movie.original_name}{" "}
            </Typography>
          </Tooltip>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <Typography variant="h6" component="p">
              <ThumbUpAltIcon fontSize="small" />
              {"  "} {Math.floor(movie.popularity)}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/tv/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </Link>
        <Link to={`/tv/${movie.id}/similar`} style={{ paddingLeft: "1em" }}>
          <Button variant="outlined" size="medium" color="primary">
            Similar
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
