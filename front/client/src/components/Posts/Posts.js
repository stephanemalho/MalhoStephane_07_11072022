import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./post.css";
import { getPosts } from "../../actions/post";
import Loader from "../Loader/Loader";
import Post from "./Post/Post";
import PostForm from "../PostForm/PostForm";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return !posts.length ? (
    <>
      <PostForm currentId={currentId} setCurrentId={setCurrentId} />
      <Loader />
    </>
  ) : (
    <div className="PostSide">
      <PostForm currentId={currentId} setCurrentId={setCurrentId} />
      {posts
        .map((post) => (
          <div key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default Posts;
