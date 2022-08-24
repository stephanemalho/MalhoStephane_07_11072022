import { useRef, useState, useEffect, useContext } from "react";
import "./log.css";
import AuthContext from "../../context/authProvider";
import logo from "../../img/logo.png";
import axios from "../../api/axios";
import Home from "../../pages/Home";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    //console.log(email);
    //console.log(pwd);
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email , password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response.data.userId));
      console.log(response.data.token);
      const token = response.data.token;
      const userId = JSON.stringify(response.data.userId);
      localStorage.setItem("token", token.token);
      localStorage.setItem("userId", userId);
      setAuth({email, pwd, token});
      setEmail("");
      setPwd("");
      setSuccessMsg(true);
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg("Erreur de serveur");
      } else if  (err.response?.status === 400) {
        setErrMsg("Courriel ou Mot de passe incorecte");
      } else if  (err.response?.status === 401) {
        setErrMsg("Profil non autorisé");
      }else {
        setErrMsg("Connection impossible");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {successMsg ? (
       <Home />
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <article className="display-title-form">
            <h1>Vous connecter</h1>
            <img className="App-logo" src={logo} alt="logo" />
          </article>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              value={email}
              required
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              autoComplete="off"
              value={pwd}
              required
            />
          <button>Connexion</button>
          </form>
          <p>
            Besoin d'un compte ?<br />
            <span className="line">
              <a
                className="App-link"
                href="http://localhost:3000/Register"
              >
                S'inscrire
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
