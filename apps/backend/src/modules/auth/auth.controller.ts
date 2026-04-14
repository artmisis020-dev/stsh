import { Body, Controller, Post } from "@nestjs/common";
import { LoginRequestDto } from "./dto/login-request.dto";
import { RegisterRequestDto } from "./dto/register-request.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() payload: RegisterRequestDto) {
    return this.authService.register(payload);
  }

  @Post("login")
  login(@Body() payload: LoginRequestDto) {
    return this.authService.login(payload);
  }
}
