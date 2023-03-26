import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ auth, children }) => {
  const response = auth.isAuthenticated();

  console.log(response);

  if (!response) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
