import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProviderRequestDto } from "@starshield/shared";
import { QUERY_KEYS } from "../constants/queryKeys.js";
import { providerRequestsService } from "../services/api/provider-requests.service.js";

export function useCreateProviderRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProviderRequestDto) =>
      providerRequestsService.createProviderRequest(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-requests"] }),
        queryClient.invalidateQueries({ queryKey: ["pending-admin-actions"] }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terminalKitActionHistory }),
      ]);
    },
    onError: (error) => {
      console.error("Failed to create provider request:", error);
    },
  });
}
