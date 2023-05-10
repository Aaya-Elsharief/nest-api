import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CardLoadDto {
  @IsNotEmpty()
  @IsString()
  cardUuid: string;

  @IsNotEmpty()
  @IsString()
  userUuid: string;

  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  requestedAmount: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  loadAmount: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['PENDING', 'APPROVED'])
  status: string;
}
