import React, { useState } from "react";
import style from "./AddProduct.module.css";
import ProductService from "../../../services/ProductService";
import { useProducts } from "../../../contexts/ProductContext";

const AddProducts = ({ onProductAdded, user }) => {
  const [formState, setFormState] = useState({
    Name: "",
    Description: "",
    Category: "",
    Price: "",
    Stock: "",
    Image: "https://picsum.photos/200",
    Region: "",
    Packaging: "",
    Type: "",
    Producer: "",
    AlcoholPercentage: "",
    UserID: user.id,
  });
  const [error, setError] = useState("");

  const { addProduct } = useProducts();

  const productService = new ProductService({
    user: user,
    error: setError,
    setProducts: () => {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formState);
      addProduct(formState);
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className={style.container}>
      <h2>Add New Product</h2>
      {error && <p className={style.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formState.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            id="Description"
            name="Description"
            value={formState.Description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Category">Category</label>
          <input
            type="text"
            id="Category"
            name="Category"
            value={formState.Category}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Price">Price</label>
          <input
            type="number"
            id="Price"
            name="Price"
            value={formState.Price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Stock">Stock</label>
          <input
            type="number"
            id="Stock"
            name="Stock"
            value={formState.Stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Image">Image</label>
          <input
            type="text"
            id="Image"
            name="Image"
            value={formState.Image}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Region">Region</label>
          <input
            type="text"
            id="Region"
            name="Region"
            value={formState.Region}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Packaging">Packaging</label>
          <input
            type="text"
            id="Packaging"
            name="Packaging"
            value={formState.Packaging}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Type">Type</label>
          <input
            type="text"
            id="Type"
            name="Type"
            value={formState.Type}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="Producer">Producer</label>
          <input
            type="text"
            id="Producer"
            name="Producer"
            value={formState.Producer}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="AlcoholPercentage">Alcohol Percentage</label>
          <input
            type="number"
            id="AlcoholPercentage"
            name="AlcoholPercentage"
            value={formState.AlcoholPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={style.submitButton}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
