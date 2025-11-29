import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth"); // ✅ check login
  return isAuth ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
