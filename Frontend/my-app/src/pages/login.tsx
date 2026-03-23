"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Handle Login
 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        email,
        password,
      }
    );

    // ✅ Store token
    localStorage.setItem("token", response.data.token);
    window.alert("Login successful");
    setEmail("");
    setPassword("");

    // Optional: redirect
     router.push("/"); // Change to your dashboard route

  } catch (err) {
    setError(
      err.response?.data?.message || "An error occurred during login. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    
    console.log("Token from localStorage:", token); // ✅ Debugging
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getdetails`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUser(response.data.user);

  } catch (error) {
    console.log(error.response?.data);
  }
};

useEffect(() => {
  getUserDetails();
}, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

        {
        user ? (
    <div className="alert alert-success margin">
      Welcome, {user.name}! You are logged in.
      <div className="alert alert-success">
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Role:</strong> {user.role}</p>
    <button
      className="btn btn-danger mt-3"
      onClick={() => {
        localStorage.removeItem("token");
        setUser(null);
        window.alert("Logged out successfully");
        setUser(null);
        router.push("/");
      }}
    >
      Log Out
    </button>
  </div>
    </div>
  ) : (
    <>
      {!showSignup ? (
        <div className="card p-4 shadow margin">
          <h3 className="text-center mb-3">Log In</h3>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Log In
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className="card p-4 shadow margin">
          <h3 className="text-center mb-3">Sign Up</h3>
          {error && <div className="alert alert-danger">{error}</div>}

          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setShowSignup(false)}
            >
              Log In
            </span>
          </p>
        </div>
      )}
    </>
  )
}

          
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
