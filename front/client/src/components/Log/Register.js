import { useRef, useState, useEffect } from "react";
import "./log.css";
import logo from "../../img/logo.png";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon}  from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import Login from "./Login";


const USER_REGEX = /^[a-zA-Z\u00C0-\u017F][a-zA-Z0-9-_\u00C0-\u017F]{3,23}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const REGISTER_URL = "/api/auth/signup";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setValidNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validEmailFocus, setValidEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [validMatchPwdFocus, setValidMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]); // add email to this array if you want to check it

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with js hack
    const V1 = USER_REGEX.test(user);
    const V2 = EMAIL_REGEX.test(email);
    const V3 = PWD_REGEX.test(pwd);
    if (!V1 || !V2 || !V3) {
      setErrMsg("Information invalide");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        pseudo: user,
        email,
        password: pwd,
      });
      console.log(response);
      console.log(JSON.stringify(response));
      setSuccessMsg(true);
    }
    catch (err) {
      if (!err?.response) {
        setErrMsg("Erreur de serveur");
      } else if  (err.response.data.error.email || err.response.data.error.errors.email) {
        setErrMsg("Courriel: Éxiste déja");
      } else if  (err.response.data.error.pseudo || err.response.data.error.errors.pseudo) {
        setErrMsg("Pseudo: Éxiste déja");
      }else {
        setErrMsg("Erreur d'enregistrement");
      }
      errRef.current.focus();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSuccessMsg(true);
  }


  return (
    <>
      {successMsg ? (
       <Login />
      ) : (
        <section>
          <article className="display-title-form">
            <h3>Créer un compte </h3>
            <img className="App-logo" src={logo} alt="logo" />
          </article>
          <form onSubmit={handleSubmit}>
            {/* FORMULARY FOR REGISTER USER */}
            {/* INPUT TO CHECK THE USERNAME FORMAT */}
            <label htmlFor="username">
              Pseudo:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              autoFocus
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="username-err" /* uidnote */
              onFocus={() => setValidNameFocus(true)}
              onBlur={() => setValidNameFocus(false)}
            />
            <p
              id="username-err"
              className={
                nameFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 à 20 caractères,
              <br /> commençant par une lettre.
              <br /> Seul les lettres, les chiffres et les caractères - et _
              sont autorisés.
            </p>
            {/* INPUT TO CHECK THE EMAIL FORMAT */}
            <label htmlFor="email">
              Courriel:
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="email-err"
              onFocus={() => setValidEmailFocus(true)}
              onBlur={() => setValidEmailFocus(false)}
            />
            <p
              id="email-err"
              className={
                validEmailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Une adresse email valide doit être saisie.
            </p>

            {/* INPUT TO CHECK THE PASSWORD */}
            <label htmlFor="password">
              Mot de passe:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              autoComplete="off"
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 à 24 caractères,
              <br /> Doit contenir au moins une lettre minuscule, une lettre
              majuscule, un chiffre et un caractère spécial. caractères
              autorisés:
              <span aria-label="exclamation mark" role="img">
                !
              </span>
              <span aria-label="asterisk" role="img">
                *
              </span>
              <span aria-label="percent sign" role="img">
                %
              </span>
              <span aria-label="hyphen" role="img">
                -
              </span>
              <span aria-label="underscore" role="img">
                _
              </span>
              <span aria-label="equal sign" role="img">
                =
              </span>
              <span aria-label="hashtag" role="img">
                #
              </span>
              <span aria-label="at sign" role="img">
                @
              </span>
            </p>
            {/* FORMULARY FOR CHECK THE RE PASSWORD */}
            <label htmlFor="confirm_pwd">
              Confirmer le mot de passe:
              <span className={validMatchPwd && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              autoComplete="off"
              required
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="repassword-err"
              onFocus={() => setValidMatchPwdFocus(true)}
              onBlur={() => setValidMatchPwdFocus(false)}
            />
            <p
              id="repassword-err"
              className={
                validMatchPwdFocus && !validMatchPwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Doit être identique au mot de passe.
            </p>
            <button
              disabled={
                !validName || !validEmail || !validPwd || !validMatchPwd
                  ? true
                  : false
              }
            >
              Créer un compte
            </button>
            <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
            <p>
              <b>Déja inscrit ?</b><br />
                <button onClick={handleLogin}>Se connecter</button>
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
