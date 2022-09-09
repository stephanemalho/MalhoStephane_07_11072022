import React from "react";
import moment from "moment";
import {
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Post = ({ post }) => {



  // render
  return (
    <figure className="card">
      <figcaption>
        <img className="postImage" src={post.imageUrl} alt="post d'utilisateur" />
        <div className="imageItems">
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="imageItems">
          <button onClick={() => {
            
          }} className="changeImageIcon">...</button>
        </div>
      </figcaption>
      <div className="messageItems">
      <p>{post.message}</p>
      <button className="likeButton" onClick={() => {  }}>
      <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}</button>
      </div>
    </figure>
  );
};

export default Post;
