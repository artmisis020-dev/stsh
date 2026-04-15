import { useQuery } from "@tanstack/react-query";
import { terminalKitActionsService } from "../services/api/id-actions.service.js";
import { TerminalKitActionDto } from "@starshield/shared";

export function usePendingAdminActions() {
  return useQuery<TerminalKitActionDto[]  >({
    queryKey: ["pending-admin-actions"],
    queryFn: terminalKitActionsService.getPendingAdminActions,
  });
}
