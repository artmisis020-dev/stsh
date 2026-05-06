import { Injectable } from "@nestjs/common";
import { TerminalKitState, type TerminalKitCapacityDto, type TerminalKitDto } from "@starshield/shared";
import { PrismaService } from "../prisma/prisma.service";

const ACTIVE_TERMINAL_KIT_LIMIT = 150;

function toTerminalKitDto(terminalKit: {
  id: string;
  terminalKit: string;
  currentState: string | null;
  createdAt: Date;
  updatedAt: Date;
}): TerminalKitDto {
  return {
    id: terminalKit.id,
    terminalKit: terminalKit.terminalKit,
    currentState: terminalKit.currentState as TerminalKitState,
    createdAt: terminalKit.createdAt.toISOString(),
    updatedAt: terminalKit.updatedAt.toISOString(),
  };
}

@Injectable()
export class TerminalKitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TerminalKitDto[]> {
    const terminalKits = await this.prisma.terminalKit.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return terminalKits.map(toTerminalKitDto);
  }

  async getTerminalKitsByUserId(userId: string): Promise<TerminalKitDto[]> {
    const terminalKits = await this.prisma.terminalKit.findMany({
      where: {
        actions: {
          some: {
            clientRequest: {
              userId,
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return terminalKits.map(toTerminalKitDto);
  }

  async getCapacity(): Promise<TerminalKitCapacityDto> {
    const activeCount = await this.prisma.terminalKit.count({
      where: { currentState: TerminalKitState.Active },
    });

    const remaining = Math.max(ACTIVE_TERMINAL_KIT_LIMIT - activeCount, 0);

    return {
      activeCount,
      limit: ACTIVE_TERMINAL_KIT_LIMIT,
      remaining,
      utilizationPercent: Math.min(
        Math.round((activeCount / ACTIVE_TERMINAL_KIT_LIMIT) * 100),
        100,
      ),
    };
  }
}
