import React from "react";
import { NavLink } from "react-router-dom";
import blackLogo from "../../img/black-logo.png";
import "./Header.css";

const NavBar = () => {

  return (
        <header>
          <div className="logo">
            <NavLink to="/">
              <img src={blackLogo} alt="logo de groupomania" />
            </NavLink>
            <div className="loginIcon">
              <ul>
                <NavLink to="/register">
                  <li>S'inscrire</li>
                </NavLink>
                <NavLink to="/login">
                  <li>Se connecter</li>
                </NavLink>
              </ul>
            </div>
          </div>
        </header>
  );
};

export default NavBar;
