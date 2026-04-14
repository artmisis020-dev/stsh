import { useMutation } from "@tanstack/react-query";
import type { LoginDto } from "@starshield/shared";
import { authService } from "../services/api/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginDto) => authService.login(payload),
  });
}
