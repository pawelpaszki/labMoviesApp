import { Link } from "react-router-dom";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { deletePlaylist } from '../../supabase/client';

const styles = {
  card: { maxWidth: 345 },
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

export default function PlaylistCard({ playlist, reload }) {
  const [title, setTitle] = React.useState("");
  React.useEffect(() => {
    if (playlist) {
      setTitle(playlist.title);
    }
  });

  async function remove() {
    await deletePlaylist(playlist.id);
    await reload();
  }
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Grid item>
          <Chip label="Title" sx={styles.chipLabel} color="primary" />
          {playlist.title}
        </Grid>
        <Grid item>
          <Chip label="Theme" sx={styles.chipLabel} color="primary" />
          {playlist.theme}
        </Grid>
        <Grid item>
          <Chip label="Movies count" sx={styles.chipLabel} color="primary" />
          {playlist.movies.length}
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/playlists/${playlist.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        <Button variant="outlined" size="medium" color="error" onClick={remove}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
