import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";


const ActorDetails = ({ actor }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  return (
    <>

      <Typography variant="h6" component="p">
        <CalendarIcon fontSize="small" />
        {actor.birthday} ({actor.place_of_birth})
      </Typography>

      <Typography variant="h5" component="h3">
        <br></br>Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>

      <Typography variant="h5" component="h3">
        <br></br>Liked by {actor.popularity} people
      </Typography>
    </>
  );
};
export default ActorDetails;
