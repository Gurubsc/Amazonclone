import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [ userName, setUsername ] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {
      alert("Login successful");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="container margin">
      <div className="row justify-content-center">
        <div className="col-md-5">

          {/* Login Form */}
          {!showSignup && (
            <div className="card p-4 shadow">
              <h3 className="text-center mb-3">Log In</h3>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" required />
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
          )}

          {/* Signup Form */}
          {showSignup && (
            <div className="card p-4 shadow">
              <h3 className="text-center mb-3">Sign Up</h3>

              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" required />
                </div>

                <button className="btn btn-success w-100">Sign Up</button>
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

        </div>
      </div>
    </div>
  );
};

export default AuthPage;