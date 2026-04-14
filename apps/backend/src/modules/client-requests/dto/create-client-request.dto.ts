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
  idValue!: string;

  @IsEnum(ActionType)
  actionType!: ActionType;
}

export class CreateClientRequestDto implements SubmitClientRequestDto {
  @IsString()
  comment!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ClientRequestActionDto)
  actions!: ClientRequestActionDto[];
}
