import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { UserRole, UserStatus, type UserDto } from "@starshield/shared";

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: randomUUID(),
      email: "pending.client@starshield.dev",
      role: UserRole.Client,
      status: UserStatus.Pending,
      createdAt: new Date().toISOString(),
    },
  ];

  getPendingUsers() {
    return this.users.filter((user) => user.status === UserStatus.Pending);
  }

  updateUserStatus(id: string, status: UserStatus.Approved | UserStatus.Rejected) {
    const user = this.users.find((entry) => entry.id === id);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    user.status = status;
    return user;
  }
}
