import { Navigate, Route, Routes } from "react-router-dom";
import { DEFAULT_ROUTE, APP_ROUTES } from "../constants/routes";
import { AdminPage } from "../pages/AdminPage";
import { IdsFormPage } from "../pages/IdsFormPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path={APP_ROUTES.login} element={<LoginPage />} />
      <Route path={APP_ROUTES.register} element={<RegisterPage />} />
      <Route path={APP_ROUTES.ids} element={<IdsFormPage />} />
      <Route path={APP_ROUTES.admin} element={<AdminPage />} />
      <Route path="*" element={<Navigate replace to={DEFAULT_ROUTE} />} />
    </Routes>
  );
}
