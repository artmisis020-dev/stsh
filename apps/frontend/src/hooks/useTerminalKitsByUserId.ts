import { useQuery } from "@tanstack/react-query";
import type { TerminalKitDto } from "@starshield/shared";
import { QUERY_KEYS } from "../constants/queryKeys";
import { terminalKitsService } from "../services/api/terminal-kits.service";

export function useTerminalKitsByUserId() {
  return useQuery<TerminalKitDto[]>({
    queryKey: QUERY_KEYS.terminalKitsByUserId,
    queryFn: terminalKitsService.getTerminalKitsByUserId,
  });
}
