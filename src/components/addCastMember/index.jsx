import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function AddCastMember({ handleNameChange, handleRoleNameChange, handleAvatarChange, handleDescriptionChange, handleSubmit }) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">
        Add cast member
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Actor name"
              autoFocus
              autoComplete="name"
              inputProps={{ minLength: 2 }}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="roleName"
              label="Role name"
              autoComplete="none"
              inputProps={{ minLength: 2 }}
              onChange={handleRoleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              autoComplete="none"
              inputProps={{ minLength: 20, maxLength: 60 }}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}> {/* TODO - use file upload when implementing persistence */}
            <TextField
              required
              fullWidth
              name="avatar"
              label="Avatar url"
              id="avatarUrl"
              autoComplete="none"
              inputProps={{ minLength: 12 }}
              onChange={handleAvatarChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add cast member
        </Button>
      </Box>
    </Box>
  )
}

export default AddCastMember;