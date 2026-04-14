import { BadRequestException, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import {
  ActionStatus,
  ActionType,
  IdState,
  type ClientRequestDto,
  type IdActionDto,
  type SubmitClientRequestDto,
} from "@starshield/shared";

const ACTIVE_ACTION_STATUSES = [ActionStatus.PendingAdmin, ActionStatus.PendingProvider];

type IdSnapshot = {
  id: string;
  value: string;
  currentState: IdState;
};

@Injectable()
export class ClientRequestsService {
  private readonly ids = new Map<string, IdSnapshot>([
    [
      "ID-100",
      {
        id: randomUUID(),
        value: "ID-100",
        currentState: IdState.Active,
      },
    ],
    [
      "ID-200",
      {
        id: randomUUID(),
        value: "ID-200",
        currentState: IdState.DeactivatedTemp,
      },
    ],
    [
      "ID-300",
      {
        id: randomUUID(),
        value: "ID-300",
        currentState: IdState.DeactivatedPerm,
      },
    ],
  ]);

  private readonly requests: ClientRequestDto[] = [];

  create(payload: SubmitClientRequestDto) {
    this.ensureNoDuplicateIds(payload);

    const requestId = randomUUID();
    const createdAt = new Date().toISOString();
    const actions = payload.actions.map((action) => {
      const idRecord = this.findOrCreateId(action.idValue);
      this.ensureActionAllowed(idRecord.currentState, action.actionType);
      this.ensureNoActiveAction(idRecord.id);

      const idAction: IdActionDto = {
        id: randomUUID(),
        idId: idRecord.id,
        actionType: action.actionType,
        status: ActionStatus.PendingAdmin,
        clientRequestId: requestId,
        providerRequestId: null,
        createdAt,
      };

      return idAction;
    });

    const request: ClientRequestDto = {
      id: requestId,
      userId: "demo-client",
      comment: payload.comment,
      createdAt,
      actions,
    };

    this.requests.unshift(request);
    return request;
  }

  getMyRequests() {
    return this.requests;
  }

  private ensureNoDuplicateIds(payload: SubmitClientRequestDto) {
    const uniqueIds = new Set(payload.actions.map((action) => action.idValue.trim().toLowerCase()));

    if (uniqueIds.size !== payload.actions.length) {
      throw new BadRequestException("Duplicate IDs in a single request are not allowed.");
    }
  }

  private ensureNoActiveAction(idId: string) {
    const hasActiveAction = this.requests.some((request) =>
      request.actions.some(
        (action) =>
          action.idId === idId && ACTIVE_ACTION_STATUSES.includes(action.status),
      ),
    );

    if (hasActiveAction) {
      throw new BadRequestException("ID already has an active action in progress.");
    }
  }

  private ensureActionAllowed(currentState: IdState, actionType: ActionType) {
    if (currentState === IdState.Active && actionType === ActionType.Activate) {
      throw new BadRequestException("Active ID cannot be activated again.");
    }

    if (currentState === IdState.DeactivatedPerm && actionType === ActionType.Activate) {
      throw new BadRequestException("Permanently deactivated ID cannot be activated.");
    }

    if (
      currentState !== IdState.Active &&
      [ActionType.DeactivatePerm, ActionType.DeactivateTemp].includes(actionType)
    ) {
      throw new BadRequestException("Only active IDs can be deactivated.");
    }
  }

  private findOrCreateId(value: string) {
    const trimmedValue = value.trim();
    const existingId = this.ids.get(trimmedValue);

    if (existingId) {
      return existingId;
    }

    const newId: IdSnapshot = {
      id: randomUUID(),
      value: trimmedValue,
      currentState: IdState.Active,
    };

    this.ids.set(trimmedValue, newId);
    return newId;
  }
}
