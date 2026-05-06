import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { ErrorCode, UserRole, UserStatus, type AuthResponseDto, type LoginDto, type RegisterDto, type UserDto } from "@starshield/shared";
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
    const normalizedEmail = payload.email.toLowerCase().trim();
    const normalizedLogin = payload.login.toLowerCase().trim();

    const [existingEmail, existingLogin] = await Promise.all([
      this.prisma.user.findUnique({ where: { email: normalizedEmail } }),
      this.prisma.user.findUnique({ where: { login: normalizedLogin } }),
    ]);

    if (existingEmail) {
      throw new ConflictException({ code: ErrorCode.UserEmailAlreadyExists, message: "User with this email already exists." });
    }

    if (existingLogin) {
      throw new ConflictException({ code: ErrorCode.UserLoginAlreadyExists, message: "User with this login already exists." });
    }

    const user = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: await hash(payload.password, 10),
        role: UserRole.Client,
        status: UserStatus.Pending,
        login: normalizedLogin,
      },
    });

    return toUserDto(user);
  }

  async login(payload: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException({ code: ErrorCode.InvalidCredentials, message: "Invalid credentials." });
    }

    const isValidPassword = await compare(payload.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException({ code: ErrorCode.InvalidCredentials, message: "Invalid credentials." });
    }

    if (user.status !== UserStatus.Approved) {
      throw new UnauthorizedException({ code: ErrorCode.UserNotApproved, message: "User is not approved yet." });
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
