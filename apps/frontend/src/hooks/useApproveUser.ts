import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/api/users.service";

export function useApproveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.approveUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pending-users"] });
    },
  });
}
