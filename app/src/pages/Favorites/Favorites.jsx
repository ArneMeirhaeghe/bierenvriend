import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import ErrorComponent from "../../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useProducts } from "../../contexts/ProductContext";
import styles from "./Favorites.module.css";

function Favorites() {
  const {
    products,
    isLoading,
    error,
    user,
    fav,
    handleFavoriteToggle,
    handleBestelClick,
  } = useProducts();

  useEffect(() => {
    if (!user) {
      return <Navigate to="/login" />;
    }
  }, [user]);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <ErrorComponent
        message={error.message || "Failed to fetch product details."}
      />
    );

  // Gebruik een Set om unieke productID's bij te houden
  const processedProductIDs = new Set();

  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.secnav}>
        <div className={styles.bread}>
          <a href="/">Producten</a> > <a href="/favorites">Favorites</a>
        </div>
        <h1>Favoriete producten</h1>
      </div>
      <div className={styles.section}>
        {fav.length > 0 ? (
          fav.map((favItem) => {
            const product = products[favItem.productID];
            if (product && !processedProductIDs.has(favItem.productID)) {
              processedProductIDs.add(favItem.productID);
              return (
                <ProductCard
                  key={favItem.id}
                  product={product}
                  user={user}
                  isFav={true}
                  favoriteID={favItem.id}
                  onFavoriteToggle={handleFavoriteToggle}
                  onBestelClick={handleBestelClick}
                  className={styles.productCard}
                />
              );
            }
            return null;
          })
        ) : (
          <p>No favorite products found.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
