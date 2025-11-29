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
      if (!res.ok) throw new Error("Failed to fetch admins");

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
        {/* ✅ ADMIN EMAIL/USERNAME */}
        <input
          type="text"
          placeholder="Email or Username"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
          required
        />

        {/* ✅ PASSWORD */}
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




//====================================================error


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [admin, setAdmin] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // ✅ JSON Server API se admin list laa rahe
//       const res = await fetch("http://localhost:3000/admins");
//       if (!res.ok) throw new Error("Failed to fetch admins");

//       const admins = await res.json();

//       // ✅ Matching admin check
//       const adminFound = admins.find(
//         (admin) => admin.admin === admin && admin.password === password
//       );

//       if (adminFound) {
//         localStorage.setItem("isAuth", "true"); // ✅ Save session
//         navigate("/dashboard"); // ✅ redirect
//       } else {
//         setError("Invalid admin or Password");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Server error! Please check JSON server.");
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Admin"
//           value={admin}
//           onChange={(e) => setAdmin(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Admin Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default AdminLogin;
