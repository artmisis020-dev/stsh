import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRole, UserStatus, type UserDto } from "@starshield/shared";
import { PrismaService } from "../prisma/prisma.service";

function toUserDto(user: {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  login?: string;
}): UserDto {
  return {
    id: user.id,
    email: user.email,
    role: user.role as UserRole,
    status: user.status as UserStatus,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    login: user.login ?? "",
  };
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      where: { status: UserStatus.Pending },
      orderBy: { createdAt: "desc" },
    });

    return users.map(toUserDto);
  }

  async updateUserStatus(
    id: string,
    status: UserStatus.Approved | UserStatus.Rejected,
  ): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException("User not found.");
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: { status },
    });

    return toUserDto(user);
  }
}
