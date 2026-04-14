import { useMutation } from "@tanstack/react-query";
import type { RegisterDto } from "@starshield/shared";
import { authService } from "../services/api/auth.service";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterDto) => authService.register(payload),
  });
}
