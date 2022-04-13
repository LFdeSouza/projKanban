import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return !loading && isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
