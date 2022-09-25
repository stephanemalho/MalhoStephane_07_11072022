import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../actions/post";
import moment from "moment";
// import { getUsers } from "../../../actions/user";
import {
  faEllipsis,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePost, likePost } from "../../../actions/post";


const Post = ({ post, setCurrentId }) => {
  const userId = localStorage.getItem("userId");
  const postId = JSON.stringify(post.userId);
  const dispatch = useDispatch();

  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  const [userIdLikes, setUserIdLikes] = useState(post.usersLikeId);
  const [userIdDislikes, setUserIdDislikes] = useState(post.usersDislikeId);
  
  const [isAdmin, setIsAdminUser] = useState(false);


  const USER_Url = "http://localhost:4000/api/auth";

  // call axios to get the user pseudo and check is isAdmin or not 
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${USER_Url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });   
      setIsAdminUser(res.data.isAdmin);
     };
    fetchUser();
  }, [post.userId]);


  const liked = () => {
    if (userIdLikes.includes(userId) && !userIdDislikes.includes(userId)) {
      setUserIdLikes(userIdLikes.filter((id) => id !== userId));
      dispatch(likePost(post._id, { like: 0 }, setLikes, setUserIdLikes));
      return setLikes(likes - 1);
    }
    if (!userIdLikes.includes(userId) && !userIdDislikes.includes(userId)) {
      setUserIdLikes([...userIdLikes, userId]);
      dispatch(likePost(post._id, { like: 1 }, setLikes, setUserIdLikes));
      return setLikes(likes + 1);
    }
    if (!userIdLikes.includes(userId) && userIdDislikes.includes(userId)) {
      setUserIdLikes([...userIdLikes, userId]);
      setUserIdDislikes(userIdDislikes.filter((id) => id !== userId));
      dispatch(likePost(post._id, { like: 1 }, setLikes, setUserIdLikes));
      return (setLikes(likes + 1), setDislikes(dislikes - 1));
    }
    if (userIdLikes.includes(userId) && userIdDislikes.includes(userId)) {
      return null;
    }
  };

  const disliked = () => {
    if (userIdDislikes.includes(userId) && !userIdLikes.includes(userId)) {
      setUserIdDislikes(userIdDislikes.filter((id) => id !== userId));
      dispatch(likePost(post._id, { like: 0 }, setDislikes, setUserIdDislikes));
      return setDislikes(dislikes - 1);
    }
    if (!userIdDislikes.includes(userId) && !userIdLikes.includes(userId)) {
      setUserIdDislikes([...userIdDislikes, userId]);
      dispatch(
        likePost(post._id, { like: -1 }, setDislikes, setUserIdDislikes)
      );
      return setDislikes(dislikes + 1);
    }
    if (!userIdDislikes.includes(userId) && userIdLikes.includes(userId)) {
      setUserIdDislikes([...userIdDislikes, userId]);
      setUserIdLikes(userIdLikes.filter((id) => id !== userId));
      dispatch(
        likePost(post._id, { like: -1 }, setDislikes, setUserIdDislikes)
      );
      return (setDislikes(dislikes + 1), setLikes(likes - 1));
    }
    if (userIdDislikes.includes(userId) && userIdLikes.includes(userId)) {
      return null;
    }
  };

  // send the post message and file to the form to be updated
  const updatePost = () => {
    setCurrentId(post._id);
  };

  useEffect(() => {
    dispatch(getPosts(postMessage));
  }, [dispatch]);

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
          <span></span>
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="imageItems">
          <button
            onClick={() => {
              updatePost();
            }}
            className={userId === postId || isAdmin ? "changeImageIcon" : "hide"}
          >
            <a href="#goToPostFormOnClick">
              <FontAwesomeIcon icon={faEllipsis} />
            </a>
          </button>
        </div>
      </figcaption>
      <div className="messageItems">
        <p className="messageArea">{post.message}</p>
        <button className="likeButton" onClick={liked}>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes}
        </button>
        <button className="dislikeButton" onClick={disliked}>
          <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
        </button>
        <button
          className={userId === postId || isAdmin ? "deletePostButton" : "hide"}
          onClick={() => dispatch(deletePost(post._id))}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </figure>
  );
};

export default Post;
