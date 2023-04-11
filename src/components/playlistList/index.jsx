import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import PlaylistCard from '../playlistCard'

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
    paddingBottom: "2em",
  }
};

const PlaylistList = ({ playlists, reload }) => {
  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title="User playlists" />
        </Grid>
        {playlists.map((p) => (
          <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <PlaylistCard playlist={p} reload={reload}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
};

export default PlaylistList;
