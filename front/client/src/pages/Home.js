import React, { useState, useEffect } from "react";
import "./home.css";
import "../components/Posts/Post/post.css";
import Posts from "../components/Posts/Posts";
import Header from "../components/Header/Header";

import {
  faComments,
  faPaperPlane,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  // état
  const [isConnected, setIsConnected] = useState(false);
  const currentUser = localStorage.getItem("pseudo");

  // comportement
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsConnected(true);
    }
  }, [setIsConnected]);


  // render
  return (
    <>
      <Header />
      {!isConnected ? (
        <>
          <div className="welcomeMessage">
            <article className="displayDescriptionOfTheSite">
              <h1>Bienvenue sur le réseau social de Groupomania</h1>
              <p>
                Nous sommes fières de vous acceuillir sur le nouvel outil de
                partage créé pour vous, chères employé(e)s. Découvrez les
                fonctionnalités mises à votre disposition pour partager vos publications.
                <br />
                Créez un compte et connectez vous pour pouvoir partager vos
                expériences de travail avec vos collègues.
              </p>
            </article>
          </div>
          <div className="toolsDescription">
            <h2>Description des fonctions disponibles sur le réseau</h2>
            <ul className="displayIconsInfo">
              <li className="iconContainer">
                <FontAwesomeIcon icon={faComments} />
                <p>Liker-Disliker les posts de vos collègues</p>
              </li>
              <li className="iconContainer">
                <FontAwesomeIcon icon={faImages} />
                <p>Ajouter une image à votre message</p>
              </li>
              <li className="iconContainer">
                <FontAwesomeIcon icon={faPaperPlane} />
                <p>Poster vos messages</p>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
            <h1 className="fontWeightSmallScreen" id="goToTopOnClick">Actualité du groupe pour {currentUser}</h1>
          <Posts />
        </>
      )}
    </>
  );
};

export default Home;
