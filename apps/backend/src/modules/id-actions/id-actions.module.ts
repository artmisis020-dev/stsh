import { Module } from "@nestjs/common";
import { IdActionsController } from "./id-actions.controller";
import { IdActionsService } from "./id-actions.service";

@Module({
  controllers: [IdActionsController],
  providers: [IdActionsService],
  exports: [IdActionsService],
})
export class IdActionsModule {}
