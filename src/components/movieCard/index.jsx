import { Link } from "react-router-dom";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import img from '../../images/film-poster-placeholder.png';
import Grid from "@mui/material/Grid";
import RearrangeFooter from '../rearrangeFavourites';
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import PostAddIcon from '@mui/icons-material/PostAdd';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { updatePlaylist } from '../../supabase/client';
import Alert from '@mui/material/Alert';

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieCard = ({ movie, action, rearrangeFavourites, listSize, index, playlistsArray, user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [playlists, setPlaylists] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [playlist, setPlaylist] = React.useState('Create new');
  const [playlistsLoaded, setPlaylistsLoaded] = React.useState(null);
  const [duplicateAddToPlaylist, setDuplicateAddToPlaylist] = React.useState(false);
  const [isPlaylistEnabledPage, setIsPlaylistEnabledPage] = React.useState(false);
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    if (window.location.pathname === ("/") && !isPlaylistEnabledPage) {
      setIsPlaylistEnabledPage(true);
    }
    if (movie) {
      setTitle(movie.title);
    }
    if (!playlistsLoaded) {
      if (playlistsArray) {
        const merged = [...[{ title: "Create new", id: "12345" }], ...playlistsArray];
        setPlaylists(merged);
      } else {
        setPlaylists([{ title: "Create new", id: "12345" }]);
      }
      setPlaylistsLoaded(true);
    }
  });

  async function addToPlaylist() {
    if (playlist === "Create new") {
      navigate(`playlists/create/${movie.id}`);
    } else {
      for (const pl of playlists) {
        if (pl.title == playlist) {
          if (pl.movies.indexOf(movie.id.toString()) > -1) {
            setDuplicateAddToPlaylist(true);
            setTimeout(async () => setDuplicateAddToPlaylist(false), 3000);
          } else {
            const merged = [...pl.movies, ...[movie.id.toString()]];
            console.log(merged);
            const { data, error } = await updatePlaylist(pl.id, merged);
            console.log(data);
            console.log(error);
          }
        }
      };
    }
  }

  const handlePlaylistSelect = (e) => {
    setAnchorEl(null);
    setPlaylist(e.target.value);
  };
  return (
    <>
      {
        playlistsLoaded ? (
          <>
            <Card sx={styles.card}>
              <CardHeader
                title={
                  <>
                    <Tooltip title={title} placement="top">
                      <Typography variant="h5" component="p" noWrap={true}>
                        {movie.title}{" "}
                      </Typography>
                    </Tooltip>
                  </>
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
                      {movie.release_date}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" component="p">
                      <StarRateIcon fontSize="small" />
                      {"  "} {movie.vote_average}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {playlistsLoaded && user && isPlaylistEnabledPage ? (
                      <>
                        <Select
                          labelId="genre-label"
                          id="genre-select"
                          value={playlist}
                          onChange={handlePlaylistSelect}
                        >
                          {playlists.map((playlist) => {
                            return (
                              <MenuItem key={playlist.id} value={playlist.title}>
                                {playlist.title.substring(0, 10)}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <IconButton aria-label="add-to-playlist" onClick={addToPlaylist}>
                          <PostAddIcon color="primary" fontSize="large" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" component="p" style={{ paddingTop: "0.8em" }}>
                      <ThumbUpAltIcon fontSize="small" />
                      {"  "} {Math.floor(movie.popularity)}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions disableSpacing>
                {action(movie)}
                <Link to={`/movies/${movie.id}`}>
                  <Button variant="outlined" size="medium" color="primary">
                    More Info
                  </Button>
                </Link>
                <Link to={`/movies/${movie.id}/similar`} style={{ paddingLeft: "1em" }}>
                  <Button variant="outlined" size="medium" color="primary">
                    Similar
                  </Button>
                </Link>
              </CardActions>
              {duplicateAddToPlaylist ? (
                <Alert severity="error">Movie already added to the {playlist} playlist</Alert>
              ) : (
                <></>
              )}
              {listSize !== undefined ? (
                <RearrangeFooter rearrangeFavourites={rearrangeFavourites} index={index} listSize={listSize} />
              ) : (
                <></>
              )}
            </Card>
          </>
        ) : (
          <>
          </>
        )
      }
    </>
  )
}

export default MovieCard;
