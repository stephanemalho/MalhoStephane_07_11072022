import React from 'react';
import { useSelector } from "react-redux";

import Post from './Post/Post';



const Posts = () => {

  const posts = useSelector((state) => state.posts );

  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  );
};

export default Posts;