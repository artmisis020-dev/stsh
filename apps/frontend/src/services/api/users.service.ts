import type { UserDto } from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api";
import { apiClient } from "./client";

export const usersService = {
  async getPendingUsers() {
    const response = await apiClient.get<UserDto[]>(API_ENDPOINTS.users.pending);
    return response.data;
  },
  async approveUser(id: string) {
    const response = await apiClient.patch<UserDto>(API_ENDPOINTS.users.approve(id));
    return response.data;
  },
  async rejectUser(id: string) {
    const response = await apiClient.patch<UserDto>(API_ENDPOINTS.users.reject(id));
    return response.data;
  },
} as const;
