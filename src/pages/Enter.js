import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase";
import { useState, useContext } from "react";
import EntranceForm from "./EntranceForm";
import Profile from "./Profile";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Enter() {
  const [isSigningIn, setSigningIn] = useState(false); //  true => SignIn, false => SignUp
  const { user, setUser } = useContext(UserContext);
  const usersCollectionRef = collection(db, "users");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function handleSignIn(form) {
    const name = form[0].value;
    const password = form[2].value;

    if (name.includes("@")) {
      // email
      const email = name;

      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert(error.message)
      );
    } else {
      // username
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let email;

      for (let user of users) {
        if (name == user.id) {
          email = user.email;
        }
      }

      if (!email) {
        alert("No user with that username found");
        return;
      }

      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert(error.message)
      );
    }
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
    if (
      username.includes("@") ||
      username.includes(".") ||
      username.includes("!") ||
      username.includes(" ")
    ) {
      alert("Usernames may not include any special characters");
      return;
    }

    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    for (let user of users) {
      if (username == user.id) {
        alert("Username already exists");
        return;
      }
    }

    await createUserWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    await setDoc(doc(db, "users", username), {
      email: email,
    });
    setUser({ displayName: username });
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
    </>
  );
}

export default Enter;
