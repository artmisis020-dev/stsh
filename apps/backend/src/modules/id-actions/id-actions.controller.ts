import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserRole } from "@starshield/shared";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { TerminalKitActionsService } from "./id-actions.service";

@Controller("terminal-kit-actions")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
export class TerminalKitActionsController {
  constructor(private readonly terminalKitActionsService: TerminalKitActionsService) {}

  @Get("pending-admin")
  getPendingAdminActions() {
    return this.terminalKitActionsService.getPendingAdminActions();
  }

  @Get("history")
  getHistory() {
    return this.terminalKitActionsService.getHistory();
  }
}
