import React from "react";
import { Navigate, useLocation } from "react-router";
import UseAuth from "../hooks/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }
  if (!user) {
    return <Navigate state={{from: location.pathname}} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
