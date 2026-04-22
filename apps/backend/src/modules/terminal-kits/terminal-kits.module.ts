import { Module } from "@nestjs/common";
import { TerminalKitsController } from "./terminal-kits.controller";
import { TerminalKitsService } from "./terminal-kits.service";

@Module({
  controllers: [TerminalKitsController],
  providers: [TerminalKitsService],
  exports: [TerminalKitsService],
})
export class TerminalKitsModule {}
