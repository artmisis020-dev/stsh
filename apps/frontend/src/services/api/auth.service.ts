import type { AuthResponseDto, LoginDto, RegisterDto, UserDto } from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api";
import { apiClient } from "./client";

export const authService = {
  async login(payload: LoginDto) {
    const response = await apiClient.post<AuthResponseDto>(API_ENDPOINTS.auth.login, payload);
    return response.data;
  },
  async register(payload: RegisterDto) {
    const response = await apiClient.post<UserDto>(API_ENDPOINTS.auth.register, payload);
    return response.data;
  },
} as const;
