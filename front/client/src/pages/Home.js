import React, { useState, useEffect } from "react";
import "./home.css";
import "../components/Posts/Post/post.css";
import Posts from "../components/Posts/Posts";
import {
  faComments,
  faPaperPlane,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  // état
  const [isConnected, setIsConnected] = useState(false);
  

  // comportement
  // check if user is connected if yes setIsConnected to true
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsConnected(true);
      
    }
  }, [setIsConnected]);


  // render
  return (
    <>
      {!isConnected ? (
        <>
          <div className="welcomeMessage">
            <article className="displayDescriptionOfTheSite">
              <h1>Bienvenue sur le réseau social de Groupomania</h1>
              <p>
                Nous sommes fière de vous acceuillir sur le nouvel outil de
                partage crée pour vous chères employé(e)s. Découvrez les
                fonctionnalités mises à votre disposition pour partager vos
                expériences de travail.
                <br />
                Crée un compte et connectez vous pour pouvoir partager vos
                expériences de travail avec vos collègues.
              </p>
            </article>
          </div>
          <div className="toolsDescription">
            <h2>Description des fonctions disponibles sur le réseau</h2>
            <ul className="displayIconsInfo">
              <li className="iconContainer">
                <FontAwesomeIcon icon={faPaperPlane} />
                <p>Poster vos messages</p>
              </li>
              <li className="iconContainer">
                <FontAwesomeIcon icon={faComments} />
                <p>Commenter les posts de vos collègues</p>
              </li>
              <li className="iconContainer">
                <FontAwesomeIcon icon={faImages} />
                <p>Ajouter une images à votre message</p>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
        <h1 id="goToPostFormOnClick">Actualité du groupe</h1>
          <Posts />
        </>
      )}
    </>
  );
};

export default Home;
