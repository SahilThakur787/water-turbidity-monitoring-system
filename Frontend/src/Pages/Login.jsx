import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Pages/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 NEW: state for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 UPDATED LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await res.json();

      // 🔴 If login fails
      if (!res.ok) {
        alert(data.detail);   // show error from backend
        return;
      }

      // ✅ If login success
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">Water Turbidity App</h1>
        <p className="login-subtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Enter Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="show-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <p className="login-text">
          New User? <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;