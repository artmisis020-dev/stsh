import type { TerminalKitActionDto, TerminalKitActionHistoryDto } from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api";
import { apiClient } from "./client";

export const terminalKitActionsService = {
  async getPendingAdminActions() {
    const response = await apiClient.get<TerminalKitActionDto[]>(
      API_ENDPOINTS.terminalKitActions.pendingAdmin,
    );
    return response.data;
  },
  async getHistory() {
    const response = await apiClient.get<TerminalKitActionHistoryDto[]>(
      API_ENDPOINTS.terminalKitActions.history,
    );
    return response.data;
  },
} as const;
