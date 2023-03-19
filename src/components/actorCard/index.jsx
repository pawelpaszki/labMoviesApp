import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import StarsIcon from '@mui/icons-material/Stars';
import Grid from "@mui/material/Grid";
import img from '../../images/profile-placeholder.png'
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function ActorCard({ actor, action }) {

  const { favouriteActors, addToFavouriteActors } = useContext(MoviesContext);

  if (favouriteActors.find((id) => id === actor.id)) {
    actor.favourite = true;
  } else {
    actor.favourite = false
  }

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          actor.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {actor.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
            {actor.gender === 1 ? (<FemaleIcon fontSize="large" /> ) : (<MaleIcon fontSize="large" /> ) }
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarsIcon fontSize="small" />
              {"  "} {actor.popularity}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(actor)}
        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
