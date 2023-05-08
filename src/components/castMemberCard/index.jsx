import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import img from '../../images/profile-placeholder.png';

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function CastMemberCard({ member, removeCastMember }) {
  const [imagePath, setImagePath] = React.useState("");
  React.useEffect(() => {
    if (member.avatar) {
      setImagePath(`${import.meta.env.VITE_REACT_APP_SUPABASE_URL}/storage/v1/object/public/tmdb/${member.avatar}`);
    } else {
      setImagePath(img);
    }
  });

  return (
    <Grid container>
      <Grid item xs={3} style={{ padding: "20px" }}>
        <ImageListItem
          key={img}
          sx={styles.avatar}
          cols={1}
        >
          <img
            src={imagePath}
            alt={imagePath}
          />
        </ImageListItem>
      </Grid>
      <Grid item xs={9}>
        <Grid container style={{ paddingTop: "1em" }}>
          <Grid item xs={10}>
            <Paper component="ul" sx={styles.chipSet}>
              <Chip label={member.name} sx={styles.chipLabel} color="primary" />
              &nbsp; playing &nbsp;
              <Chip label={member.roleName} />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              id={member._id}
              aria-label="remove from cast"
              onClick={() => removeCastMember(member._id, member.avatar)}
            >
              <DeleteIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <h3 style={{ fontWeight: 300 }}>
          {member.description}
        </h3>
      </Grid>
    </Grid>
  );
}
