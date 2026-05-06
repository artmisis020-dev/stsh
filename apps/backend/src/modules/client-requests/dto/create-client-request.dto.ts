import { Type } from "class-transformer";
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
  @IsString()
  @IsNotEmpty()
  readonly terminalKit!: string;

  @IsEnum(ActionType)
  readonly actionType!: ActionType;
}

export class CreateClientRequestDto implements SubmitClientRequestDto {
  @IsString()
  readonly comment!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ClientRequestActionDto)
  readonly actions!: ClientRequestActionDto[];
}
