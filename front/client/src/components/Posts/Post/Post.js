import React from "react";
import moment from "moment";


const Post = ({ post }) => {
  // etat

  // comportemant

  // render
  return (
    <figure className="postCard">
      <figcaption>
        <img className="postImage" src={post.imageUrl} alt="post d'utilisateur" />
        <div className="imageItems">
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="imageItems">
          <button onClick={() => {}} className="changeImageIcon">...</button>
        </div>
      </figcaption>
      <div className="messageItems">
      <p>{post.message}</p>
      <button onClick={() => {}}>Like {post.likes}</button>
      </div>
    </figure>
  );
};

export default Post;
