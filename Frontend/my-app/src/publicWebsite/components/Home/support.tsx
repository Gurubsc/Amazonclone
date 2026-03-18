"use client";

import { FaCarSide, FaUserShield, FaExchangeAlt, FaPhoneAlt } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaCarSide size={40} color="white" />,
    title: "Free Shipping",
    desc: "Free on order over $300",
  },
  {
    id: 2,
    icon: <FaUserShield size={40} color="white" />,
    title: "Security Payment",
    desc: "100% security payment",
  },
  {
    id: 3,
    icon: <FaExchangeAlt size={40} color="white" />,
    title: "30 Day Return",
    desc: "30 day money guarantee",
  },
  {
    id: 4,
    icon: <FaPhoneAlt size={40} color="white" />,
    title: "24/7 Support",
    desc: "Support every time fast",
  },
];

export default function Features() {
  return (
    <div className="container-fluid featurs py-5">
      <div className="container py-5">
        <div className="row g-4">
          {features.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-warning mb-5 mx-auto">
                  {item.icon}
                </div>
                <div className="featurs-content text-center">
                  <h5>{item.title}</h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
