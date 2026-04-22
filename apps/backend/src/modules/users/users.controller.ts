import { Controller, Get, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserStatus } from "@starshield/shared";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("pending")
  getPendingUsers() {
    return this.usersService.getPendingUsers();
  }

  @Patch(":id/approve")
  approve(@Param("id") id: string) {
    return this.usersService.updateUserStatus(id, UserStatus.Approved);
  }

  @Patch(":id/reject")
  reject(@Param("id") id: string) {
    return this.usersService.updateUserStatus(id, UserStatus.Rejected);
  }
}
