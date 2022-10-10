import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { db } from "../firebase";
import { useState } from "react";
import { color } from "@mui/system";
import {
  orderBy,
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  endAt,
  endBefore,
  startAt,
} from "firebase/firestore";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";

function ForYou() {
  const [posts, setPosts] = useState([]);
  const [mostRecentTime, setMostRecentTime] = useState(-Infinity);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    console.log(mostRecentTime);
    const q = query(
      postsCollectionRef,
      orderBy("time"),
      limit(6),
      startAfter(mostRecentTime)
    );
    let finalTime;
    let fetchedPosts = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      finalTime = doc.data().time;
      fetchedPosts.push(doc.data());
    });

    setMostRecentTime(finalTime);
    setPosts([...posts, ...fetchedPosts]);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {posts.map((post) => {
        return (
          <Post
            title={post.title}
            body={post.body}
            author={post.author}
            time={post.time}
          ></Post>
        );
      })}
    </InfiniteScroll>
  );
}
export default ForYou;
