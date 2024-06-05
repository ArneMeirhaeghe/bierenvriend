import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import styles from "./ProductActions.module.css";
import { useProducts } from "../../contexts/ProductContext";

const ProductActions = ({
  product,
  isFav,
  favoriteID,
  onFavoriteToggle,
  onBestelClick,
}) => {
  const navigate = useNavigate();
  const { user } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const handleBestelClick = async () => {
    if (user) {
      await onBestelClick(product.id, quantity);
      setQuantity(1); // Reset the quantity to 1 after placing the order
    } else {
      navigate("/login");
    }
  };

  const handleFavoriteClick = () => {
    if (user) {
      onFavoriteToggle(product.id);
    } else {
      navigate("/login");
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  console.log(product.Stock);
  return (
    <div className={styles.actions}>
      <button className={styles.iconButton} onClick={handleFavoriteClick}>
        <FaHeart color={isFav ? "#ff4757" : "#ddd"} size={24} />
      </button>

      <div className={styles.add}>
        <div className={styles.quantityControl}>
          <button className={styles.quantityButton} onClick={incrementQuantity}>
            <FaPlus size={20} />
          </button>

          <input
            type="number"
            className={styles.quantityInput}
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={product.Stock}
          />
          <button className={styles.quantityButton} onClick={decrementQuantity}>
            <FaMinus size={20} />
          </button>
        </div>
        <button className={styles.iconButton} onClick={handleBestelClick}>
          <FaShoppingCart size={24} />
          <span>add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
