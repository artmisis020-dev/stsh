import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { RegisterDto } from "@starshield/shared";

export class RegisterRequestDto implements RegisterDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8, example: "supersecret123" })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ minLength: 4, example: "operator01" })
  @IsString()
  @MinLength(4)
  login!: string;
}
