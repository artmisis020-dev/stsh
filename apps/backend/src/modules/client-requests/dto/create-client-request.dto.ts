import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { ActionType, type ClientRequestActionInputDto, type SubmitClientRequestDto } from "@starshield/shared";

class ClientRequestActionDto implements ClientRequestActionInputDto {
  @ApiProperty({ example: "TK-001" })
  @IsString()
  @IsNotEmpty()
  readonly terminalKit!: string;

  @ApiProperty({ enum: ActionType, example: ActionType.Activate })
  @IsEnum(ActionType)
  readonly actionType!: ActionType;
}

export class CreateClientRequestDto implements SubmitClientRequestDto {
  @ApiProperty({ example: "Urgent reassignment for field operations." })
  @IsString()
  readonly comment!: string;

  @ApiProperty({ type: () => [ClientRequestActionDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ClientRequestActionDto)
  readonly actions!: ClientRequestActionDto[];
}
