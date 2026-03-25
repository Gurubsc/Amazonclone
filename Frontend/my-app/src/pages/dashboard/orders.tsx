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

  const handleUpdate = async (id, status) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/update/${id}`,
      { status: status }
    );
    window.alert("updated")
    // refresh orders
    window.location.reload();
  } catch (err) {
    window.alert("error")
    console.log(err);
  }
};

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Admin Orders</h3>

      {orders.length === 0 && (
        <p className="text-center">No orders found</p>
      )}

      <table className="table table-striped table-hover align-middle">
  <thead className="table-dark">
    <tr>
      <th>Item</th>
      <th>Name</th>
      <th>Quantity</th>
      <th>Price (₹)</th>
      <th>Items Price (₹)</th>
      <th>Tax (₹)</th>
      <th>Shipping (₹)</th>
      <th>Total (₹)</th>
      <th>Shipping Info</th>
      <th>Status</th>
      <th>Ordered At</th>
      <th>Progress</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order) =>
      order.orderItems.map((item, index) => (
        <tr key={item._id}>
          <td>
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              unoptimized
              className="rounded-2"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>₹{item.price}</td>
          {index === 0 && (
            <>
              <td rowSpan={order.orderItems.length}>₹{order.itemsPrice}</td>
              <td rowSpan={order.orderItems.length}>₹{order.taxPrice}</td>
              <td rowSpan={order.orderItems.length}>₹{order.shippingPrice}</td>
              <td rowSpan={order.orderItems.length}>₹{order.totalPrice}</td>
              <td rowSpan={order.orderItems.length}>
                {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                {order.shippingInfo.state}, {order.shippingInfo.country} -{" "}
                {order.shippingInfo.pinCode} <br />
                📞 {order.shippingInfo.phoneNo}
              </td>
              <td rowSpan={order.orderItems.length}>
                <span className={`badge ${order.orderStatus === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                  {order.orderStatus || "Processing"}
                </span>
              </td>
              <td rowSpan={order.orderItems.length}>
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td>
                {order.orderStatus === "Processing" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdate(order._id, "Shipped")}
                  >
                    Shipped
                  </button>
                )}
              </td>
            </>
          )}
        </tr>
      ))
    )}
  </tbody>
</table>
    </div>
  );
}