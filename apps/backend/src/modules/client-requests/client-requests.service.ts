import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  ActionStatus,
  ActionType,
  TerminalKitState,
  type ClientRequestDto,
  type SubmitClientRequestDto,
  type TerminalKitActionDto,
} from "@starshield/shared";
import { PrismaService } from "../prisma/prisma.service";

const ACTIVE_ACTION_STATUSES = [ActionStatus.PendingAdmin, ActionStatus.PendingProvider];

type TerminalKitRecord = {
  id: string;
  terminalKit: string;
  currentState: TerminalKitState;
};

function toActionDto(action: {
  id: string;
  terminalKitId: string;
  terminalKit?: { terminalKit: string } | null;
  actionType: string;
  status: string;
  previousState: string | null;
  resultingState: string | null;
  clientRequestId: string;
  providerRequestId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): TerminalKitActionDto {
  return {
    id: action.id,
    terminalKitId: action.terminalKitId,
    terminalKit: action.terminalKit?.terminalKit ?? action.terminalKitId,
    actionType: action.actionType as ActionType,
    status: action.status as ActionStatus,
    previousState: action.previousState as TerminalKitState | null,
    resultingState: action.resultingState as TerminalKitState | null,
    clientRequestId: action.clientRequestId,
    providerRequestId: action.providerRequestId,
    createdAt: action.createdAt.toISOString(),
    updatedAt: action.updatedAt.toISOString(),
  };
}

function toClientRequestDto(request: {
  id: string;
  userId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  terminalKitActions: Array<{
    id: string;
    terminalKitId: string;
    terminalKit?: { terminalKit: string } | null;
    actionType: string;
    status: string;
    previousState: string | null;
    resultingState: string | null;
    clientRequestId: string;
    providerRequestId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
}): ClientRequestDto {
  return {
    id: request.id,
    userId: request.userId,
    comment: request.comment,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
    actions: request.terminalKitActions.map(toActionDto),
  };
}

@Injectable()
export class ClientRequestsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: string, payload: SubmitClientRequestDto): Promise<ClientRequestDto> {
    this.ensureNoDuplicateTerminalKits(payload);

    const normalizedActions = payload.actions.map((action) => ({
      terminalKit: action.terminalKit.trim().toUpperCase(),
      actionType: action.actionType,
    }));

    const createdRequest = await this.prisma.$transaction(async (tx) => {
      const terminalKitValues = normalizedActions.map((action) => action.terminalKit);
      const existingTerminalKits = await tx.terminalKit.findMany({
        where: { terminalKit: { in: terminalKitValues } },
      });

      const terminalKitByValue = new Map(
        existingTerminalKits.map((item) => [
          item.terminalKit,
          {
            id: item.id,
            terminalKit: item.terminalKit,
            currentState: item.currentState as TerminalKitState,
          } satisfies TerminalKitRecord,
        ]),
      );

      for (const action of normalizedActions) {
        const terminalKitRecord =
          terminalKitByValue.get(action.terminalKit) ??
          (await this.createPendingTerminalKit(tx, action.terminalKit));

        terminalKitByValue.set(action.terminalKit, terminalKitRecord);

        this.ensureActionAllowed(terminalKitRecord.currentState, action.actionType);
        await this.ensureNoActiveAction(tx, terminalKitRecord.terminalKit);
      }

      return tx.clientRequest.create({
        data: {
          userId,
          comment: payload.comment,
          terminalKitActions: {
            create: normalizedActions.map((action) => {
              const terminalKitRecord = terminalKitByValue.get(action.terminalKit)!;

              return {
                terminalKitId: terminalKitRecord.terminalKit,
                actionType: action.actionType,
                status: ActionStatus.PendingAdmin,
                previousState: terminalKitRecord.currentState,
                resultingState: null,
              };
            }),
          },
        },
        include: {
          terminalKitActions: {
            include: {
              terminalKit: {
                select: {
                  terminalKit: true,
                },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
      });
    });

    return toClientRequestDto(createdRequest);
  }

  async getMyRequests(userId: string): Promise<ClientRequestDto[]> {
    const requests = await this.prisma.clientRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        terminalKitActions: {
          include: {
            terminalKit: {
              select: {
                terminalKit: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return requests.map(toClientRequestDto);
  }

  private ensureNoDuplicateTerminalKits(payload: SubmitClientRequestDto) {
    const uniqueTerminalKits = new Set(
      payload.actions.map((action) => action.terminalKit.trim().toLowerCase()),
    );

    if (uniqueTerminalKits.size !== payload.actions.length) {
      throw new BadRequestException(
        "Duplicate terminal kits in a single request are not allowed.",
      );
    }
  }

  private async ensureNoActiveAction(
    tx: Prisma.TransactionClient,
    terminalKitId: string,
  ): Promise<void> {
    const activeAction = await tx.terminalKitAction.findFirst({
      where: {
        terminalKitId,
        status: { in: ACTIVE_ACTION_STATUSES },
      },
    });

    if (activeAction) {
      throw new BadRequestException(
        "Terminal kit already has an active action in progress.",
      );
    }
  }

  private ensureActionAllowed(
    currentState: TerminalKitState,
    actionType: ActionType,
  ) {
    if (currentState === TerminalKitState.Initiated && actionType !== ActionType.Activate) {
      throw new BadRequestException(
        "Only activation is allowed for an initiated terminal kit.",
      );
    }

    if (currentState === TerminalKitState.Active && actionType === ActionType.Activate) {
      throw new BadRequestException("Active terminal kit cannot be activated again.");
    }

    if (
      currentState === TerminalKitState.DeactivatedPerm &&
      actionType === ActionType.Activate
    ) {
      throw new BadRequestException(
        "Permanently deactivated terminal kit cannot be activated.",
      );
    }

    if (
      currentState !== TerminalKitState.Active &&
      [ActionType.DeactivatePerm, ActionType.DeactivateTemp].includes(actionType)
    ) {
      throw new BadRequestException("Only active terminal kits can be deactivated.");
    }
  }

  private async createPendingTerminalKit(
    tx: Prisma.TransactionClient,
    terminalKit: string,
  ): Promise<TerminalKitRecord> {
    const created = await tx.terminalKit.create({
      data: {
        terminalKit,
        currentState: TerminalKitState.Initiated,
      },
    });

    return {
      id: created.id,
      terminalKit: created.terminalKit,
      currentState: created.currentState as TerminalKitState,
    };
  }

  public async getAllRequests(): Promise<ClientRequestDto[]> {
    const requests = await this.prisma.clientRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        terminalKitActions: {
          include: {
            terminalKit: {
              select: {
                terminalKit: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return requests.map(toClientRequestDto);
  }
}
