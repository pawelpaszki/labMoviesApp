import React from "react";
import Typography from "@mui/material/Typography";

import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";


const ActorDetails = ({ actor }) => {

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
