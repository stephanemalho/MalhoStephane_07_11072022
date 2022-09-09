import React from "react";
import { useSelector } from "react-redux";
import "./post.css";
import Post from "./Post/Post";

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return !posts.length ? (
    <h1>Loading...</h1>
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
