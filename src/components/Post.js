import React from "react";
import { Box, Typography } from "@mui/material";

function Post(props) {
  const { title, body, author, time } = props;
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography component="h2" variant="h5">
        {body}
      </Typography>
      <Typography component="h6" variant="h5">
        {author}:{time}
      </Typography>
    </Box>
  );
}

export default Post;
