import React from "react";
import moment from "moment";
import {
  faEllipsis,
  faThumbsDown,
  faThumbsUp, faTrash,
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
            
          }} className="changeImageIcon"><FontAwesomeIcon icon={faEllipsis} /></button>
        </div>
      </figcaption>
      <div className="messageItems">
      <p className="messageArea">{post.message}</p>
      <button className="likeButton" onClick={() => {  }}>
      <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}</button>
      <button className="dislikeButton" onClick={() => {  }}>
      <FontAwesomeIcon icon={faThumbsDown} /> {post.dislikes}</button>
      <button className="deletePostButton" onClick={() => {  }}>
      <FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </figure>
  );
};

export default Post;
