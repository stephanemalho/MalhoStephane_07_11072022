import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import blackLogo from "../../img/black-logo.png";
import "./Header.css";

const NavBar = () => {
  // check if token is present in local storage if yes display logout button and hide login and register button
  const token = localStorage.getItem("token");

  const [isToken, setIsToken] = useState(false);

 useState(() => {
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
 }, [token]);

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={blackLogo} alt="logo de groupomania" />
        </NavLink>
        <div className="loginIcon">
          { isToken ? (
            <ul>
              <NavLink onClick={
                () => {
                  localStorage.clear();
                  window.location.reload();
                }
              } to="/">
              <li>Se déconnecter</li>
              </NavLink>
            </ul>
          ) : (
            <ul>
            <NavLink to="/register">
              <li>S'inscrire</li>
            </NavLink>
            <NavLink to="/login">
              <li>Se connecter</li>
            </NavLink>
          </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
