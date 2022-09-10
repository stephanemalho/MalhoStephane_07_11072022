import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/post";
import "./form.css";
import posts from "../Posts/Posts";

function PostForm() {
  // état
  const [postMessage, setPostMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successSend, setSuccessSend] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();

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

    dispatch(createPost(formData)); // on dispatch l'action createPost
    // on reset le formulaire
    setPostMessage("");
    setSelectedFile(null);
    setSuccessSend(true);
    setIsSubmited(true);
    
    if (!posts.length) {
      setTimeout(() => {
        window.location.reload();
      } , 1000);
    }
  };


  // render
  return (
    
        <form className="PostFormDisplay" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <h4>Creation d'un Post</h4>
          <p className={ successSend ? "valid" : "hide"}>Votre message a bien été envoyé avec succès</p> 
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
          <button disabled={
                !postMessage || isSubmited
                  ? true
                  : false
              } type="submit">Submit</button>
        </form>
      
  );
}

export default PostForm;
