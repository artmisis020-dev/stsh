import type {
  CreateProviderRequestDto,
  ProviderRequestDto,
  SubmitProviderResultsDto,
} from "@starshield/shared";
import { API_ENDPOINTS } from "../../constants/api";
import { apiClient } from "./client";

export const providerRequestsService = {
  async getProviderRequests() {
    const response = await apiClient.get<ProviderRequestDto[]>(API_ENDPOINTS.providerRequests.base);
    return response.data;
  },
  async createProviderRequest(payload: CreateProviderRequestDto) {
    const response = await apiClient.post<ProviderRequestDto>(
      API_ENDPOINTS.providerRequests.base,
      payload,
    );
    return response.data;
  },
  async submitProviderResults(id: string, payload: SubmitProviderResultsDto) {
    const response = await apiClient.post(API_ENDPOINTS.providerRequests.results(id), payload);
    return response.data;
  },
} as const;
