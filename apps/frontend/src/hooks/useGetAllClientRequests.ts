import { useQuery } from "@tanstack/react-query";
import { clientRequestsService } from "../services/api/client-requests.service.js";
import { ClientRequestDto } from "@starshield/shared";

export function useGetAllClientRequests() {
    return useQuery<ClientRequestDto[]>({
        queryKey: ["client-requests"],
        queryFn: clientRequestsService.getAllRequests,
    });
}
