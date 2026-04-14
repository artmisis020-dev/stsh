import { Controller, Get } from "@nestjs/common";
import { IdActionsService } from "./id-actions.service";

@Controller("id-actions")
export class IdActionsController {
  constructor(private readonly idActionsService: IdActionsService) {}

  @Get("pending-admin")
  getPendingAdminActions() {
    return this.idActionsService.getPendingAdminActions();
  }
}
