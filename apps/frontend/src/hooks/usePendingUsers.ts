import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/api/users.service.js";
import type { UserDto } from "@starshield/shared";

export function usePendingUsers() {
  return useQuery<UserDto[]>({
    queryKey: ["pending-users"],
    queryFn: usersService.getPendingUsers,
  });
}
