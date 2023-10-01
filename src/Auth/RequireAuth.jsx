import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuth = localStorage.getItem("token_user");
  if (!isAuth) {
    return <Navigate to="/" replace="true" />;
  }
  return children;
};

export default RequireAuth;