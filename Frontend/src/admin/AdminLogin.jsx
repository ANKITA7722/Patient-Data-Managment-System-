import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/admin");
      if (!res.ok) throw new Error("Failed to fetch admin");

      const admins = await res.json();

      // ✅ Match admin
      const adminFound = admins.find(
        (a) =>
          a.email === admin || a.name === admin
            ? a.password === password
            : false
      );

      if (adminFound) {
        sessionStorage.setItem("admin", JSON.stringify(adminFound));
        navigate("/dashboard");
      } else {
        setError("Invalid Admin or Password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error! Please run JSON server.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        
        <input
          type="text"
          placeholder="Email or Username"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
          required
        />

     
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminLogin;







