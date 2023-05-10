import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { AddressTypes } from './user-address.dto';

export class AddressParamsDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(AddressTypes)
  type: string;
}
