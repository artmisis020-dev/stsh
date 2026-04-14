import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitProviderResultsDto } from "@starshield/shared";
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
      await queryClient.invalidateQueries({ queryKey: ["provider-requests"] });
    },
  });
}
