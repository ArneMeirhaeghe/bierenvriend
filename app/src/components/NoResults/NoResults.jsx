import React from "react";
import style from "./NoResults.module.css";

const Noresults = () => {
  return (
    <section className={style.wrapper}>
      <h1 className={style.title}>
        Sorry, er lijken geen resultaten gevonden te zijn met jouw gewenste
        criteria.
      </h1>
    </section>
  );
};

export default Noresults;
