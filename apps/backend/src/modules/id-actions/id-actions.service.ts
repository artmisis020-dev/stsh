import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { ActionStatus, ActionType, type IdActionDto } from "@starshield/shared";

@Injectable()
export class IdActionsService {
  private readonly actions: IdActionDto[] = [
    {
      id: randomUUID(),
      idId: randomUUID(),
      actionType: ActionType.DeactivateTemp,
      status: ActionStatus.PendingAdmin,
      clientRequestId: randomUUID(),
      providerRequestId: null,
      createdAt: new Date().toISOString(),
    },
  ];

  getPendingAdminActions() {
    return this.actions.filter((action) => action.status === ActionStatus.PendingAdmin);
  }
}
