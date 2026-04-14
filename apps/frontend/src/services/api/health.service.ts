import { API_ENDPOINTS } from "../../constants/api";
import type { HealthResponse } from "../../types/api";
import { apiClient } from "./client";

export const healthService = {
  async getHealth() {
    const response = await apiClient.get<HealthResponse>(API_ENDPOINTS.health);
    return response.data;
  },
} as const;
