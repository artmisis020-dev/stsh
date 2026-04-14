import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { healthService } from "../services/api/health.service";

export function useApiHealth() {
  return useQuery({
    queryKey: QUERY_KEYS.apiHealth,
    queryFn: healthService.getHealth,
    retry: false,
  });
}
