import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/post";

function PostForm() {
  // état
  const [postMessage, setPostMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  // comportement
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", postMessage);
    formData.append("image", selectedFile);

    dispatch(createPost(formData)); // on dispatch l'action createPost
  };

  // render
  return (
    <section>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3>Creation d'un Post</h3>
        <label htmlFor="message">Post</label>
        <input
          type="textarea"
          name="message"
          variant="outlined"
          label="message"
          placeholder="Tapez votre texte ici"
          onChange={(e) => setPostMessage(e.target.value)} />
        <div>
          <label htmlFor="image">Ajouter une image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setSelectedFile(e.target.files[0])} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default PostForm;
