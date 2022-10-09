import React from "react";
import { Typography, Box, TextField, Button, Grid, Link } from "@mui/material";
function EntranceForm(props) {
  const { isSigningIn, setSigningIn, handleSubmit } = props;
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
        <Typography component="h1" variant="h5">
          {isSigningIn ? "Sign In" : "Sign Up"}
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={`Email address${isSigningIn ? " or Username" : ""}`}
            name="email"
            autoComplete="email"
            autoFocus
          />
          {isSigningIn ? null : (
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="email"
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {isSigningIn ? null : (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password2"
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSigningIn ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={() => setSigningIn(!isSigningIn)}>
                {isSigningIn
                  ? "Have an account? Sign Up"
                  : "Don't have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </main>
  );
}

export default EntranceForm;
