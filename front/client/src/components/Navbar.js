import React from 'react';
import { NavLink } from 'react-router-dom';
import blackLogo from '../img/black-logo.png';
import "./NavBar.css";



const NavBar = () => {



  return (
    <nav>
      <div>
        <NavLink to="/">
          <div className='logo'>
            <img src={blackLogo} alt='logo de groupomania'/>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;