import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import "./form.css";

export function PostForm({ currentId, setCurrentId }) {
  // état
  const [postMessage, setPostMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successSend, setSuccessSend] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  // comportement
  useEffect(() => {
    //if currentId is known, we want to fill the form with the post data
    if (post) setPostMessage(post.message);
  
  }, [post]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("message", postMessage);
    setPostMessage(postMessage);

    if (selectedFile) {
      formData.append("image", selectedFile);
      setSelectedFile(selectedFile);
    } else {
      formData.append("image", selectedFile );
      setSelectedFile(selectedFile);
    }
    setPostMessage(e.target.value);
    setSelectedFile(e.target.value);

    if (currentId) {
      dispatch(updatePost(currentId, formData));
    } else {
      dispatch(createPost(formData));
    }
    setSuccessSend(true);
    e.target.reset();
    setTimeout(() => {
      setSuccessSend(false);
      setCurrentId(null);
    }, 3000);
    
  };

  const clear = () => {
    return (
      setPostMessage(""),
      setSelectedFile(null),
      setCurrentId(null),
      setSuccessSend(false),
      setIsSubmited(false)
    );
  };

  // rendu
  return (
    <form
      className="PostFormDisplay"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h4>{currentId ? "Modifier le " : "Créer un "} Post</h4>
      <p className={successSend ? "valid" : "hide"}>
        Votre message à été envoyé avec succès
      </p>
      <label htmlFor="message">Poster (requis)</label>
      <input
        type="textarea"
        name="message"
        variant="outlined"
        label="message"
        placeholder={ currentId ? post.message : "Votre message"}
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
        disabled={!postMessage || isSubmited  ? true : false}
        type="submit"
      >
        Envoyer
      </button>
      <button
       disabled={!postMessage || isSubmited ? true : false}
       type="reset" onClick={clear}>
        Annuler
      </button>
    </form>
  );
}

export default PostForm;
