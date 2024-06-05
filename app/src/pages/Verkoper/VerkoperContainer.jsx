import React, { useState, useEffect } from "react";
import style from "./VerkoperContainer.module.css";
import AddProduct from "../../components/Verkoper/producten/AddProducts";
import ProductOverview from "../../components/Verkoper/producten/ProductOverview";
import Messages from "../../components/Verkoper/Messages/Messages";
import { useProducts, ProductProvider } from "../../contexts/ProductContext";
import { useMessages, MessageProvider } from "../../contexts/MessageContext";

const VerkoperContainer = () => {
  const [selectedOption, setSelectedOption] = useState("messages");
  const { user, setUser } = useProducts();
  const { fetchMessages } = useMessages();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (user) {
  //     fetchMessages(user.id);
  //   }
  // }, [user, fetchMessages]);

  return (
    <ProductProvider>
      <MessageProvider>
        <div className={style.containerver}>
          <div className={style.radioGroup}>
            <input
              type="radio"
              id="messages"
              name="view"
              value="messages"
              checked={selectedOption === "messages"}
              onChange={() => setSelectedOption("messages")}
              className={style.radioInput}
            />
            <label htmlFor="messages" className={style.radioLabel}>
              Messages
            </label>
            <input
              type="radio"
              id="products"
              name="view"
              value="products"
              checked={selectedOption === "products"}
              onChange={() => setSelectedOption("products")}
              className={style.radioInput}
            />
            <label htmlFor="products" className={style.radioLabel}>
              Products
            </label>
          </div>
          {selectedOption === "messages" && (
            <div>
              <Messages user={user} />
            </div>
          )}
          {selectedOption === "products" && (
            <div className={style.flexContainer}>
              <AddProduct user={user} />
              <ProductOverview user={user} />
            </div>
          )}
        </div>
      </MessageProvider>
    </ProductProvider>
  );
};

export default VerkoperContainer;
