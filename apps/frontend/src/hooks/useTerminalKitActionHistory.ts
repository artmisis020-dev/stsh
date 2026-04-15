import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys.js";
import { terminalKitActionsService } from "../services/api/id-actions.service.js";
import type {
  TerminalKitActionHistoryDto,
} from "@starshield/shared";

export function useTerminalKitActionHistory() {
  return useQuery<TerminalKitActionHistoryDto[]>({
    queryKey: QUERY_KEYS.terminalKitActionHistory,
    queryFn: terminalKitActionsService.getHistory,
  });
}
