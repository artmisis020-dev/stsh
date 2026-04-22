import { Controller, Get } from "@nestjs/common";
import { TerminalKitsService } from "./terminal-kits.service";

@Controller("terminal-kits")
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
}
