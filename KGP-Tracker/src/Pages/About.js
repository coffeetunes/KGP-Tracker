import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "O aplikacji - KGP Tracker";
  }, []);

  return (
    <div>
      <h1 className="main-heading mt-5">O aplikacji</h1>
      <h2 style={{ textAlign: "center" }}>
        Tu będzie w przyszłości opis aplikacji
      </h2>
    </div>
  );
};

export default About;
