import { AppBar, MenuItem, Toolbar, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Enter from "./pages/Enter";
import Following from "./pages/Following";
import ForYou from "./pages/ForYou";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});

  return (
    <Router>
      <main>
        <AppBar position="sticky">
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <TagIcon />
            <Typography
              textAlign="left"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Posts
            </Typography>
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
            <MenuItem component={Link} to="/enter">
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
            <Route path="/enter" element={<Enter />} />
          </Routes>
        </UserContext.Provider>
      </main>
    </Router>
  );
}

export default App;
