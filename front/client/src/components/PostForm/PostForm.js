import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/post";
import Home from "../../pages/Home";

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
    formData.append("image", selectedFile);

    dispatch(createPost(formData)); // on dispatch l'action createPost
    // on reset le formulaire
    setPostMessage("");
    setSelectedFile(null);
    setSuccessSend(true);
    setIsSubmited(true);
    <Home />;
  };


  // render
  return (
    <section>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <h3>Creation d'un Post</h3>
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
                !postMessage || !selectedFile || isSubmited
                  ? true
                  : false
              } type="submit">Submit</button>
        </form>
      </section>
  );
}

export default PostForm;
