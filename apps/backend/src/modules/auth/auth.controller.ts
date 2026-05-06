import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginRequestDto } from "./dto/login-request.dto";
import { RegisterRequestDto } from "./dto/register-request.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  register(@Body() payload: RegisterRequestDto) {
    return this.authService.register(payload);
  }

  @Post("login")
  @ApiOperation({ summary: "Authenticate a user and issue a JWT" })
  login(@Body() payload: LoginRequestDto) {
    return this.authService.login(payload);
  }
}
