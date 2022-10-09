import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import React from "react";
import { UpdateDisabledTwoTone } from "@mui/icons-material";

function Profile(props) {
  const { user, handleLogout } = props;
  const username = user.displayName;
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
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

  function handleCloseUpdate() {
    setUpdatingProfile(false);
  }

  function handleOpenUpdate() {
    setUpdatingProfile(true);
  }

  function handleOpenPost() {
    setCreatingPost(true);
  }

  function handleClosePost() {
    setCreatingPost(false);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    const updatedBio = e.target[0].value;
    setUserData({ ...userData, bio: updatedBio });
    await setDoc(doc(db, "users", username), { ...userData, bio: updatedBio });
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    const title = e.target[0].value;
    const body = e.target[2].value;
    const time = Timestamp.now();
    const updatedUserData = { ...userData };
    console.log(updatedUserData);
    if (updatedUserData.posts) {
      updatedUserData.posts.push({
        title: title,
        body: body,
        time: time,
        id: `${username} ${time.seconds}`,
      });
    } else {
      updatedUserData.posts = [];
      updatedUserData.posts.push({
        title: title,
        body: body,
        time: time,
        id: `${username} ${time.seconds}`,
      });
    }
    setUserData(updatedUserData);
    console.log(updatedUserData);
    await setDoc(doc(db, "users", username), { ...updatedUserData });
    await setDoc(doc(db, "posts", `${username} ${time.seconds}`), {
      title: title,
      body: body,
      time: time,
      author: username,
    });
    setCreatingPost(false);
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
            <Button onClick={handleOpenUpdate}>Update Profile</Button>
            <Modal open={updatingProfile} onClose={handleCloseUpdate}>
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
            <Button onClick={handleOpenPost}>Create Post</Button>
            <Modal open={creatingPost} onClose={handleClosePost}>
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
                <Box component={"form"} onSubmit={(e) => handleCreatePost(e)}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="body"
                    label="Body"
                    name="body"
                    autoFocus
                  />
                  <Button type="submit" fullWidth>
                    Post
                  </Button>
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
