import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { UserRole } from "@starshield/shared";
import { useAuth } from "../context/AuthContext.js";
import { APP_ROUTES } from "../constants/routes.js";

export function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const destination = user?.role === UserRole.Admin ? APP_ROUTES.admin : APP_ROUTES.terminalKits;
    return <Navigate replace to={destination} />;
  }

  return <>{children}</>;
}
