import { AppBar, MenuItem, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Enter from "./pages/Enter";
import Following from "./pages/Following";
import ForYou from "./pages/ForYou";
import Profile from "./pages/Profile";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});
  console.log(user);
  return (
    <Router>
      <main>
        <AppBar position="sticky">
          <Toolbar>
            <MenuItem component={Link} to="/">
              <Typography
                textAlign="center"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                For you
              </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/following">
              <Typography
                textAlign="center"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Following
              </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/profile">
              <Typography
                textAlign="center"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Profile
              </Typography>
            </MenuItem>
          </Toolbar>
        </AppBar>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<ForYou />} />
            <Route path="/following" element={<Following />} />
            <Route path="/profile" element={<Enter />} />
          </Routes>
        </UserContext.Provider>
      </main>
    </Router>
  );
}

export default App;
