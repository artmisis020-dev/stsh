import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UserRole, UserStatus } from "@starshield/shared";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
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
