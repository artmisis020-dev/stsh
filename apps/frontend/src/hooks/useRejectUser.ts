import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/api/users.service";

export function useRejectUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.rejectUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pending-users"] });
    },
  });
}
