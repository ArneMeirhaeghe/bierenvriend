import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import style from "./ShoppingContainer.module.css";
import ShoppingCart from "../../components/Shopping/ShoppingCart";
import ShoppingOverview from "../../components/Shopping/ShoppingOverview";
import { useProducts } from "../../contexts/ProductContext";

const ShoppingContainer = () => {
  const { products, user, orders, orderItems } = useProducts();
  const [selectedOption, setSelectedOption] = useState("shoppingCart");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={style.container}>
      <div className={style.radioGroup}>
        <input
          type="radio"
          id="shoppingCart"
          name="view"
          value="shoppingCart"
          checked={selectedOption === "shoppingCart"}
          onChange={() => setSelectedOption("shoppingCart")}
          className={style.radioInput}
        />
        <label htmlFor="shoppingCart" className={style.radioLabel}>
          Shopping Cart
        </label>
        <input
          type="radio"
          id="overview"
          name="view"
          value="overview"
          checked={selectedOption === "overview"}
          onChange={() => setSelectedOption("overview")}
          className={style.radioInput}
        />
        <label htmlFor="overview" className={style.radioLabel}>
          Overview
        </label>
      </div>
      {selectedOption === "shoppingCart" && (
        <div>
          <ShoppingCart products={products} orderItems={orderItems} />
        </div>
      )}
      {selectedOption === "overview" && (
        <div>
          <ShoppingOverview orders={orders} user={user} />
        </div>
      )}
    </div>
  );
};

export default ShoppingContainer;
