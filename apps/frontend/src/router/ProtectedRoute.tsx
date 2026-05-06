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
    const fallback = user?.role === UserRole.Admin ? APP_ROUTES.admin : APP_ROUTES.myTerminals;
    return <Navigate replace to={fallback} />;
  }

  return <>{children}</>;
}
