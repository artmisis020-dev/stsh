import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { UserRole, UserStatus, type AuthResponseDto, type LoginDto, type RegisterDto, type UserDto } from "@starshield/shared";
import { PrismaService } from "../prisma/prisma.service";

function toUserDto(user: {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  login: string;
}): UserDto {
  return {
    id: user.id,
    email: user.email,
    role: user.role as UserRole,
    status: user.status as UserStatus,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    login: user.login,
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(payload: RegisterDto): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email.toLowerCase().trim() },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists.");
    }

    const user = await this.prisma.user.create({
      data: {
        email: payload.email.toLowerCase().trim(),
        passwordHash: await hash(payload.password, 10),
        role: UserRole.Client,
        status: UserStatus.Pending,
        login: payload.login.toLowerCase().trim(),
      },
    });

    return toUserDto(user);
  }

  async login(payload: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    const isValidPassword = await compare(payload.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    if (user.status !== UserStatus.Approved) {
      throw new UnauthorizedException("User is not approved yet.");
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: toUserDto(user),
    };
  }
}
