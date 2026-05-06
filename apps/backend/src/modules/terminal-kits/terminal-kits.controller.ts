import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRole } from "@starshield/shared";
import { CurrentUser, type JwtPayload } from "../../decorators/current-user.decorator";
import { Roles } from "../../decorators/roles.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { TerminalKitsService } from "./terminal-kits.service";

@Controller("terminal-kits")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
@ApiTags("Terminal Kits")
@ApiBearerAuth("bearer")
export class TerminalKitsController {
  constructor(private readonly terminalKitsService: TerminalKitsService) {}

  @Get()
  @ApiOperation({ summary: "List all terminal kits" })
  findAll() {
    return this.terminalKitsService.findAll();
  }

  @Get("capacity")
  @ApiOperation({ summary: "Get terminal kit capacity summary" })
  getCapacity() {
    return this.terminalKitsService.getCapacity();
  }

  @Get("by-user")
  @Roles(UserRole.Client)
  @ApiOperation({ summary: "List terminal kits assigned to the current client" })
  getTerminalKitsByUserId(@CurrentUser() user: JwtPayload) {
    return this.terminalKitsService.getTerminalKitsByUserId(user.sub);
  }
}
