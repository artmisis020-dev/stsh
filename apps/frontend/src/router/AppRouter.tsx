import { Navigate, Route, Routes } from "react-router-dom";
import { UserRole } from "@starshield/shared";
import { DEFAULT_ROUTE, APP_ROUTES } from "../constants/routes.js";
import { AdminLayout } from "../pages/AdminLayout.js";
import { AdminPage } from "../pages/AdminPage.js";
import { AdminHistoryPage } from "../pages/AdminHistoryPage.js";
import { IdsFormPage } from "../pages/IdsFormPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { RegisterPage } from "../pages/RegisterPage.js";
import { AdminTerminalsPage } from "../pages/AdminTerminalsPage.js";
import { AdminUsersPage } from "../pages/AdminUsersPage.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { GuestRoute } from "./GuestRoute.js";

export function AppRouter() {
  return (
    <Routes>
      <Route path={APP_ROUTES.login} element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path={APP_ROUTES.register} element={<GuestRoute><RegisterPage /></GuestRoute>} />
      <Route path={APP_ROUTES.terminalKits} element={<ProtectedRoute><IdsFormPage /></ProtectedRoute>} />
      <Route path={APP_ROUTES.admin} element={<ProtectedRoute requiredRole={UserRole.Admin}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminPage />} />
        <Route path="history" element={<AdminHistoryPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="terminal-kits" element={<AdminTerminalsPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to={DEFAULT_ROUTE} />} />
    </Routes>
  );
}
