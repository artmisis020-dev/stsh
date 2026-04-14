import { IsEmail, IsString, MinLength } from "class-validator";
import type { LoginDto } from "@starshield/shared";

export class LoginRequestDto implements LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
