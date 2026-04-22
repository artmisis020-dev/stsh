import type { ClientRequestDto, SubmitClientRequestDto } from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api.js";
import { apiClient } from "./client.js";

export const clientRequestsService = {
  async create(payload: SubmitClientRequestDto) {
    const response = await apiClient.post<ClientRequestDto>(API_ENDPOINTS.clientRequests.base, payload);
    return response.data;
  },
  async getMyRequests() {
    const response = await apiClient.get<ClientRequestDto[]>(API_ENDPOINTS.clientRequests.my);
    return response.data;
  },
  async getAllRequests() {
    const response = await apiClient.get<ClientRequestDto[]>(API_ENDPOINTS.clientRequests.base);
    return response.data;
  }
} as const;
