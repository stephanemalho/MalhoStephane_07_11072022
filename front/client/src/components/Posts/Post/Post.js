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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePost, likePost } from "../../../actions/post";

const Post = ({ post, setCurrentId }) => {
  const userId = localStorage.getItem("userId");
  const postId = post.userId;
  const dispatch = useDispatch();

  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  const [userIdLikes, setUserIdLikes] = useState(post.usersLikeId);
  const [userIdDislikes, setUserIdDislikes] = useState(post.usersDislikeId);

  const [isAdmin, setIsAdminUser] = useState(false);

  const USER_Url = "http://localhost:4000/api/auth";


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

  const handleLike = () => {
    const userId = localStorage.getItem("userId");
    if (userIdLikes.includes(userId) && !userIdDislikes.includes(userId)) {
      setUserIdLikes(userIdLikes.filter((id) => id !== userId));
      dispatch(likePost(post._id, { like: 0 }, setLikes, setUserIdLikes));
      return setLikes(likes - 1);
    } else if (
      !userIdLikes.includes(userId) &&
      !userIdDislikes.includes(userId)
    ) {
      setUserIdLikes([...userIdLikes, userId]);
      dispatch(likePost(post._id, { like: 1 }, setLikes, setUserIdLikes));
      return setLikes(likes + 1);
    } else if (
      !userIdLikes.includes(userId) &&
      userIdDislikes.includes(userId)
    ) {
      setUserIdLikes([...userIdLikes, userId]);
      setUserIdDislikes(userIdDislikes.filter((id) => id !== userId));
      dispatch(likePost(post._id, { like: 1 }, setLikes, setUserIdLikes));
      return (setLikes(likes + 1), setDislikes(dislikes - 1));
    } else {
      return null;
    };
  };

  const handleDislike = () => {
    const userId = localStorage.getItem("userId");
    if (userIdDislikes.includes(userId) && !userIdLikes.includes(userId)) {
      setUserIdDislikes(userIdDislikes.filter((id) => id !== userId));
      dispatch(likePost(post._id, { like: 0 }, setDislikes, setUserIdDislikes));
      return setDislikes(dislikes - 1);
    } else if (
      !userIdDislikes.includes(userId) &&
      !userIdLikes.includes(userId)
    ) {
      setUserIdDislikes([...userIdDislikes, userId]);
      dispatch(
        likePost(post._id, { like: -1 }, setDislikes, setUserIdDislikes)
      );
      return setDislikes(dislikes + 1);
    } else if (
      !userIdDislikes.includes(userId) &&
      userIdLikes.includes(userId)
    ) {
      setUserIdDislikes([...userIdDislikes, userId]);
      setUserIdLikes(userIdLikes.filter((id) => id !== userId));
      dispatch(
        likePost(post._id, { like: -1 }, setDislikes, setUserIdDislikes)
      );
      return (setDislikes(dislikes + 1), setLikes(likes - 1));
    } else {
      return null;
    }
  };

  const updatePost = () => { 
    setCurrentId(post._id);
    
    

    console.log(post.message + "    et   " + post.imageUrl);

  };

  useEffect(() => {
    dispatch(getPosts( postMessage ));
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
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="imageItems">
          <button
            onClick={() => {
              updatePost();
            }}
            className={
              userId === postId || isAdmin ? "changeImageIcon" : "hide"
            }
          >
            <a href="#goToTopOnClick">
              <FontAwesomeIcon title="Modifier le post" icon={faEllipsis} />
            </a>
          </button>
        </div>
      </figcaption>
      <div className="messageItems">
        <p className="messageArea">{post.message}</p>
        <button className="likeButton" onClick={handleLike}>
          { userIdLikes.includes(userId) ? ( 
            <FontAwesomeIcon className="blueLike" title="J'aime" icon={faThumbsUp} />

          ) : (
            <FontAwesomeIcon  title="J'aime" icon={faThumbsUp} />
           ) }
          
          {likes}
        </button>
        <button className="dislikeButton" onClick={handleDislike}>
        { userIdDislikes.includes(userId) ? ( 
            <FontAwesomeIcon className="blueLike" title="J'aime" icon={faThumbsDown} />
          ) : (
            <FontAwesomeIcon title="Je n'aime pas" icon={faThumbsDown} />
           ) }
          {" "}
          {dislikes}
        </button>
        <button
          className={userId === postId || isAdmin ? "deletePostButton" : "hide"}
          onClick={() => dispatch(deletePost(post._id))}
        >
          <FontAwesomeIcon title="Éffacer le post" icon={faTrash} />
        </button>
      </div>
    </figure>
  );
};

export default Post;
