import React from "react";
import { FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        <div
          className="pb-4 mb-4"
          style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
        >
          <div className="row g-4 align-items-center">
            
            {/* Logo */}
            <div className="col-lg-3">
              <a href="#" className="text-decoration-none">
                <h1 className="text-primary mb-0">ShopNest</h1>
                <p className="text-secondary mb-0">Your Everyday Shopping Destination</p>
              </a>
            </div>

            {/* Subscribe */}
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                <input
                  type="email"
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  placeholder="Your Email"
                />
                <button
                  type="button"
                  className="btn btn-primary border-0 py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0 }}
                >
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="col-lg-3">
              <div className="d-flex justify-content-end pt-3 gap-2">
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <FaTwitter />
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <FaFacebookF />
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <FaYoutube />
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className="text-center pt-4">
            <h6 className="mb-3">
                  Copyright © {new Date().getFullYear()} ShopNest. All Rights Reserved.
           </h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
