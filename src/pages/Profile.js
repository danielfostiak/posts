import { Box, Typography, Button } from "@mui/material";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Profile(props) {
  const { user, handleLogout } = props;

  return (
    <main>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Profile
        </Typography>
        <Typography component="h3" variant="h6">
          Username: {user.displayName}
        </Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </main>
  );
}

export default Profile;
