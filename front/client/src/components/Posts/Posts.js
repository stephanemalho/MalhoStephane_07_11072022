import React from "react";
import { useSelector } from "react-redux";

import "./post.css";
import Post from "./Post/Post";
import LoaderPosts from "../LoaderPosts/LoaderPosts";

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return !posts.length ? (
    <LoaderPosts />
  ) : (
    <div className="PostSide">
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      )).reverse()}
    </div>
  );
};

export default Posts;
