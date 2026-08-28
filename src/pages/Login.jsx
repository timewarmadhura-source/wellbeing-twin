import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    if (role === "student") {
      navigate("/student");
    } else if (role === "parent") {
      navigate("/parent");
    } else if (role === "teacher") {
      navigate("/teacher");
    } else if (role === "counsellor") {
      navigate("/counsellor");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 15% 20%, rgba(124,58,237,0.25), transparent 30%), radial-gradient(circle at 85% 30%, rgba(37,99,235,0.22), transparent 30%), #070b18",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(17,25,48,0.85)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
          backdropFilter: "blur(15px)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            margin: "0 auto 20px",
            boxShadow:
              "0 0 30px rgba(139,92,246,0.4)",
          }}
        >
          🧠
        </div>

        {/* Heading */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontSize: "32px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Sign in to your Wellbeing Twin
        </p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5e1",
              fontWeight: "600",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              outline: "none",
              marginBottom: "20px",
              fontSize: "15px",
            }}
          />

          {/* Password */}
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5e1",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              outline: "none",
              marginBottom: "20px",
              fontSize: "15px",
            }}
          />

          {/* Role */}
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5e1",
              fontWeight: "600",
            }}
          >
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.12)",
              background: "#111936",
              color: "white",
              outline: "none",
              marginBottom: "25px",
              fontSize: "15px",
            }}
          >
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="counsellor">Counsellor</option>
          </select>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "11px",
              background:
                "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                "0 10px 25px rgba(79,70,229,0.3)",
            }}
          >
            Sign In →
          </button>
        </form>

        {/* Back */}
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "12px",
            lineHeight: "1.6",
          }}
        >
          🔐 Your wellbeing information is handled
          with privacy in mind.
        </p>
      </div>
    </div>
  );
}

export default Login;