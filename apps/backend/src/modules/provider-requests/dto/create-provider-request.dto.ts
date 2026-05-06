import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsOptional } from "class-validator";
import type { CreateProviderRequestDto } from "@starshield/shared";

export class CreateProviderRequestBodyDto implements CreateProviderRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly externalId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly actionIds!: string[];

  @IsString()
  @IsOptional()
  readonly comment?: string;
}
