import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/Auth1";

const ProtectedRoute = ({ userType }) => {
  const [auth] = useAuth();
  const location = useLocation();

  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = auth.token && (auth.user || auth.consultant);

  if (userType === 'user' && !isAuthenticated) {
    console.log("User not authenticated, redirecting to user signin");
    return <Navigate to="/user/signin" state={{ from: location }} replace />;
  }

  if (userType === 'consultant' && !isAuthenticated) {
    console.log("Consultant not authenticated, redirecting to consultant signin");
    return <Navigate to="/consultant/signin" state={{ from: location }} replace />;
  }

  console.log(`${userType} authenticated, rendering protected content`);
  return <Outlet />;
}

export default ProtectedRoute;