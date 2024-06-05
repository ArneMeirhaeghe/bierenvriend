import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProductService from "../../../services/ProductService";
import style from "./ProductOverview.module.css";

const ProductOverview = ({ user }) => {
  const [products, setProducts] = useState({});
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const productService = new ProductService({
    user: user,
    error: setError,
    setProducts: setProducts,
  });

  const handleDelete = async (productId) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        await productService.deleteProduct({ id: productId });
        setProducts((prevProducts) => {
          const updatedProducts = { ...prevProducts };
          delete updatedProducts[productId];
          return updatedProducts;
        });
        window.location.reload();
      }
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const handleChange = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await productService.updateProduct(selectedProduct);
      setProducts((prevProducts) => ({
        ...prevProducts,
        [selectedProduct.id]: selectedProduct,
      }));
      setShowModal(false);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProductsBySellerId(
          user.id
        );
        setProducts(fetchedProducts || {});
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [user]);

  return (
    <div className={style.container}>
      <h2>Your Products</h2>
      {error && <p className={style.error}>{error}</p>}
      <table className={style.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(products).length > 0 ? (
            Object.values(products).map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.Name}</td>
                <td>
                  <button
                    onClick={() => handleChange(product)}
                    className={style.iconButton}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={style.iconButton}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
              <div className={style.formGroup}>
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={selectedProduct.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  value={selectedProduct.Description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Category">Category</label>
                <input
                  type="text"
                  id="Category"
                  name="Category"
                  value={selectedProduct.Category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Price">Price</label>
                <input
                  type="number"
                  id="Price"
                  name="Price"
                  value={selectedProduct.Price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Stock">Stock</label>
                <input
                  type="number"
                  id="Stock"
                  name="Stock"
                  value={selectedProduct.Stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="AlcoholPercentage">Alcohol Percentage</label>
                <input
                  type="number"
                  id="AlcoholPercentage"
                  name="AlcoholPercentage"
                  value={selectedProduct.AlcoholPercentage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Packaging">Packaging</label>
                <input
                  type="text"
                  id="Packaging"
                  name="Packaging"
                  value={selectedProduct.Packaging}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Producer">Producer</label>
                <input
                  type="text"
                  id="Producer"
                  name="Producer"
                  value={selectedProduct.Producer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Region">Region</label>
                <input
                  type="text"
                  id="Region"
                  name="Region"
                  value={selectedProduct.Region}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="Type">Type</label>
                <input
                  type="text"
                  id="Type"
                  name="Type"
                  value={selectedProduct.Type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className={style.submitButton}>
                Update Product
              </button>
              <button
                type="button"
                className={style.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
