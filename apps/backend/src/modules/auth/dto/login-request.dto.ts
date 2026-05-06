import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { LoginDto } from "@starshield/shared";

export class LoginRequestDto implements LoginDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8, example: "supersecret123" })
  @IsString()
  @MinLength(8)
  password!: string;
}
