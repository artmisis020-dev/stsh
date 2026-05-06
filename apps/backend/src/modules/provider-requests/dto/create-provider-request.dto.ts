import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import type { CreateProviderRequestDto } from "@starshield/shared";

export class CreateProviderRequestBodyDto implements CreateProviderRequestDto {
  @ApiProperty({ example: "provider-req-2026-001" })
  @IsString()
  @IsNotEmpty()
  readonly externalId!: string;

  @ApiProperty({ type: [String], example: ["action-1", "action-2"] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly actionIds!: string[];

  @ApiPropertyOptional({ example: "Send to provider A first." })
  @IsString()
  @IsOptional()
  readonly comment?: string;
}
