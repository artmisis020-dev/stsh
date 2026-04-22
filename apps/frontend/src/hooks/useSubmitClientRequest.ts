import { useMutation } from "@tanstack/react-query";
import type { SubmitClientRequestDto } from "@starshield/shared";
import { clientRequestsService } from "../services/api/client-requests.service.js";

export function useSubmitClientRequest() {
  return useMutation({
    mutationFn: (payload: SubmitClientRequestDto) => clientRequestsService.create(payload),
  });
}
