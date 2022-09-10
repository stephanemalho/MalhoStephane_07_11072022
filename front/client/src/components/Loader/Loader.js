//import react
import React from "react";
import "./loader.css";

function Loader() {
  // use effect to reload the page when the user is connected
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      if (loading) {
        window.location.reload();
      }
    }, 1000);
  }, [loading]);

  return (
    <div className="loader">
      <div className="BgAnim">{loading}</div>
    </div>
  );
}

export default Loader;
