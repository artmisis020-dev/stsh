import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserRole } from "@starshield/shared";
import { CurrentUser, type JwtPayload } from "../../decorators/current-user.decorator";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { TerminalKitsService } from "./terminal-kits.service";

@Controller("terminal-kits")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
export class TerminalKitsController {
  constructor(private readonly terminalKitsService: TerminalKitsService) {}

  @Get()
  findAll() {
    return this.terminalKitsService.findAll();
  }

  @Get("capacity")
  getCapacity() {
    return this.terminalKitsService.getCapacity();
  }

  @Get("by-user")
  @Roles(UserRole.Client)
  getTerminalKitsByUserId(@CurrentUser() user: JwtPayload) {
    return this.terminalKitsService.getTerminalKitsByUserId(user.sub);
  }
}
