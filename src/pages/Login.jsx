import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");

    if (role === "student") {
      window.location.replace("/student-dashboard");
      return;
    }

    if (role === "parent") {
      window.location.replace("/parent");
      return;
    }

    if (role === "teacher") {
      window.location.replace("/teacher");
      return;
    }

    if (role === "counsellor") {
      window.location.replace("/counsellor");
      return;
    }
  };

  return (
    <div className="login-page">

      <div className="login-decoration login-decoration-one"></div>
      <div className="login-decoration login-decoration-two"></div>

      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          🌿
        </div>

        <h1 className="login-heading">
          Welcome to Wellbeing Twin
        </h1>

        <p className="login-subheading">
          Your personal digital wellbeing companion
        </p>

        {/* Role */}
        <div className="login-role-section">

          <label className="login-label">
            Login as
          </label>

          <div className="login-role-buttons">

            <button
              type="button"
              className={`login-role-button ${
                role === "student" ? "active" : ""
              }`}
              onClick={() => selectRole("student")}
            >
              🎓 Student
            </button>

            <button
              type="button"
              className={`login-role-button ${
                role === "parent" ? "active" : ""
              }`}
              onClick={() => selectRole("parent")}
            >
              👨‍👩‍👧 Parent
            </button>

            <button
              type="button"
              className={`login-role-button ${
                role === "teacher" ? "active" : ""
              }`}
              onClick={() => selectRole("teacher")}
            >
              👩‍🏫 Teacher
            </button>

            <button
              type="button"
              className={`login-role-button ${
                role === "counsellor" ? "active" : ""
              }`}
              onClick={() => selectRole("counsellor")}
            >
              💚 Counsellor
            </button>

          </div>

          {/* Shows currently selected role */}
          <div
            style={{
              marginTop: "12px",
              padding: "8px 12px",
              borderRadius: "10px",
              background: "#e8f7f1",
              color: "#138a68",
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Selected: {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>

        </div>

        {/* Email */}
        <div className="login-field">

          <label className="login-label">
            Email
          </label>

          <div className="login-input-wrapper">

            <span>✉️</span>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

        </div>

        {/* Password */}
        <div className="login-field">

          <label className="login-label">
            Password
          </label>

          <div className="login-input-wrapper">

            <span>🔒</span>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

        </div>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {/* Sign In */}
        <button
          type="button"
          className="login-button"
          onClick={handleLogin}
        >
          Sign In →
        </button>

        <div className="login-trust">
          🔐 Your wellbeing data is private and secure
        </div>

        <Link
          to="/"
          className="login-back"
        >
          ← Back to home
        </Link>

      </div>

    </div>
  );
}

export default Login;