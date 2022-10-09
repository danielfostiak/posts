import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg33uuLH3c04IFlgj3kluHyHLsXn5UsRc",
  authDomain: "posts-84a5b.firebaseapp.com",
  projectId: "posts-84a5b",
  storageBucket: "posts-84a5b.appspot.com",
  messagingSenderId: "914317664965",
  appId: "1:914317664965:web:af284964591ec1c10446ac",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
