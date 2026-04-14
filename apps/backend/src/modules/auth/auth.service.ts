import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { UserRole, UserStatus, type AuthResponseDto, type LoginDto, type RegisterDto, type UserDto } from "@starshield/shared";

@Injectable()
export class AuthService {
  private readonly users = new Map<
    string,
    UserDto & {
      passwordHash: string;
    }
  >();

  constructor(private readonly jwtService: JwtService) {}

  async register(payload: RegisterDto) {
    const existingUser = [...this.users.values()].find((user) => user.email === payload.email);

    if (existingUser) {
      throw new ConflictException("User with this email already exists.");
    }

    const now = new Date().toISOString();
    const user: UserDto & { passwordHash: string } = {
      id: randomUUID(),
      email: payload.email,
      role: UserRole.Client,
      status: UserStatus.Pending,
      createdAt: now,
      passwordHash: await hash(payload.password, 10),
    };

    this.users.set(user.id, user);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    };
  }

  async login(payload: LoginDto): Promise<AuthResponseDto> {
    const user = [...this.users.values()].find((entry) => entry.email === payload.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    const isValidPassword = await compare(payload.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      },
    };
  }
}
