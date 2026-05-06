import { Injectable } from "@nestjs/common";
import {
  ActionStatus,
  ActionType,
  TerminalKitState,
  type TerminalKitActionDto,
  type TerminalKitActionHistoryDto,
} from "@starshield/shared";
import { PrismaService } from "../prisma/prisma.service";

function toActionDto(action: {
  id: string;
  terminalKitId: string;
  actionType: string;
  status: string;
  previousState: string | null;
  resultingState: string | null;
  clientRequestId: string;
  providerRequestId: string | null;
  createdAt: Date;
  updatedAt: Date;
  terminalKit?: { terminalKit: string };
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

@Injectable()
export class TerminalKitActionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingAdminActions(): Promise<TerminalKitActionDto[]> {
    const actions = await this.prisma.terminalKitAction.findMany({
      where: { status: ActionStatus.PendingAdmin },
      orderBy: { createdAt: "asc" },
      include: {
        terminalKit: true,
      },
    });

    return actions.map(toActionDto);
  }

  async getHistory(): Promise<TerminalKitActionHistoryDto[]> {
    const actions = await this.prisma.terminalKitAction.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        terminalKit: true,
      },
    });

    return actions.map((action) => ({
      id: action.id,
      terminalKitId: action.terminalKitId,
      terminalKit: action.terminalKit.terminalKit,
      clientRequestId: action.clientRequestId,
      actionType: action.actionType as ActionType,
      status: action.status as ActionStatus,
      previousState: action.previousState as TerminalKitState | null,
      resultingState: action.resultingState as TerminalKitState | null,
      createdAt: action.createdAt.toISOString(),
      updatedAt: action.updatedAt.toISOString(),
    }));
  }
}
