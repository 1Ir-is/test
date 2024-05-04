import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

// ProtectedRoute for owner-specific routes
export const OwnerProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  const isOwner = user && user.role === 2; // Check if user is an owner
  console.log(user?.role);
  return isLoggedIn() && isOwner ? (
    <>{children}</>
  ) : (
    <Navigate to="/access-denied" state={{ from: location }} replace /> // Redirect to 403 page for unauthorized access
  );
};
