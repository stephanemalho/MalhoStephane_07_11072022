import React from "react";
import { useSelector } from "react-redux";
import "./post.css";
import Post from "./Post/Post";
import Loader from "../Loader/Loader";
import PostForm from "../PostForm/PostForm";

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return !posts.length ? (
    <Loader />
  ) : (
    <div className="PostSide">
      <PostForm />
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      )).reverse()}
    </div>
  );
};

export default Posts;
