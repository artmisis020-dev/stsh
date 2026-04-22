import { IsEmail, IsString, MinLength } from "class-validator";
import type { RegisterDto } from "@starshield/shared";

export class RegisterRequestDto implements RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;


  @IsString()
  @MinLength(4)
  login!: string;
}
