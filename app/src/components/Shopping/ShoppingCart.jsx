import React from "react";
import styles from "./ShoppingCart.module.css";
import { useProducts } from "../../contexts/ProductContext";

const ShoppingCart = () => {
  const {
    orderItems,
    products,
    quantities,
    setQuantities,
    error,
    updateOrderStatusAndTotalAmount,
    orders,
  } = useProducts();

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: quantity,
      }));
    }
  };

  const placeOrder = async () => {
    try {
      const openOrder = orders.find((order) => order.status === "open");
      if (openOrder) {
        const totalAmount = orderItems.reduce((acc, item) => {
          const product = products[item.productID];
          return product ? acc + quantities[item.id] * product.price : acc;
        }, 0);
        await updateOrderStatusAndTotalAmount(
          openOrder.id,
          "ordered",
          totalAmount
        );
        alert("Order placed successfully!");
      } else {
        alert("No open order found.");
      }
    } catch (err) {
      alert(`Failed to place order: ${err.message}`);
    }
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => {
            const product = products[item.productID];
            return (
              <tr key={item.id}>
                <td>{item.orderID}</td>
                <td>{product ? product.name : "Product not found"}</td>
                <td>
                  <input
                    type="number"
                    value={quantities[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className={styles.quantityInput}
                  />
                </td>
                <td>
                  {product
                    ? quantities[item.id] * product.price
                    : "Product not found"}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>
              {orderItems.reduce((acc, item) => {
                const product = products[item.productID];
                return product
                  ? acc + quantities[item.id] * product.price
                  : acc;
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
      <button className={styles.placeOrderButton} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default ShoppingCart;
