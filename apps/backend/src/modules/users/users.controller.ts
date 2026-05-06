import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRole, UserStatus } from "@starshield/shared";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
@ApiTags("Users")
@ApiBearerAuth("bearer")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("pending")
  @ApiOperation({ summary: "List users awaiting admin approval" })
  getPendingUsers() {
    return this.usersService.getPendingUsers();
  }

  @Patch(":id/approve")
  @ApiOperation({ summary: "Approve a pending user" })
  approve(@Param("id") id: string) {
    return this.usersService.updateUserStatus(id, UserStatus.Approved);
  }

  @Patch(":id/reject")
  @ApiOperation({ summary: "Reject a pending user" })
  reject(@Param("id") id: string) {
    return this.usersService.updateUserStatus(id, UserStatus.Rejected);
  }
}
