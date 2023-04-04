import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
  Max,
  Length,
  IsNumber,
  ValidateNested,
} from 'class-validator';

import { IsUniqueUsername } from '../../users/decorators/uniqueUsername.decorator';
import { IsUniqueEmail } from '../../users/decorators/uniqueEmail.decorator';

class BuildingDetails {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(10)
  floor: number;
}

class AddressDetails {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 16)
  street: string;

  @IsNotEmpty()
  @Type(() => BuildingDetails)
  @ValidateNested({ each: true })
  building: BuildingDetails;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsUniqueUsername()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUniqueEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 18)
  password: string;

  @IsNotEmpty()
  @Type(() => AddressDetails)
  @ValidateNested({ each: true })
  address: AddressDetails[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(13)
  @Max(50)
  age: number;
}
