import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../components/Log/Login';
import Register from '../../components/Log/Register';
import Trending from '../../pages/Trending';
import Profil from '../../pages/Profil';
import NavBar from '../Navbar';

const index = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        {" "}
        {/* <Routes> to replace Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* <Navigate to='/' /> to replace Redirect */}
      </Routes>
    </Router>
  );
};

export default index;