import React from "react";
import style from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={style.notFound}>
      <div className={style.questionMark}>?</div>
      <h1>404</h1>
      <p>Oeps! De pagina die je zoekt bestaat niet.</p>
      <a href="/" className={style.homeLink}>
        Ga terug naar Home
      </a>
    </div>
  );
};

export default NotFound;
