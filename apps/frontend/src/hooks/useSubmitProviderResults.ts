import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitProviderResultsDto } from "@starshield/shared";
import { QUERY_KEYS } from "../constants/queryKeys";
import { providerRequestsService } from "../services/api/provider-requests.service";

type SubmitProviderResultsParams = {
  id: string;
  payload: SubmitProviderResultsDto;
};

export function useSubmitProviderResults() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: SubmitProviderResultsParams) =>
      providerRequestsService.submitProviderResults(id, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["provider-requests"] }),
        queryClient.invalidateQueries({ queryKey: ["pending-admin-actions"] }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terminalKitActionHistory }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terminalKits }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terminalKitCapacity }),
      ]);
    },
  });
}
