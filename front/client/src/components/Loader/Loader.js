//import react
import React, { useState, useEffect }  from "react";
import "./loader.css";

function Loader() {
  // use effect to reload the page when the user is connected
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  return (
    <>
    { loading ? (
      <div className="loader">
        <div className="BgAnim">{loading}</div>
      </div>
    ) : (
      <div className="posterFirstMessage">
        <p>Veuillez remplir le formulaire ci-dessus afin de créer un premier post</p>
      </div>
    )}
    </>
  );
}

export default Loader;
