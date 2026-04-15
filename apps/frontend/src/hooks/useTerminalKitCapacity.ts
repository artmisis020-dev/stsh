import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys.js";
import { terminalKitsService } from "../services/api/terminal-kits.service.js";
import type { TerminalKitCapacityDto } from "@starshield/shared";

export function useTerminalKitCapacity() {
  return useQuery<TerminalKitCapacityDto | null>({
    queryKey: QUERY_KEYS.terminalKitCapacity,
    queryFn: terminalKitsService.getCapacity,
  });
}
