import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  faEllipsis,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePost, likePost } from "../../../actions/post";

const Post = ({ post, setCurrentId }) => {

  const userId = localStorage.getItem("userId");
  const postId = JSON.stringify(post.userId);
  // const isAdmin = localStorage.getItem("isAdmin");
  
  try {
    if (userId === postId) {
      console.log("true");
    } else {
      console.log("false");
    }
  } catch (error) {
    console.log(error);
  }

  const dispatch = useDispatch();

  // render
  return (
    <figure className="card">
      <figcaption>
        <img
          className="postImage"
          src={post.imageUrl}
          alt="post d'utilisateur"
        />
        <div className="imageItems">
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="imageItems">
          <button
            onClick={() => {
              setCurrentId(post._id);
            }}
            className={userId === postId ? "changeImageIcon" : "hide"}
          >
            <a href="#goToPostFormOnClick">
              <FontAwesomeIcon icon={faEllipsis} />
            </a>
          </button>
        </div>
      </figcaption>
      <div className="messageItems">
        <p className="messageArea">{post.message}</p>
        <button
          className="likeButton"
          onClick={() =>
            // add 1 like to the post
            dispatch(likePost(post._id, { like: 1 }))
          }
        >
          <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
        </button>
        <button
          className="dislikeButton"
          onClick={() => dispatch(likePost(post._id, { like: -1 }))}
        >
          <FontAwesomeIcon icon={faThumbsDown} /> {post.dislikes}
        </button>
        <button
          className={userId === postId ? "deletePostButton" : "hide"}
          onClick={() => dispatch(deletePost(post._id))}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </figure>
  );
};

export default Post;
