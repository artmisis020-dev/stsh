import { useQuery } from "@tanstack/react-query";
import type { ClientRequestDto } from "@starshield/shared";
import { QUERY_KEYS } from "../constants/queryKeys";
import { clientRequestsService } from "../services/api/client-requests.service";

export function useMyClientRequests() {
  return useQuery<ClientRequestDto[]>({
    queryKey: QUERY_KEYS.myClientRequests,
    queryFn: clientRequestsService.getMyRequests,
  });
}
