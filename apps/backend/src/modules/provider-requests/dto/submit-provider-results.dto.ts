import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { TerminalKitState, type ProviderRequestResultItemDto, type SubmitProviderResultsDto } from "@starshield/shared";

class ProviderResultItemBodyDto {
  @IsString()
  @IsNotEmpty()
  readonly actionId!: string;

  @IsBoolean()
  readonly success!: boolean;

  @ValidateIf((o: ProviderResultItemBodyDto) => o.success === true)
  @IsEnum(TerminalKitState)
  @IsOptional()
  readonly resultingState?: TerminalKitState;
}

export class SubmitProviderResultsBodyDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProviderResultItemBodyDto)
  readonly results!: ProviderResultItemBodyDto[];
}
