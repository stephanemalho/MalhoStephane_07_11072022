import { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import "./log.css";
import AuthContext from "../../context/authProvider";
import logo from "../../img/logo.png";
import axios from "../../api/axios";
import Register from "./Register";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  // const [confirmRedirect, setConfirmRedirect] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
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
      // setErrMsg(err.response.data.error);
      // console.log(err);
      // console.log(err.response.data.error);
      if (err.response.data.error) {
        setErrMsg(err.response.data.error);
      }
      if (err.response.data.message) {
        setErrMsg(err.response.data.message);
      }
      errRef.current.focus();
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterPage(true);
    
  }

  return (
    <>
      {successMsg ? (
        <Navigate to="/home" />
      ) : registerPage ? <Register /> : (
        <section>
          <article className="display-title-form">
            <h3>Vous connecter</h3>
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
          <button disabled={
                !email || !pwd
                  ? true
                  : false
              }
          >Connexion</button>

          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <p>
            Besoin d'un compte ?<br />
            <button onClick={handleRegister}>S'enregister</button>
          </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
