import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import blackLogo from "../../img/black-logo.png";
import "./Header.css";
import {
  faRightToBracket,
  faRightFromBracket,

} 
from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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
          <img title="logo groupomania" aria-label="cliquer sur le logo pour retour a la page d'acceuil" src={blackLogo} alt="logo de groupomania" />
        </NavLink>
        <div className="loginIcon">
          { isToken ? (
            <ul className="logout">
              <NavLink onClick={
                () => {
                  localStorage.clear();
                  window.location.reload();
                }
              } to="/">
              <li className="HideInSmallScreen">Se déconnecter</li>
              <li className="IconSmallHeaderLogOut"><FontAwesomeIcon title="Se déconnecter" icon={faRightFromBracket} /></li>
              </NavLink>
            </ul>
          ) : (
            <ul className="Login">
            <NavLink to="/register">
              <li className="HideInSmallScreen">S'inscrire</li>
              <li className="IconSmallHeader"><FontAwesomeIcon title="S'inscrire"  icon={faRightFromBracket} /></li>
            </NavLink>
            <NavLink to="/login">
              <li className="HideInSmallScreen">Se connecter</li>
              <li  className="IconSmallHeader"><FontAwesomeIcon title="Se connecter" icon={faRightToBracket} /></li>
            </NavLink>
          </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
