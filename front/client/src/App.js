import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {getPosts} from './actions/post';
import Route from './components/routes';
import Posts from './components/Posts/Posts';
import Form from './components/PostForm/PostForm';

function App() {
  
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <main className="App"> {/*using main insteed div is semantically correct */} 
      <Route />
      <section>
            <Posts />
            <Form />
      </section>
    </main>
  );
}

export default App;
