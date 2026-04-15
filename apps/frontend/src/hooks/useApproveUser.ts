import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { usersService } from "../services/api/users.service";

export function useApproveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.approveUser(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pending-users"] }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.terminalKitCapacity }),
      ]);
    },
  });
}
