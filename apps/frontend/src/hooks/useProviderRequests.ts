import { useQuery } from "@tanstack/react-query";
import { providerRequestsService } from "../services/api/provider-requests.service";

export function useProviderRequests() {
  return useQuery({
    queryKey: ["provider-requests"],
    queryFn: providerRequestsService.getProviderRequests,
  });
}
