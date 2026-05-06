import type { TerminalKitCapacityDto, TerminalKitDto } from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api";
import { apiClient } from "./client";

export const terminalKitsService = {
  async getTerminalKits() {
    const response = await apiClient.get<TerminalKitDto[]>(API_ENDPOINTS.terminalKits.base);
    return response.data;
  },
  async getTerminalKitsByUserId() {
    const response = await apiClient.get<TerminalKitDto[]>(API_ENDPOINTS.terminalKits.byUser);
    return response.data;
  },
  async getCapacity() {
    const response = await apiClient.get<TerminalKitCapacityDto>(API_ENDPOINTS.terminalKits.capacity);
    return response.data;
  },
} as const;
