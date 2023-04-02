import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createPlaylist } from "../../supabase/client";
import Spinner from '../spinner';
import Alert from '@mui/material/Alert';

const CreateFantasyPlaylist = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [title, setTitle] = React.useState("");
  const [theme, setTheme] = React.useState("");
  const [createFailed, setCreateFailed] = React.useState(false);
  const [createInitiated, setCreateInitiated] = React.useState(false);
  const { id } = useParams();
  const [alertText, setAlertText] = React.useState("playlist creation failed! Try again.");

  if (createInitiated) {
    return <Spinner />;
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loading && user !== null && user !== undefined && user.user !== null && user.user !== undefined) {
      setCreateInitiated(true);
      const { data, error } = await createPlaylist(
        user.user.id,
        title.trim(),
        theme.trim(),
        [id],
      );
      setCreateInitiated(false);
      if (error !== null) {
        setAlertText("movie creation failed! Try again.")
        setCreateFailed(true);
      } else {
        console.log("created");
        navigate("/playlists");
      }
    } else {
      setAlertText("Unable to get user details. Please logout and log back in.")
    }
  };

  return (
    <Container component="main" maxWidth="s">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Create movies playlist
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                autoComplete="none"
                inputProps={{ minLength: 5, maxLength: 20 }}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="theme"
                required
                fullWidth
                id="theme"
                label="theme"
                autoFocus
                autoComplete="none"
                inputProps={{ minLength: 5, maxLength: 20 }}
                onChange={handleThemeChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
          {createFailed ? (
            <Alert severity="error">{alertText}</Alert>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default CreateFantasyPlaylist;