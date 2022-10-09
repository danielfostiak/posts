import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import React from "react";

function Profile(props) {
  const { user, handleLogout } = props;
  const username = user.displayName;
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [userData, setUserData] = useState("searching");
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      for (let userDoc of users) {
        if (username == userDoc.id) {
          setUserData(userDoc);
        }
      }
    };
    getData();
  }, [username]);

  function handleClose() {
    setUpdatingProfile(false);
  }

  function handleOpen() {
    setUpdatingProfile(true);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    const updatedBio = e.target[0].value;
    setUserData({ ...userData, bio: updatedBio });
    await setDoc(doc(db, "users", username), { ...userData, bio: updatedBio });
  }

  return (
    <>
      {userData == "searching" ? null : (
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
              Username: {userData?.id}
            </Typography>
            <Typography component="h3" variant="h6">
              Bio: {userData?.bio}
            </Typography>
            <Button onClick={handleOpen}>Update Profile</Button>
            <Modal open={updatingProfile} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Box
                  component={"form"}
                  onSubmit={(e) => handleUpdateProfile(e)}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bio"
                    label="Bio"
                    name="bio"
                    autoFocus
                  />
                </Box>
              </Box>
            </Modal>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </main>
      )}
    </>
  );
}

export default Profile;
