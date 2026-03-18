'use client';

import Link from 'next/link';
import {
  FaSearch,
  FaShoppingBag,
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBars,
} from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { useEffect, useRef } from 'react';
import Search from './search';

export default function Navbar() {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        headerRef.current.classList.add("shadow");
      } else {
        headerRef.current.classList.remove("shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} id="mainHeader" className="container-fluid fixed-top  ">
      {/* Top Bar */}
      <div className="container topbar bg-primary d-none d-lg-block">
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <FaMapMarkerAlt className="me-2 text-light" />
              <Link href="#" className="text-white">
                123 Street, New York
              </Link>
            </small>

            <small className="me-3">
              <FaEnvelope className="me-2 text-light" />
              <Link href="#" className="text-white">
                Email@Example.com
              </Link>
            </small>
          </div>

          <div className="top-link pe-2">
            <Link href="#" className="text-white">
              <small className="mx-2">Privacy Policy</small>/
            </Link>
            <Link href="#" className="text-white">
              <small className="mx-2">Terms of Use</small>/
            </Link>
            <Link href="#" className="text-white">
              <small className="ms-2">Sales and Refunds</small>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container ">
        <nav className="navbar ">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            <h1 className="text-primary display-6">ShopNest</h1>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="bg-transparent border-0 d-lg-none"
            type="button"
          > <FiMenu className="text-primary fs-4" /></button>

          <div className="bg-white d-none d-lg-block">
            {/* Nav Links */}
            <div className="navbar-nav mx-auto">
              {/* <Link href="/" className="nav-item nav-link active">Home</Link>
              <Link href="/shop" className="nav-item nav-link">Shop</Link>
              <Link href="/cart" className="nav-item nav-link">Shop Cart</Link>
              <Link href="/checkout" className="nav-item nav-link">Checkout</Link>
              <Link href="/contact" className="nav-item nav-link">Contact</Link> */}
            </div>

            {/* Right Icons */}
            <div className="d-flex align-items-center gap-3 m-3 me-0">

              {/* Search */}
                  <Search />

              {/* Cart */}
              <Link
                href="/cart"
                className="position-relative d-flex align-items-center justify-content-center"
              >
                <FaShoppingBag className="fs-2 text-warning" />
                <span
                  className="position-absolute top-0 start-100 translate-middle bg-primary rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    height: "20px",
                    minWidth: "20px",
                    fontSize: "12px",
                  }}
                >
                  3
                </span>
              </Link>

              {/* User */}
              <Link
                href="/login"
                className="d-flex align-items-center justify-content-center"
              >
                <FaUser className="fs-2 text-warning" />
              </Link>

            </div>

          </div>
        </nav>
      </div>
    </header>
  );
}
