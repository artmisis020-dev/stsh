import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProviderRequestDto } from "@starshield/shared";
import { providerRequestsService } from "../services/api/provider-requests.service";

export function useCreateProviderRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProviderRequestDto) =>
      providerRequestsService.createProviderRequest(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-requests"] }),
        queryClient.invalidateQueries({ queryKey: ["pending-admin-actions"] }),
      ]);
    },
  });
}
