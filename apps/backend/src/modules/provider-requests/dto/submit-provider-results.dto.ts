import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TerminalKitState } from "@starshield/shared";

class ProviderResultItemBodyDto {
  @ApiProperty({ example: "action-1" })
  @IsString()
  @IsNotEmpty()
  readonly actionId!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly success!: boolean;

  @ApiPropertyOptional({ enum: TerminalKitState, example: TerminalKitState.Active })
  @ValidateIf((o: ProviderResultItemBodyDto) => o.success === true)
  @IsEnum(TerminalKitState)
  @IsOptional()
  readonly resultingState?: TerminalKitState;
}

export class SubmitProviderResultsBodyDto {
  @ApiProperty({ type: () => [ProviderResultItemBodyDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProviderResultItemBodyDto)
  readonly results!: ProviderResultItemBodyDto[];
}
