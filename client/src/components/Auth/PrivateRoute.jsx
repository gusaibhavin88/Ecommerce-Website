import { Navigate, Outlet, Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ path, element: Element, ...props }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated === false || isAuthenticated === null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
