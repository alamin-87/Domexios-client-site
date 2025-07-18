import React from "react";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isRoleLoading } = useUserRole();
  if (loading || isRoleLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }
  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbiden"></Navigate>
    );
  }
  return children;
};

export default AdminRoute;
