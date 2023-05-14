import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum Genders {
  'MALE',
  'FEMALE',
}

export enum AddressTypes {
  'PRIMARY',
  'DELIVERY',
}

export class ContactObj {
  @IsString()
  contactType: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;
}

export class AddressObj {
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  @IsEnum(AddressTypes)
  addressType: string;

  @IsOptional()
  @IsString()
  cityCode: string;

  @IsOptional()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  stateCode: string;

  @IsOptional()
  @IsString()
  streetAddress: string;
}

export class UserDetailObj {
  @IsNotEmpty()
  @IsString()
  cardProgramUuid: string;

  @IsString()
  //@IsValidDop()
  dob: string;

  @IsString()
  position: string;

  @IsString()
  roleUuid: string;
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @Type(() => ContactObj)
  @ValidateNested({ each: true })
  contact: ContactObj;

  @IsNotEmpty()
  @Type(() => UserDetailObj)
  @ValidateNested({ each: true })
  userDetail: UserDetailObj;

  @IsNotEmpty()
  @Type(() => AddressObj)
  @ValidateNested({ each: true })
  address: AddressObj;

  @IsEmail()
  email: string;

  @IsEnum(Genders)
  gender: string;
}
