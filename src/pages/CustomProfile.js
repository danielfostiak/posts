import React from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Box, Typography } from "@mui/material";

function CustomProfile() {
  const [userData, setUserData] = useState("searching");
  let { username } = useParams();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      for (let user of users) {
        if (username == user.id) {
          setUserData(user);
          return;
        }
      }
      setUserData();
    };
    getData();
  }, []);

  return (
    <main>
      {userData ? (
        userData === "searching" ? null : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              Username: {userData.id}
            </Typography>
            <Typography component="h1" variant="h3">
              Bio: {userData.bio}
            </Typography>
          </Box>
        )
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            User does not exist
          </Typography>
        </Box>
      )}
    </main>
  );
}

export default CustomProfile;
