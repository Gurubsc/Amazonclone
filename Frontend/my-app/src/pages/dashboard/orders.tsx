"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch Orders using Axios
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get`
        );

        setOrders(res.data.orders); // backend should send { orders: [] }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔄 Loading
  if (loading) {
    return <p className="text-center mt-5">Loading orders...</p>;
  }

  // ❌ Error
  if (error) {
    return (
      <p className="text-center text-danger mt-5">
        {error}
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Admin Orders</h3>

      {orders.length === 0 && (
        <p className="text-center">No orders found</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="card mb-4 shadow-sm border-0 rounded-4 p-3"
        >
          {/* 🛒 Order Items */}
          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="d-flex align-items-center border-bottom pb-3 mb-3"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                unoptimized
                className="rounded-3"
              />

              <div className="ms-3 flex-grow-1">
                <h6 className="mb-1 fw-semibold">
                  {item.name}
                </h6>

                <p className="mb-1 text-muted small">
                  Quantity: {item.quantity}
                </p>

                <p className="mb-0 fw-bold text-success">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}

          {/* 💰 Price Details */}
          <div className="mt-2">
            <p className="mb-1">
              <strong>Items:</strong> ₹{order.itemsPrice}
            </p>
            <p className="mb-1">
              <strong>Tax:</strong> ₹{order.taxPrice}
            </p>
            <p className="mb-1">
              <strong>Shipping:</strong> ₹{order.shippingPrice}
            </p>

            <h5 className="text-success">
              Total: ₹{order.totalPrice}
            </h5>
          </div>

          {/* 🚚 Shipping Info */}
          <div className="mt-3">
            <h6 className="fw-bold">Shipping Info</h6>
            <p className="mb-1">
              {order.shippingInfo.address}
            </p>
            <p className="mb-1">
              {order.shippingInfo.city},{" "}
              {order.shippingInfo.state}
            </p>
            <p className="mb-1">
              {order.shippingInfo.country} -{" "}
              {order.shippingInfo.pinCode}
            </p>
            <p className="mb-1">
              📞 {order.shippingInfo.phoneNo}
            </p>
          </div>

          {/* 📦 Status */}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <span className="badge bg-warning text-dark">
              {order.orderStatus || "Processing"}
            </span>

            <small className="text-muted">
              {new Date(order.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}