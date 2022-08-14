import React, { useState }from 'react';
import FileBase from "react-file-base64";
import Post from '../Posts/Post/Post';
//import axios from 'axios';
import { useDispatch } from "react-redux";
import { createPost } from '../../actions/post';


const Form = () => {
  // état
  const [ postData, setPostData ] = useState({
    message: ''
  });
  console.log(postData);
  const dispatch = useDispatch();

  // comportement
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  }

  const clear = () => {

  }

  // afichage
  return (
    <article>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h3>Creation d'un post</h3>
        <label htmlFor="message">Éditer un post</label>
        <input
          type="textarea"
          name="message"
          variant="outlined"
          label="message"
          placeholder="Tapez votre texte ici"
          value={ Post.message }
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />        
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({
              ...postData, imageUrl: base64
            })}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
    </article>
  );
};

export default Form;