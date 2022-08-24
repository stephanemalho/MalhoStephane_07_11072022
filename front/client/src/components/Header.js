import React from 'react';
import { NavLink } from 'react-router-dom';
import blackLogo from '../img/black-logo.png';
import "./Header.css";



const NavBar = () => {



  return (
      <header>
        <NavLink to="/">
          <div className='logo'>
            <img src={blackLogo} alt='logo de groupomania'/>
          </div>
        </NavLink>
      </header>
  );
};

export default NavBar;