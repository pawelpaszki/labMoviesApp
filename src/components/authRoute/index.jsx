import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const AuthRoute = () => {
  const context = useContext(AuthenticationContext)
  const location = useLocation();
  console.log(context.isAuthenticated);
  return context.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;