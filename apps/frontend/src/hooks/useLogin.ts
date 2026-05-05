import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { LoginDto } from "@starshield/shared";
import { UserRole } from "@starshield/shared";
import { authService } from "../services/api/auth.service";
import { useAuth } from "../context/AuthContext";
import { APP_ROUTES } from "../constants/routes";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginDto) => authService.login(payload),
    onSuccess: (data) => {
      login(data.accessToken, data.user);
      const destination = data.user.role === UserRole.Admin ? APP_ROUTES.admin : APP_ROUTES.terminalKits;
      navigate(destination);
    },
  });
}
