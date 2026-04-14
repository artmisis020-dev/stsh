import { useQuery } from "@tanstack/react-query";
import { idActionsService } from "../services/api/id-actions.service";

export function usePendingAdminActions() {
  return useQuery({
    queryKey: ["pending-admin-actions"],
    queryFn: idActionsService.getPendingAdminActions,
  });
}
