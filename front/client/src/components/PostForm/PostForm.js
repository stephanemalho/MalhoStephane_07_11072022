import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import "./form.css";
import posts from "../Posts/Posts";


function PostForm({ currentId, setCurrentId }) {
  // état
  const [postMessage, setPostMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successSend, setSuccessSend] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostMessage(post.message);
    if (post) setSelectedFile(post.selectedFile);
  }, [post]);

  // comportement
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", postMessage);

    if (selectedFile) {
      formData.append("image", selectedFile);
    } else {
      formData.append("image", "");
    }

    if (currentId) {
      dispatch(updatePost(currentId, formData));
    } else {
      dispatch(createPost(formData));
    }
    
    // on reset le formulaire
    setPostMessage("");
    setSelectedFile(null);
    setCurrentId(null);
    setSuccessSend(true);
    setIsSubmited(true);

    if (!posts.length) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // render
  return (
    <form
      className="PostFormDisplay"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <h4>{currentId ? "Modifier le " : "Créer un "} Post</h4>
      <p className={successSend ? "valid" : "hide"}>
        Votre message a bien été envoyé avec succès
      </p>
      <label htmlFor="message">Post</label>
      <input
        type="textarea"
        name="message"
        variant="outlined"
        label="message"
        placeholder="Tapez votre texte ici"
        onChange={(e) => setPostMessage(e.target.value)}
      />
      <div>
        <label htmlFor="image">Ajouter une image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </div>
      <button
        disabled={!postMessage || isSubmited ? true : false}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default PostForm;
