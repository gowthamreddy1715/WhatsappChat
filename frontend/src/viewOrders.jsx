import React, { useState } from "react";
import axios from "axios";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const handleViewOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/view",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders. Please login again.");
    }
  };

  return (
    <div className="view-orders-container">
      <h2>Your Orders</h2>
      <button onClick={handleViewOrders}>View Orders</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            <strong>Order ID:</strong> {order.orderId}, <strong>Name:</strong> {order.customerName}, <strong>Phone:</strong> {order.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrders;
