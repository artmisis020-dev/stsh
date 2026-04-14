import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import type { CreateProviderRequestDto } from "@starshield/shared";

export class CreateProviderRequestBodyDto implements CreateProviderRequestDto {
  @IsString()
  @IsNotEmpty()
  externalId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  actionIds!: string[];
}
