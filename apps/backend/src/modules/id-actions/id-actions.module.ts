import { Module } from "@nestjs/common";
import { TerminalKitActionsController } from "./id-actions.controller";
import { TerminalKitActionsService } from "./id-actions.service";

@Module({
  controllers: [TerminalKitActionsController],
  providers: [TerminalKitActionsService],
  exports: [TerminalKitActionsService],
})
export class TerminalKitActionsModule {}
