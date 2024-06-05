import React from "react";
import styles from "./DetailInfo.module.css";
import ProductActions from "../ProductActions/ProductActions";

const DetailInfo = ({
  product,
  user,
  isFav,
  favoriteID,
  onFavoriteToggle,
  onBestelClick,
}) => {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>{product.Name}</h1>
        <p
          className={`${styles.stock} ${
            product.Stock > 0 ? styles.inStock : styles.outOfStock
          }`}
        >
          {product.Stock > 0
            ? `Op voorraad: ${product.Stock}`
            : "Niet op voorraad"}
        </p>
      </div>
      <ProductActions
        product={product}
        user={user}
        isFav={isFav}
        favoriteID={favoriteID}
        onFavoriteToggle={onFavoriteToggle}
        onBestelClick={onBestelClick}
      />
      <div className={styles.info}>
        <h1>Gegevens</h1>
        <table>
          <tbody>
            <tr>
              <td>Description: </td>
              <td>{product.Description}</td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>{product.Category}</td>
            </tr>
            <tr>
              <td>Region:</td>
              <td>{product.Region}</td>
            </tr>
            <tr>
              <td>Packaging:</td>
              <td>{product.Packaging}</td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{product.Type}</td>
            </tr>
            <tr>
              <td>Producer:</td>
              <td>{product.Producer}</td>
            </tr>
            <tr>
              <td>AlcoholPercentage</td>
              <td>{product.AlcoholPercentage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailInfo;
