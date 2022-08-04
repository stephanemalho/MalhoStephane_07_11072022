import { useRef, useState, useEffect } from "react";
import axios from "./api/axios";
import logo from "./logo.png";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
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
    console.log(email);
    console.log(pwd);
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
      console.log(response);
      console.log(response.token);
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));

      setEmail("");
      setPwd("");
      setSuccessMsg(true);
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {successMsg ? (
        <section>
          <h1>Vous etes connecté</h1>
          <br />
          <p>
            <a href="http://localhost:3000/api/auth">Accéder à mon compte</a>
          </p>
        </section>
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
          </form>
          <button className="loginBtn">Connexion</button>
          <p>
            Besoin d'un compte ?<br />
            <span className="line">
              <a
                className="App-link"
                href="http://localhost:3000/api/auth/signup"
              >
                Se connecter
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
