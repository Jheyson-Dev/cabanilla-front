import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (role && !allowedRoles.includes(role)) {
    // Redirigir a una página de acceso denegado o a la página principal
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;
