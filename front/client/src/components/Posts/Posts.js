import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./post.css";
import Post from "./Post/Post";
import Loader from "../Loader/Loader";
import PostForm from "../PostForm/PostForm";

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  const [currentId, setCurrentId] = useState(null);
  
  return !posts.length ? (
    <>
    <PostForm currentId={currentId} setCurrentId={setCurrentId}/>
    <Loader />
    </>
  ) : (
    <div className="PostSide">
      <PostForm currentId={currentId} setCurrentId={setCurrentId}/>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setCurrentId={setCurrentId}/>
        </div>
      )).reverse()}
    </div>
  );
};

export default Posts;
