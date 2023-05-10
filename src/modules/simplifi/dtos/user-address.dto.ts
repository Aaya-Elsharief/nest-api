import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export enum AddressTypes {
  'PRIMARY',
  'DELIVERY',
}

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  countryCode: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address2?: string;

  @IsOptional()
  @IsString()
  @IsEnum(AddressTypes)
  @ApiProperty()
  addressType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cityCode: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  stateCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  streetAddress: string;
}
