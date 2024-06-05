import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import FavService from "../../services/FavService";
import OrderService from "../../services/OrderService";
import styles from "./Detail.module.css"; // Import the CSS module
import DetailInfo from "../../components/Detail/DetailInfo";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import { useProducts } from "../../contexts/ProductContext";

function Detail() {
  const { isLoading, error, user } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  const productService = new ProductService({
    user: user,
    setProducts: () => {},
    error: (message) => console.error(message),
  });

  const favService = new FavService({
    user: user,
    setFav: setFavorites,
    error: (message) => console.error(message),
  });

  const orderService = new OrderService({
    user: user,
    setOrder: setOrders,
    error: (message) => console.error(message),
  });

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await productService.getProductById(id);
      setProduct(fetchedProduct);
      setLoading(false);
    } catch (error) {
      setFetchError(error);
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (user) {
      await favService.getAllFavByUser(user.id);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchProduct();
      fetchFavorites();
    }
  }, [id, user]);

  const onFavoriteToggle = async (productID, isFav, favoriteID) => {
    if (isFav) {
      await favService.removeFavorite(favoriteID);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== favoriteID)
      );
    } else {
      const newFav = await favService.addFavorite(user.id, productID);
      setFavorites((prevFavorites) => [...prevFavorites, newFav]);
    }
  };

  const onBestelClick = async (productID, quantity) => {
    alert(`Bestel button clicked with quantity: ${quantity}`);
    const existingOrder = await orderService.getExistingOrder(user.id);
    let orderID;
    if (existingOrder) {
      orderID = existingOrder.id;
    } else {
      const newOrder = await orderService.addOrder(user.id);
      orderID = newOrder.id;
    }

    await orderService.addOrderItem(orderID, productID, quantity);
    setOrders((prevOrders) => [
      ...prevOrders,
      { orderID, productID, quantity },
    ]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const favorite = favorites.find((fav) => fav.productID === product.id);

  return (
    <div className={styles.container}>
      <div className={styles.secnav}>
        <div className={styles.bread}>
          <a href="/">home</a> > {product.Name}
        </div>
      </div>
      <div className={styles.dubbel}>
        <div className={styles.product}>
          <div className={styles.image}>
            <img src={product.Images} alt={product.Name} />
          </div>
          {user && <ChatMessages product={product} user={user} />}
        </div>
        <DetailInfo
          product={product}
          user={user}
          isFav={!!favorite}
          favoriteID={favorite ? favorite.id : null}
          onFavoriteToggle={onFavoriteToggle}
          onBestelClick={onBestelClick}
        />
      </div>
    </div>
  );
}

export default Detail;
