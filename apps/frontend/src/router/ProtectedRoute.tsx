import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { UserRole } from "@starshield/shared";
import { useAuth } from "../context/AuthContext.js";
import { APP_ROUTES } from "../constants/routes.js";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: UserRole;
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to={APP_ROUTES.login} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate replace to={APP_ROUTES.terminalKits} />;
  }

  return <>{children}</>;
}
