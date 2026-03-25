"use client";

import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

import axios from "axios";
import { useEffect, useState } from "react";

export interface Order {
  _id: string;

  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
    phoneNo: number;
  };

  paymentInfo: {
    name: string;
  };

  orderItems: OrderItem[];

  paidAt: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;

  orderStatus: "Processing" | "Shipped" | "Out for Delivery" | "Delivered";

  createdAt: string;
  __v: number;
}

export default function OrderTracker() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const steps = [
    { name: "Processing", icon: <FaBox /> },
    { name: "Shipped", icon: <FaShippingFast /> },
    { name: "Out for Delivery", icon: <FaTruck /> },
    { name: "Delivered", icon: <FaCheckCircle /> },
  ];

  // ✅ Fetch Orders
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get`
        );
        setOrders(res.data.orders); // ✅ correct data
        
      } catch (err) {
        console.log(err);
      }
    };

    getOrder();
  }, []);

  // ✅ Dynamic Step based on selected order
  const currentStep = selectedOrder
    ? steps.findIndex(
        (step) => step.name === selectedOrder.orderStatus
      )
    : -1;

  return (
    <div className="container py-5 margin">

      <h3 className="mb-4">📦 My Orders</h3>

      {/* ✅ TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            
            <th>Product</th>
            <th>Total</th>
            <th>Status</th>
            <th>Track</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
            

              <td>{order.orderItems[0]?.name}</td>

              <td>₹{order.totalPrice}</td>

              <td>{order.orderStatus}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  Track My Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ TRACKER SHOW ONLY WHEN CLICK */}
      {selectedOrder && (
        <>
        <h3 className="text-center my-5">
  🚚 Tracking Order: {selectedOrder?.orderItems?.[0]?.name}
</h3>
                  <div className="position-relative w-100 mt-5">

                      {/* 🔘 Background Line */}
                      <div
                          style={{
                              position: "absolute",
                              top: "30px",
                              left: "5%",
                              width: "90%",
                              height: "4px",
                              background: "#ddd",
                              zIndex: 0,
                          }}
                      ></div>

                      {/* 🟢 Progress Line */}
                      <div
                          style={{
                              position: "absolute",
                              top: "30px",
                              left: "5%",
                              width: `${(currentStep / (steps.length - 1)) * 90}%`,
                              height: "4px",
                              background: "green",
                              zIndex: 0,
                              transition: "0.4s ease",
                          }}
                      ></div>

                      {/* 🔄 Steps */}
                      <div className="d-flex justify-content-between position-relative">
                          {steps.map((step, index) => (
                              <div key={index} className="text-center" style={{ width: "25%" }}>

                                  {/* 🔵 Circle */}
                                  <div
                                      className={`mx-auto d-flex align-items-center justify-content-center ${index <= currentStep
                                          ? "bg-success text-white"
                                          : "bg-light text-muted"
                                          }`}
                                      style={{
                                          width: "60px",
                                          height: "60px",
                                          borderRadius: "50%",
                                          position: "relative",
                                          zIndex: 1,
                                          fontSize: "20px",
                                      }}
                                  >
                                      {step.icon}
                                  </div>

                                  {/* 🏷 Label */}
                                  <p
                                      className={`mt-3 fw-semibold ${index <= currentStep
                                          ? "text-success"
                                          : "text-muted"
                                          }`}
                                      style={{ fontSize: "14px" }}
                                  >
                                      {step.name}
                                  </p>
                              </div>
                          ))}
                      </div>
                  </div>
        </>
      )}
    </div>
  );
}