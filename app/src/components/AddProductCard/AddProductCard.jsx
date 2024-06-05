import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProductCard.module.css"; // Import the CSS module

const AddProductCard = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData(product);
    setProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
    window.location.reload();
  };

  function sendData(data) {
    const url = "http://localhost:3001/products";
    axios
      .post(url, data)
      .then((response) => console.log("Product added:", response.data))
      .catch((error) => console.error("Error adding product", error));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>
      <div>
        <label className={styles.label}>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>Stock:</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default AddProductCard;
