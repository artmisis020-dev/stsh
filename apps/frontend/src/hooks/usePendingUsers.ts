import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/api/users.service";

export function usePendingUsers() {
  return useQuery({
    queryKey: ["pending-users"],
    queryFn: usersService.getPendingUsers,
  });
}
