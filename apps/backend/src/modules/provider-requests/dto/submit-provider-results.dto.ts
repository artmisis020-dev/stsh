import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsString, ValidateNested } from "class-validator";
import { IdState, type ProviderRequestResultItemDto, type SubmitProviderResultsDto } from "@starshield/shared";

class ProviderResultItemBodyDto implements ProviderRequestResultItemDto {
  @IsString()
  actionId!: string;

  @IsBoolean()
  success!: boolean;

  @IsEnum(IdState)
  resultingState!: IdState;
}

export class SubmitProviderResultsBodyDto implements SubmitProviderResultsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProviderResultItemBodyDto)
  results!: ProviderResultItemBodyDto[];
}
