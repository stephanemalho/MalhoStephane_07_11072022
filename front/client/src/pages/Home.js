import React from 'react';
import './pages.css'
import '../components/Posts/Post/post.css';
import Posts from '../components/Posts/Posts';

const Home = () => {
  return (
    <div className='PostSide'>
      <h1>Actualité du groupe</h1>
      <Posts />
    </div>
  );
};

export default Home;