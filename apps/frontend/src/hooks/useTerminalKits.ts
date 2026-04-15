import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys.js";
import { terminalKitsService } from "../services/api/terminal-kits.service.js";
import { TerminalKitDto } from "@starshield/shared";

export function useTerminalKits() {
  return useQuery<TerminalKitDto[]>({
    queryKey: QUERY_KEYS.terminalKits,
    queryFn: terminalKitsService.getTerminalKits,
  });
}
