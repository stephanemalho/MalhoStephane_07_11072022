import React, { useState }from 'react';
//import FileBase from "react-file-base64";
import Post from '../Posts/Post/Post';
//import axios from 'axios';
import { useDispatch } from "react-redux";
import { createPost } from '../../actions/post';
//import getPost from '../../reducers/posts';


const PostForm = () => {
  // état
  const [ postData, setPostData ] = useState({
    message: ''
  });
  console.log(postData);
  const dispatch = useDispatch();

  // comportement
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if localStorage has a token and userId and if so, set them in the state
   /* const formData = new FormData();
          formData.append('message', JSON.stringify({ content: this.message}));
        //  formData.append('image', this.selectedFile);
          body = formData;
    */
      setPostData({ ...postData }); 
    
    dispatch(createPost(postData));
    setPostData({ message: postData.message }
      );
    
  }

  const clear = () => {

  }

  // afichage
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
          value={ Post.message }
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />        
        {/* <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({
              ...postData, imageUrl: base64
            })}
          />
        </div> */}
        <button type="submit">Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
    </section>
  );
};

export default PostForm;