import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase";
import { useState, useContext } from "react";
import EntranceForm from "./EntranceForm";
import Profile from "./Profile";
import { Button } from "@mui/material";

function Enter() {
  const [isSigningIn, setSigningIn] = useState(false); //  true => SignIn, false => SignUp
  const { user, setUser } = useContext(UserContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function handleSignIn(form) {
    const name = form[0].value;
    const password = form[2].value;
    console.log(form[0].value);
  }

  async function handleSignUp(form) {
    const email = form[0].value;
    const username = form[2].value;
    const password = form[4].value;
    const confirmPassword = form[6].value;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      setUser({ displayName: username });
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  function handleSubmit(e) {
    isSigningIn ? handleSignIn(e.target) : handleSignUp(e.target);
  }

  return (
    <>
      {user ? (
        <Profile handleLogout={handleLogout} user={user} />
      ) : (
        <EntranceForm
          setSigningIn={setSigningIn}
          isSigningIn={isSigningIn}
          handleSubmit={handleSubmit}
        />
      )}

      {/* <Button onClick={handleLogout}>Logout</Button> */}
    </>
  );
}

export default Enter;
