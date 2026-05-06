import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {
  ActionStatus,
  ActionType,
  ProviderRequestStatus,
  TerminalKitState,
  type CreateProviderRequestDto,
  type ProviderRequestDto,
  type SubmitProviderResultsDto,
} from "@starshield/shared";

const EXPECTED_RESULTING_STATE: Record<ActionType, TerminalKitState> = {
  [ActionType.Activate]: TerminalKitState.Active,
  [ActionType.DeactivateTemp]: TerminalKitState.DeactivatedTemp,
  [ActionType.DeactivatePerm]: TerminalKitState.DeactivatedPerm,
};
import { PrismaService } from "../prisma/prisma.service";

function toProviderRequestDto(request: {
  id: string;
  externalId: string;
  comment: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  terminalKitActions: Array<{
    id: string;
    terminalKitId: string;
    terminalKit: { terminalKit: string } | null;
    actionType: string;
    status: string;
    previousState: string | null;
    resultingState: string | null;
    clientRequestId: string;
    providerRequestId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
}): ProviderRequestDto {
  return {
    id: request.id,
    externalId: request.externalId,
    comment: request.comment,
    status: request.status as ProviderRequestStatus,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
    actions: request.terminalKitActions.map((action) => ({
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
    })),
  };
}

@Injectable()
export class ProviderRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateProviderRequestDto): Promise<ProviderRequestDto> {
    const uniqueActionIds = [...new Set(payload.actionIds)];

    if (uniqueActionIds.length !== payload.actionIds.length) {
      throw new BadRequestException("Duplicate action IDs are not allowed.");
    }

    return this.prisma.$transaction(async (tx) => {
      const actions = await tx.terminalKitAction.findMany({
        where: { id: { in: uniqueActionIds } },
      });

      if (actions.length !== uniqueActionIds.length) {
        throw new NotFoundException("Some terminal kit actions were not found.");
      }

      const invalidAction = actions.find((action) => action.status !== ActionStatus.PendingAdmin);
      if (invalidAction) {
        throw new BadRequestException("Only pending admin actions can be sent to provider.");
      }

      const providerRequest = await tx.providerRequest.create({
        data: {
          externalId: payload.externalId,
          comment: payload.comment ?? "",
          status: ProviderRequestStatus.Pending,
        },
        include: {
          terminalKitActions: true,
        },
      });

      await tx.terminalKitAction.updateMany({
        where: { id: { in: uniqueActionIds } },
        data: {
          status: ActionStatus.PendingProvider,
          providerRequestId: providerRequest.id,
        },
      });

      // Fetch the updated actions with the provider request association
      const updatedActions = await tx.terminalKitAction.findMany({
        where: { providerRequestId: providerRequest.id },
        include: { terminalKit: true },
      });

      return toProviderRequestDto({
        ...providerRequest,
        terminalKitActions: updatedActions,
      });
    });
  }

  async findAll(): Promise<ProviderRequestDto[]> {
    const requests = await this.prisma.providerRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        terminalKitActions: {
          include: {
            terminalKit: true,
          },
        },
      },
    });

    return requests.map(toProviderRequestDto);
  }

  async submitResults(id: string, payload: SubmitProviderResultsDto) {
    return this.prisma.$transaction(async (tx) => {
      const request = await tx.providerRequest.findUnique({
        where: { id },
      });

      if (!request) {
        throw new NotFoundException("Provider request not found.");
      }

      const actionIds = payload.results.map((item) => item.actionId);
      const actions = await tx.terminalKitAction.findMany({
        where: {
          id: { in: actionIds },
          providerRequestId: id,
        },
        include: {
          terminalKit: true,
        },
      });

      if (actions.length !== actionIds.length) {
        throw new NotFoundException("Some provider action results do not belong to this request.");
      }

      for (const result of payload.results) {
        const action = actions.find((entry) => entry.id === result.actionId);
        if (!action) {
          continue;
        }

        const nextStatus = result.success ? ActionStatus.Completed : ActionStatus.Failed;

        if (result.success) {
          const expected = EXPECTED_RESULTING_STATE[action.actionType as ActionType];
          if (result.resultingState && result.resultingState !== expected) {
            throw new BadRequestException(
              `Invalid resulting state for action ${action.id}: expected "${expected}", got "${result.resultingState}".`,
            );
          }
        }

        const nextTerminalState = result.success
          ? (result.resultingState ?? EXPECTED_RESULTING_STATE[action.actionType as ActionType])
          : (action.terminalKit.currentState as TerminalKitState);

        await tx.terminalKitAction.update({
          where: { id: action.id },
          data: {
            status: nextStatus,
            resultingState: nextTerminalState,
          },
        });

        if (result.success) {
          await tx.terminalKit.update({
            where: { terminalKit: action.terminalKitId },
            data: {
              currentState: result.resultingState,
            },
          });
        }
      }

      const refreshedActions = await tx.terminalKitAction.findMany({
        where: { providerRequestId: id },
      });

      const completedCount = refreshedActions.filter(
        (action) => action.status === ActionStatus.Completed,
      ).length;
      const failedCount = refreshedActions.filter(
        (action) => action.status === ActionStatus.Failed,
      ).length;

      const status =
        completedCount === refreshedActions.length
          ? ProviderRequestStatus.Completed
          : failedCount === refreshedActions.length
            ? ProviderRequestStatus.Failed
            : ProviderRequestStatus.PartialSuccess;

      const updatedRequest = await tx.providerRequest.update({
        where: { id },
        data: { status },
        include: {
          terminalKitActions: {
            include: {
              terminalKit: true,
            },
          },
        },
      });

      return {
        request: toProviderRequestDto(updatedRequest),
        results: payload.results,
      };
    });
  }
}
