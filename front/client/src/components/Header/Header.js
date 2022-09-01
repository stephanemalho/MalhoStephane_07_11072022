import React from "react";
//import Login from "../Log/Login";
import { NavLink } from "react-router-dom";
import blackLogo from "../../img/black-logo.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={blackLogo} alt="logo de groupomania" />
        </NavLink>
        <div className="loginIcon">
          <NavLink to="/login">
            <FontAwesomeIcon  className="loginIcon" icon={faRightToBracket} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
