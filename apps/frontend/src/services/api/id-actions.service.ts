import type { IdActionDto } from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api";
import { apiClient } from "./client";

export const idActionsService = {
  async getPendingAdminActions() {
    const response = await apiClient.get<IdActionDto[]>(API_ENDPOINTS.idActions.pendingAdmin);
    return response.data;
  },
} as const;
