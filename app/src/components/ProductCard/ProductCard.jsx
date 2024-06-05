import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import ProductActions from "../ProductActions/ProductActions";

const ProductCard = ({
  product,
  user,
  isFav,
  favoriteID,
  onFavoriteToggle,
  onBestelClick,
}) => {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <Link to={`${ROUTES.detail.to}${product.id}`} className={styles.link}>
          <h2 className={styles.title}>{product.name}</h2>
        </Link>
        <p className={styles.price}>€{product.price}</p>
      </div>
      <div className={styles.actionsContainer}>
        <ProductActions
          product={product}
          user={user}
          isFav={isFav}
          favoriteID={favoriteID}
          onFavoriteToggle={onFavoriteToggle}
          onBestelClick={onBestelClick}
        />
      </div>
    </div>
  );
};

export default ProductCard;
