import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ admin: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      const res = await fetch("http://localhost:3000/admins"); // ✅ JSON-server ka API
      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }

      const admins = await res.json();

      const adminFound = admins.find(
        (admin) =>
          admin.admin === adminData.admin &&
          admin.password === adminData.password
      );

      if (adminFound) {
        // ✅ Session me data save kar rahe
        sessionStorage.setItem("admin", JSON.stringify(adminFound));

        // ✅ Redirect dashboard par
         navigate("/layout");
        
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server error. Make sure JSON server is running at port 3000.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="admin"
          placeholder="Admin Username"
          value={adminData.admin}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
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
