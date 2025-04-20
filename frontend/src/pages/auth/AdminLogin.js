// src/pages/auth/AdminLogin.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await adminLogin(credentials);
  
      // ✅ Save user and token correctly
      login({ username: data.username, role: "admin" }, data.token);
  
      // ✅ Navigate to admin dashboard
      navigate("/admin");
  
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err.detail ||
        err.error ||
        err.message ||
        "Admin login failed. Please try again.";
      setError(msg);
    }
  };
  

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
