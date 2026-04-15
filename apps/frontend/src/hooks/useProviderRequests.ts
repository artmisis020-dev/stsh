import { useQuery } from "@tanstack/react-query";
import { providerRequestsService } from "../services/api/provider-requests.service.js";
import type { ProviderRequestDto } from "@starshield/shared";

export function useProviderRequests() {
  return useQuery<ProviderRequestDto[]>({
    queryKey: ["provider-requests"],
    queryFn: providerRequestsService.getProviderRequests,
  });
}
