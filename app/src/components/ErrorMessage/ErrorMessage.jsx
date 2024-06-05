import React from "react";
import style from "./ErrorMessage.module.css";
import { useProducts } from "../../contexts/ProductContext";

const Errormessage = () => {
  const { error } = useProducts();

  if (error)
    return (
      <section className={style.wrapper}>
        <p>{error}</p>
      </section>
    );
  else return null;
};

export default Errormessage;
