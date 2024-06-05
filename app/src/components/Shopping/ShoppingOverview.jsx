import React, { useEffect } from "react";
import styles from "./ShoppingOverview.module.css";

const ShoppingOverview = ({ orders, user }) => {
  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.heading}>Shopping Overview</h1>
      <div className={styles.userInformation}>
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <h2>Orders</h2>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>
                {order.total_amount ? order.total_amount.toFixed(2) : "0.00"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingOverview;
